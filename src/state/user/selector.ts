import { createSelector } from 'reselect'
import { RootState } from '../store'

const selectState = (state: RootState) => state.user

const selectUser = createSelector([selectState], (state) => state.user)

const selectSelectingUser = createSelector(
    [selectState],
    (state) => state.selectingUser
)

export { selectUser, selectSelectingUser }
