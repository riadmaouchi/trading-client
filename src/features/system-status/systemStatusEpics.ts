import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { connect, disconnect } from '../connection-status/connectionSlice'
import { updateServiceStatus } from './systemStatusSlice'

export const systemStatusEpic = (
    action$: Observable<Action>,
    state$: any,
    { api }: any
) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            api
                .subscribeSystemStatus()
                .pipe(map((service: any) => service.status()))
                .pipe(
                    map(updateServiceStatus),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
