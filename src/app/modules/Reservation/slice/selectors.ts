import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { reservationsAdapter } from '.'

const { selectAll, selectById } = reservationsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.reservations

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectReservations = createSelector([selectDomain], (state) => selectAll(state))

export const selectReservationById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))

export const selectLastReservationById = createSelector([selectDomain], (state) => (id: string) => {
    let reservation = selectById(state, id)
    while (reservation && reservation.cid && reservation.cid !== '0') {
        reservation = selectById(state, reservation.cid)
    }
    return reservation
})
