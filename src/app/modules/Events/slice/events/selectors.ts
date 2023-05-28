import { createSelector } from '@reduxjs/toolkit'
import { EType, RootState } from 'types'

import { eventsAdapter } from '.'

const { selectAll, selectById } = eventsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.events

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectEvents = createSelector([selectDomain], (state) =>
    selectAll(state).filter((event) => event.month === state.currentMonth && event.year === state.currentYear)
)

export const selectEventsDay = createSelector(
    [selectDomain],
    (state) => (year: number, month: number, day: number) =>
        selectAll(state).filter((event) => event.month === month + 1 && event.day === day && event.year === year)
)

export const selectEventById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
