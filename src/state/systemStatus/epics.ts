import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { connect, disconnect } from '../connectionStatus/reducers'
import { updateServiceStatus } from './reducers'
import { RootEpic } from '../store'

export const systemStatusEpic: RootEpic = (
    action$: Observable<Action>,
    state$,
    { api }
) => {
    return action$.pipe(
        ofType(connect.type),
        switchMapTo(
            api
                .subscribeSystemStatus()
                .pipe(map((service) => service.status()))
                .pipe(
                    map(updateServiceStatus),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
}
