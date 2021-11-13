import { groupBy, from, mergeMap, scan } from 'rxjs'
import { Transport } from '..'
import { Service, ServiceTypes, Services } from '../session/service'

export const mapServices = (transport: Transport, heartBeatTimeout: number) => {
    return from(fakeData).pipe(
        groupBy((serviceStatus) => serviceStatus.type),
        mergeMap((serviceStatus) =>
            serviceStatus.pipe(
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

export const fakeData: Service[] = [
    {
        type: 'reference',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
    {
        type: 'pricing',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
    {
        type: 'pricing',
        id: '2',
        timestamp: 1,
        isConnected: false,
    },
]
