import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

const selectDomain = (state: RootState) => state.auth

export const selectSigninForm = createSelector([selectDomain], (state) => state.forms.signin)

export const selectSignupForm = createSelector([selectDomain], (state) => state.forms.signup)

export const selectRecoveryForm = createSelector([selectDomain], (state) => state.forms.recovery)

export const selectConfirmRecoveryForm = createSelector([selectDomain], (state) => state.forms.confirm_recovery)

export const selectToken = createSelector([selectDomain], (state) => state.token)

export const selectAuthStatus = createSelector([selectDomain], (state) => state.auth_status)

export const selectStatus = createSelector([selectDomain], (state) => state.status)
