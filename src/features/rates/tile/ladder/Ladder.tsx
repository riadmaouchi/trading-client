import size from 'lodash-es/size'
import { StyledLadder } from './styled'
import PriceButton from '../price-button'
import { toRate } from '../priceFormat'
import { Level, CurrencyPair } from '@/services'
import { Direction } from '../tileData'

interface Props {
    bids: Level[]
    asks: Level[]
    currencyPair: CurrencyPair
}

const Ladder: React.FC<Props> = ({ bids = [], asks = [], currencyPair }) => {
    const greater = size(bids) - size(asks) >= 0

    const greatest = greater ? bids : asks
    const smallest = greater ? asks : bids

    const toto = (
        <div className="flex items-center justify-between p-4">
            <table className="rounded-t-lg w-full mx-auto">
                <tbody>
                    {greatest.map((p, i) => {
                        const rate = toRate(
                            p.price,
                            currencyPair.ratePrecision,
                            currencyPair.pipsPosition
                        )
                        const rate2 = smallest[i]
                            ? toRate(
                                  smallest[i]?.price,
                                  currencyPair.ratePrecision,
                                  currencyPair.pipsPosition
                              )
                            : null

                        const bid = greater ? rate : rate2
                        const ask = greater ? rate2 : rate

                        return (
                            <tr className="text-center text-sm" key={i}>
                                <td className="px-2">
                                    {bid && (
                                        <PriceButton
                                            big={bid.bigFigure}
                                            pip={bid.pips}
                                            pipFraction={bid.pipFraction}
                                            rate={bid.rate}
                                            direction={Direction.Sell}
                                            symbol={currencyPair.symbol}
                                        />
                                    )}
                                </td>
                                <td>{p.quantity / 1e6}m</td>
                                <td>
                                    {ask && (
                                        <PriceButton
                                            big={ask.bigFigure}
                                            pip={ask.pips}
                                            pipFraction={ask.pipFraction}
                                            rate={ask.rate}
                                            direction={Direction.Buy}
                                            symbol={currencyPair.symbol}
                                        />
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

    return <StyledLadder>{toto}</StyledLadder>
}

export default Ladder
