import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { connect, disconnect } from '../connectionStatus/reducers'
import { updateServiceStatus } from './reducers'
import { API } from '@/api'

export const systemStatusEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(connect.type),
        switchMapTo(
            API.subscribeSystemStatus()
                .pipe(map((service) => service.status()))
                .pipe(
                    map(updateServiceStatus),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
}
