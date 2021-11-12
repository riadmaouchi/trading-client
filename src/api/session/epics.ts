import { Observable } from 'rxjs'
import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import {
    SessionActions,
    applicationConnected,
    applicationDisconnected,
} from './actions'
import { CurrencyPairs } from '@/api'
import { ApplicationEpic } from 'store'
import { combineEpics } from 'redux-observable'

const { assetsSelected, createServiceStatusAction } = SessionActions
type SessionAction = ReturnType<typeof assetsSelected>
type CreateConnectionAction = ReturnType<
    typeof SessionActions.connectionStatusUpdated
>
type CreateStatusServiceAction = ReturnType<typeof createServiceStatusAction>

export const sessionAssetEpic: ApplicationEpic<{
    assets: Observable<CurrencyPairs>
}> = (action$, _, { assets }) =>
    action$.pipe(
        applicationConnected,
        switchMapTo<SessionAction>(
            assets.pipe(
                map(assetsSelected),
                takeUntil(action$.pipe(applicationDisconnected))
            )
        )
    )

export const connectionStatusEpic: ApplicationEpic = (
    action$,
    state$,
    { connection }
) => {
    return action$.pipe(
        applicationConnected,
        switchMapTo<CreateConnectionAction>(
            connection.pipe(
                map(SessionActions.connectionStatusUpdated),
                takeUntil(action$.pipe(applicationDisconnected))
            )
        )
    )
}

export const serviceStatusEpic: ApplicationEpic = (
    action$,
    state$,
    { services }
) => {
    const service = services.pipe(map((service) => service.status()))

    return action$.pipe(
        applicationConnected,
        switchMapTo<CreateStatusServiceAction>(
            service.pipe(
                map(createServiceStatusAction),
                takeUntil(action$.pipe(applicationDisconnected))
            )
        )
    )
}

export const sessionEpic = combineEpics(
    connectionStatusEpic,
    sessionAssetEpic,
    serviceStatusEpic
)
