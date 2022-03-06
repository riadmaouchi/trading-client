import { createSelector } from 'reselect'
import { RootState } from '../store'

const selectState = (state: RootState) => state.user

const selectUser = createSelector([selectState], (state) => state.user)

const selectLoadingStatus = createSelector(
    [selectState],
    (state) => state.loading
)

export { selectUser, selectLoadingStatus }
