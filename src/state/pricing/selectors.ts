import { createSelector } from 'reselect'
import { CurrencyPair } from '../referenceData/pairs'
import { RootState } from '../store'
import { TileData } from './tile'

const DEFAULT_TILE_DATA: TileData = {
    id: '',
    tenor: 'SP',
    precision: 5,
    settlementDate: '',
    notional: 1000000,
    price: {
        id: 0,
        time: 0,
        mid: 0,
        high: 0,
        low: 0,
        symbol: '',
        bids: [],
        asks: [],
    },
    priceHistory: [],
    lastExecutionStatus: null,
    executing: false,
}

const getPricingStatus = (state: RootState) =>
    state.systemStatus &&
    state.systemStatus.pricing &&
    state.systemStatus.pricing.state
const selectPricingStatus = createSelector(
    [getPricingStatus],
    (serviceStatus) => serviceStatus
)

const getCurrencyPair = (
    state: RootState,
    currencyPairId: string | undefined
): CurrencyPair | undefined =>
    typeof currencyPairId === 'undefined'
        ? undefined
        : state.referenceData.pairs && state.referenceData.pairs[currencyPairId]
const selectCurrencyPair = createSelector(
    [getCurrencyPair],
    (currencyPair) => currencyPair
)

const getTileData = (
    state: RootState,
    currencyPairId: string | undefined
): TileData | undefined =>
    typeof currencyPairId === 'undefined'
        ? undefined
        : state.tiles[currencyPairId]

const selectTileData = createSelector(
    getTileData,
    (tileData: TileData | undefined) => tileData || DEFAULT_TILE_DATA
)

export { selectCurrencyPair, selectTileData, selectPricingStatus }
