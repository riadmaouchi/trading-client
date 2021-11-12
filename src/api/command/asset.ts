import { publishReplay, refCount, scan } from 'rxjs'
import { Transport } from '..'
import { CurrencyPairs } from '../session'
import { CurrencyPairUpdatesMsg, UpdateTypes } from './command'

export const mapAssets = (transport: Transport) => {
    return transport.onreceive<CurrencyPairUpdatesMsg>('assets').pipe(
        scan<CurrencyPairUpdatesMsg, CurrencyPairs>((acc, update) => {
            update.currencyPairs.forEach((currencyPairUpdate) => {
                if (currencyPairUpdate.updateType === UpdateTypes.Added) {
                    acc[currencyPairUpdate.currencyPair.symbol] =
                        currencyPairUpdate.currencyPair
                } else {
                    delete acc[currencyPairUpdate.currencyPair.symbol]
                }
            })

            return acc
        }, {}),
        publishReplay(1),
        refCount()
    )
}
