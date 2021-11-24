import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { connect, disconnect } from '../connectionStatus/reducers'
import { updateReferenceData } from './reducers'
import { API } from '@/api'

export const referenceDataEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            API.subscribeReferenceData().pipe(
                map(updateReferenceData),
                takeUntil(action$.pipe(ofType(disconnect.type)))
            )
        )
    )
