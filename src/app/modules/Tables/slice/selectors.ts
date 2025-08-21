import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { tablesAdapter } from '.'

const { selectAll, selectById } = tablesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.tables

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.deleteModal)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectTables = createSelector([selectDomain], (state) => selectAll(state))

export const selectTableById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
