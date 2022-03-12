import { RootState } from '@/app/store'
import { createSelector } from 'reselect'

const getTiles = (state: RootState) => state.currencyPairs?.pairs || []

export const selectTiles = createSelector([getTiles], (k) =>
    Object.keys(k).map((id) => ({
        id,
    }))
)

const getPricingStatus = ({ systemStatus }: RootState) =>
    systemStatus.pricing && systemStatus.pricing.state

export const selectPricingStatus = createSelector(
    getPricingStatus,
    (status) => status
)
