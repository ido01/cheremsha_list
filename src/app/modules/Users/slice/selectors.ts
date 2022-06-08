import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { usersAdapter } from '.'

const { selectAll, selectById } = usersAdapter.getSelectors()

const selectDomain = (state: RootState) => state.users

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectTotalCount = createSelector([selectDomain], (state) => state.total_count)

export const selectOldTotalCount = createSelector([selectDomain], (state) => state.old_total_count)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectPagination = createSelector([selectDomain], (state) => state.pagination)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectUsers = createSelector([selectDomain], (state) => selectAll(state))

export const selectUserById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
