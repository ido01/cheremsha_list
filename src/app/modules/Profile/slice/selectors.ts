import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

const selectDomain = (state: RootState) => state.profile

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectProfileRole = createSelector([selectDomain], (state) => state.data.role)

export const selectProfile = createSelector([selectDomain], (state) => state.data)

export const selectForm = createSelector([selectDomain], (state) => state.form)
