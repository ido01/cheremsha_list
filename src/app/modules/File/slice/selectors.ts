import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

const selectDomain = (state: RootState) => state.file

export const selectOpen = createSelector([selectDomain], (state) => state.open)

export const selectStatus = createSelector([selectDomain], (state) => state.status)
