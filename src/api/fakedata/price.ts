import { Observable } from 'rxjs'
import { Price, Level } from '../types'

const fakePriceData: Record<string, number> = {
    EURUSD: 1.1282,
    USDJPY: 115.06,
    GBPUSD: 1.34,
    GBPJPY: 153.98,
    EURJPY: 129.45,
    AUDUSD: 0.72,
    NZDUSD: 0.69,
    EURCAD: 1.43,
    EURAUD: 1.56,
}
const quantities = [1_000_000, 3_000_000]

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function* randomPriceGenerator(symbol: string): Generator<Price, Price, Price> {
    let mid =
        fakePriceData[symbol] || Math.trunc(Math.random() * 1_000_000) / 100_000
    let high = mid
    let low = mid

    while (true) {
        const now = new Date()
        const bids: Level[] = []
        const asks: Level[] = []
        quantities.forEach((quantity, index) => {
            const bidLevel: Level = {
                quantity,
                price: mid - randomInt(1, 3) / 10000 - (index + 1) * 0.0001,
            }
            bids[index] = bidLevel

            const askLevel: Level = {
                quantity,
                price: mid + randomInt(1, 3) / 10000 + (index + 1) * 0.0001,
            }

            asks[index] = askLevel
        })
        high = Math.max(high, mid)
        low = Math.min(low, mid)
        const price: Price = {
            id: now.getTime(),
            time: now.getTime(),
            symbol,
            mid,
            high,
            low,
            bids,
            asks,
        }
        yield price
        mid = mid * (1 + (Math.random() > 0.5 ? 0.0001 : -0.0001))
    }
}

export const getPrice = (symbol: string) =>
    new Observable<Price>((observer) => {
        const priceGenerator = randomPriceGenerator(symbol)

        observer.next(priceGenerator.next().value)

        let timeout: any = 0

        const nextPrice = () => {
            timeout = setTimeout(() => {
                observer.next(priceGenerator.next().value)
                nextPrice()
            }, Math.max(150, Math.random() * 1000))
        }

        nextPrice()

        return () => {
            clearTimeout(timeout)
        }
    })
