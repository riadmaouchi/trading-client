import { GlobalState } from '@/store'
import { createSelector } from 'reselect'

const getServices = ({ session }: GlobalState) => session.services

export const selectServices = createSelector([getServices], (serviceStatus) =>
    Object.values(serviceStatus)
)
