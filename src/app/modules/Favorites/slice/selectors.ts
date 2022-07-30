import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { favoritesAdapter } from '.'

const { selectAll, selectById } = favoritesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.favorites

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectfavorites = createSelector([selectDomain], (state) => selectAll(state))

export const selectFavoriteById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
