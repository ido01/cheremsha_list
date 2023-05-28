import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { locationsAdapter } from '.'

const { selectAll, selectById } = locationsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.locations

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectLocations = createSelector([selectDomain], (state) => selectAll(state))

export const selectLocation = createSelector([selectDomain], (state) => (id: string) => selectById(state, id)?.name)
