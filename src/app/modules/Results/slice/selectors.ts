import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { resultsAdapter } from '.'

const { selectAll, selectById } = resultsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.results

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectStatusQuiz = createSelector([selectDomain], (state) => state.status_quiz)

export const selectFilter = createSelector([selectDomain], (state) => state.filter)

export const selectTotalCount = createSelector([selectDomain], (state) => state.total_count)

export const selectOldTotalCount = createSelector([selectDomain], (state) => state.old_total_count)

export const selectQuiz = createSelector([selectDomain], (state) => state.quiz)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectPagination = createSelector([selectDomain], (state) => state.pagination)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectResults = createSelector([selectDomain], (state) => selectAll(state))

export const selectResultById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
