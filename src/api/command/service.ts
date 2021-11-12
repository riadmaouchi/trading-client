import {
    distinctUntilChanged,
    groupBy,
    map,
    mapTo,
    merge,
    mergeMap,
    Observable,
    scan,
    switchMap,
    timer,
} from 'rxjs'
import { ServiceStateMsg } from './command'
import { Transport } from '..'
import { Service, ServiceTypes, Services } from '../session/service'

export const mapServices = (transport: Transport, heartBeatTimeout: number) => {
    const statusUpdate = transport.onreceive<ServiceStateMsg>('status')
    return statusUpdate.pipe(
        map((serviceStatus) => {
            return {
                ...serviceStatus,
                isConnected: true,
            }
        }),
        groupBy((serviceStatus) => serviceStatus.type),
        mergeMap((serviceStatus) =>
            serviceStatus.pipe(
                addHeartBeat(heartBeatTimeout),
                scan<Service, ServiceTypes>(
                    (serviceTypes, next) => serviceTypes.update(next),
                    new ServiceTypes(serviceStatus.key)
                )
            )
        ),
        scan<ServiceTypes, Services>((services, serviceTypes) => {
            return services.add(serviceTypes.type, serviceTypes)
        }, new Services())
    )
}

function addHeartBeat(
    heartBeatTimeout: number
): (source: Observable<Service>) => Observable<Service> {
    return (source) =>
        source.pipe(
            groupBy((serviceStatus) => serviceStatus.id),
            mergeMap((service$) =>
                service$.pipe(
                    debounce<Service>(heartBeatTimeout, (lastValue) => {
                        return {
                            ...lastValue,
                            timestamp: NaN,
                            isConnected: false,
                        }
                    }),
                    distinctUntilChanged<Service>(
                        (status, statusNew) =>
                            status.isConnected === statusNew.isConnected
                    )
                )
            )
        )
}

export function debounce<T>(
    dueTime: number,
    itemSelector: (lastValue: T) => T
): (source: Observable<T>) => Observable<T> {
    return (source$) => {
        const timeout$ = source$.pipe(
            switchMap((last) => timer(dueTime).pipe(mapTo(itemSelector(last))))
        )

        return merge(source$, timeout$)
    }
}
