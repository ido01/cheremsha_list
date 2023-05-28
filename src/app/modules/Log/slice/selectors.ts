import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { logAdapter } from '.'

const { selectAll } = logAdapter.getSelectors()

const selectDomain = (state: RootState) => state.log

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectLog = createSelector([selectDomain], (state) => selectAll(state))
