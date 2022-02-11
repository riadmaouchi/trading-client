import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { connect, disconnect } from '../connectionStatus/reducers'
import { updateReferenceData } from './reducers'

export const referenceDataEpic = (
    action$: Observable<Action>,
    state$: any,
    { api }: any
) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            api
                .subscribeReferenceData()
                .pipe(
                    map(updateReferenceData),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
