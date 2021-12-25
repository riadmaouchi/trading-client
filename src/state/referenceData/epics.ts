import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { connect, disconnect } from '../connectionStatus/reducers'
import { updateReferenceData } from './reducers'
import { RootEpic } from '../store'

export const referenceDataEpic: RootEpic = (
    action$: Observable<Action>,
    state$,
    { api }
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
