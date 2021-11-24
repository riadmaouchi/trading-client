import { Action } from 'redux'
import { ofType } from 'redux-observable'
import { MonoTypeOperatorFunction, merge, Observable } from 'rxjs'
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators'
import { disconnect } from '../connectionStatus/reducers'
import { unsubscribe, subscribe, updatePrice } from './reducers'
import { API } from '@/api'

export const pricingServiceEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(subscribe.type),
        mergeMap((action) =>
            API.subcribePrice(action.payload).pipe(
                map(updatePrice),
                takePriceUpdatesUntil(action$, action.payload)
            )
        )
    )

const takePriceUpdatesUntil = (
    action$: Observable<Action>,
    currencyPair: string
): MonoTypeOperatorFunction<Action> =>
    takeUntil(
        merge(
            action$.pipe(ofType(disconnect.type)),
            action$.pipe(
                ofType(unsubscribe.type),
                filter(({ payload }) => payload === currencyPair)
            )
        )
    )
