import { createSelector } from 'reselect'
import { GlobalState } from '@/store'

const selectState = (state: GlobalState) => state.session

const selectAccount = createSelector([selectState], (state) => state.account)

const selectSelectingAccount = createSelector(
    [selectState],
    (state) => state.selectingAccount
)

export { selectAccount, selectSelectingAccount }
