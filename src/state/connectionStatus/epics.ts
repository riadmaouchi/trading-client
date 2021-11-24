import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { API } from '@/api'
import { updateStatus, connect, disconnect } from './reducers'

export const connectionStatusEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            API.subcribeConnectionStatus().pipe(
                map(updateStatus),
                takeUntil(action$.pipe(ofType(disconnect.type)))
            )
        )
    )
