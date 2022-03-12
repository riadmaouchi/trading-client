import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { map, switchMapTo, takeUntil } from 'rxjs/operators'
import { connect, disconnect } from '../connection-status/connectionSlice'
import { updateCurrencyPairs } from './currencyPairSlice'

export const currencyPairEpic = (
    action$: Observable<Action>,
    state$: any,
    { api }: any
) =>
    action$.pipe(
        ofType(connect.type),
        switchMapTo(
            api
                .subscribeCurrencyPairs()
                .pipe(
                    map(updateCurrencyPairs),
                    takeUntil(action$.pipe(ofType(disconnect.type)))
                )
        )
    )
