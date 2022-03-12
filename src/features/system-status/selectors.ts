import { RootState } from '@/app/store'
import { createSelector } from 'reselect'

const getSystemStatus = ({ systemStatus }: RootState) => systemStatus

export const selectSystemStatus = createSelector(
    [getSystemStatus],
    (systemStatus) => Object.values(systemStatus)
)