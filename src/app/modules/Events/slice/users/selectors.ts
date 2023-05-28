import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { birthdaysAdapter } from '.'

const { selectAll, selectById } = birthdaysAdapter.getSelectors()

const selectDomain = (state: RootState) => state.birthdays

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectBirthdays = createSelector([selectDomain], (state) =>
    selectAll(state).filter((user) => user.month === state.currentMonth)
)

export const selectBirthdaysDay = createSelector(
    [selectDomain],
    (state) => (month: number, day: number) =>
        selectAll(state).filter((user) => user.month === month + 1 && user.day === day)
)

export const selectUserById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
