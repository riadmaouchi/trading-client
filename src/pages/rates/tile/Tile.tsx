import { CurrencyPairNotional } from '@/api'
import { TileData } from '@/store/pricing'
import { Direction } from '@/store/pricing/tile'
import { CurrencyPair } from '@/store/referenceData/pairs'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'

import { HistoryChart } from './history'
import { Ladder } from './ladder'
import Notional from './notional'
import PriceButton from './price-button'
import { Rate, toRate } from './priceFormat'
import { Spread } from './spread'

interface TileProps {
    currencyPair?: CurrencyPair
    tileData: TileData
    updateNotional: (notional: CurrencyPairNotional) => void
}

interface MenuProps {
    updateView: (view: TileViews) => void
    currentView: TileViews
}

const Example: React.FC<MenuProps> = (props) => {
    return (
        <div>
            <Menu as="div" className="relative inline-block">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none">
                                <MenuIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-50 absolute right-0 w-56 mt-2 origin-top-right bg-secondary  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    props.updateView(
                                                        TileViews.Rate
                                                    )
                                                }
                                                disabled={
                                                    props.currentView ===
                                                    TileViews.Rate
                                                }
                                                className="
                                                   hover:text-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-neutral group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                            >
                                                Spot
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    props.updateView(
                                                        TileViews.Ladder
                                                    )
                                                }
                                                disabled={
                                                    props.currentView ===
                                                    TileViews.Ladder
                                                }
                                                className="text-neutral hover:text-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                            >
                                                Ladder
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}

const tileView = (
    bid: Rate,
    ask: Rate,
    tileData: TileData,
    pair: CurrencyPair,
    updateNotional: (notional: CurrencyPairNotional) => void
) => (
    <div>
        <div className="max-w-sm overflow-hidden flex items-center justify-between p-2">
            <div className="relative grid grid-col-2 grid-flow-col gap-2">
                <HistoryChart
                    id={pair.symbol}
                    priceHistory={tileData.priceHistory}
                />
                <div>
                    <ul>
                        <li className="text-sm text-left text-gray-400">
                            <span>
                                H{' '}
                                {tileData.price.high.toFixed(
                                    pair.ratePrecision
                                )}
                            </span>
                        </li>
                        <li className="text-sm text-left text-gray-400">
                            <span>
                                M{' '}
                                {tileData.price.mid.toFixed(pair.ratePrecision)}
                            </span>
                        </li>
                        <li className="text-sm text-left text-gray-400">
                            L {tileData.price.low.toFixed(pair.ratePrecision)}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="relative grid grid-col-3 grid-flow-col gap-2 px-2">
            <PriceButton
                big={bid.bigFigure}
                pip={bid.pips}
                pipFraction={bid.pipFraction}
                rate={bid.rate}
                direction={Direction.Sell}
                symbol={tileData.price.symbol}
            />

            <div className="flex items-center justify-center">
                <Spread
                    spread={(
                        (tileData.price.asks[0]?.price -
                            tileData.price.bids[0]?.price) *
                        Math.pow(10, tileData.precision - 1)
                    ).toFixed(1)}
                />
            </div>

            <PriceButton
                big={ask.bigFigure}
                pip={ask.pips}
                pipFraction={ask.pipFraction}
                rate={ask.rate}
                direction={Direction.Buy}
                symbol={tileData.price.symbol}
            />
        </div>

        <Notional
            currencyPairSymbol={pair.symbol}
            currencyPairBase={pair.base}
            notional={tileData.notional}
            updateNotional={updateNotional}
        />
    </div>
)

enum TileViews {
    Rate = 'Rate',
    Ladder = 'Ladder',
}

const Tile: React.FC<TileProps> = ({
    currencyPair,
    tileData,
    updateNotional,
}) => {
    const [view, setView] = useState(TileViews.Rate)
    const bid: Rate = toRate(
        tileData.price.bids[0]?.price,
        currencyPair?.ratePrecision,
        currencyPair?.pipsPosition
    )
    const ask: Rate = toRate(
        tileData.price.asks[0]?.price,
        currencyPair?.ratePrecision,
        currencyPair?.pipsPosition
    )

    if (!currencyPair) {
        return <></>
    }

    return (
        <div className="relative h-full min-h-full">
            <div className="flex flex-col absolute w-full h-full">
                <div className="flex items-center justify-between p-4">
                    <h4 className="text-lg font-semibold text-neutralSoft">
                        {tileData.price.symbol}
                    </h4>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">
                            SP ({tileData.settlementDate})
                        </span>
                        <Example
                            updateView={(view) => setView(view)}
                            currentView={view}
                        />
                    </div>
                </div>
                {view === TileViews.Rate &&
                    tileView(bid, ask, tileData, currencyPair, updateNotional)}
                {view === TileViews.Ladder && (
                    <Ladder
                        bids={tileData.price.bids}
                        asks={tileData.price.asks}
                        currencyPair={currencyPair}
                    />
                )}
            </div>
        </div>
    )
}
export default Tile
