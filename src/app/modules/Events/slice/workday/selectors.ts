import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { workdaysAdapter } from '.'

const { selectAll, selectById } = workdaysAdapter.getSelectors()

const selectDomain = (state: RootState) => state.workdays

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectWorkdays = createSelector([selectDomain], (state) =>
    selectAll(state).filter((user) => user.workmonth === state.currentMonth)
)

export const selectWorkdaysDay = createSelector(
    [selectDomain],
    (state) => (month: number, day: number) =>
        selectAll(state).filter((user) => user.workmonth === month + 1 && user.workday === day)
)

export const selectUserById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
