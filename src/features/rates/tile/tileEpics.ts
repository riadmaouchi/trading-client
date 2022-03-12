import { ofType } from 'redux-observable'
import { MonoTypeOperatorFunction, merge, Observable } from 'rxjs'
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators'
import { disconnect } from '../../connection-status/connectionSlice'
import { unsubscribe, subscribe, updatePrice } from './tileSlice'
import { PayloadAction } from '@reduxjs/toolkit'

export const tileEpic = (
    action$: Observable<PayloadAction<string>>,
    state$: any,
    { api }: any
) =>
    action$.pipe(
        ofType(subscribe.type),
        mergeMap((action: PayloadAction<string>) =>
            api
                .subcribePrice(action.payload)
                .pipe(
                    map(updatePrice),
                    takePriceUpdatesUntil(action$, action.payload)
                )
        )
    )

const takePriceUpdatesUntil = (
    action$: Observable<PayloadAction<string>>,
    currencyPair: string
): MonoTypeOperatorFunction<PayloadAction<string>> =>
    takeUntil(
        merge(
            action$.pipe(ofType(disconnect.type)),
            action$.pipe(
                ofType(unsubscribe.type),
                filter(({ payload }) => payload === currencyPair)
            )
        )
    )
