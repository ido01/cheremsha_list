import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { listAdapter } from '.'

const { selectAll, selectById } = listAdapter.getSelectors()

const selectDomain = (state: RootState) => state.lists

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectItemStatus = createSelector([selectDomain], (state) => state.itemStatus)

export const selectCount = createSelector([selectDomain], (state) => state.count)

export const selectDate = createSelector([selectDomain], (state) => state.date)

export const selectDateSetting = createSelector([selectDomain], (state) => state.dateSettings)

export const selectFind = createSelector([selectDomain], (state) => state.find)

export const selectReset = createSelector([selectDomain], (state) => state.reset)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectTables = createSelector([selectDomain], (state) => selectAll(state))

export const selectTableById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
