import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { updateStatus, connect, disconnect } from './connectionSlice'

export const connectionStatusEpic = (
    action$: Observable<Action>,
    state$: any,
    { api }: any
) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            api
                .subcribeConnectionStatus()
                .pipe(
                    map(updateStatus),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
