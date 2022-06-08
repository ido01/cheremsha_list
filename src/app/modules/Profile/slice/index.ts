import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { ERole, EStatus } from 'types'
import { TTableOrder } from 'types/ITable'
import { IProfileResponse, IUser } from 'types/IUser'

import { IProfileState } from './types'

const initialProfile: IUser = {
    id: '',
    active: false,
    role: ERole.GUEST,
    gender: 'male',
    name: '',
    address: '',
    fid: '',
    university: '',
    birthday: '',
    hobby: '',
    about: '',
    place_id: '',
    first_date: '',
    position: 'seller',
    rate: 0,
    phone: '',
    email: '',
    blocked: false,
    createdAt: '',
}

const initialState: IProfileState = {
    status: EStatus.INITIAL,
    data: initialProfile,
    form: {
        status: EStatus.INITIAL,
        data: initialProfile,
    },
}

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadProfile(state) {
            state.status = state.status !== EStatus.FINISHED ? EStatus.PENDING : EStatus.FINISHED
        },
        profileLoaded(state, action: PayloadAction<IProfileResponse>) {
            state.data = action.payload.profile
            state.form.data.birthday = moment(action.payload.profile.birthday).format()
            state.form.data.first_date = moment(action.payload.profile.first_date).format()
            state.form.data = action.payload.profile
            state.status = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
        },
        updateProfile(state, action: PayloadAction<IUser>) {
            state.form.status = EStatus.PENDING
        },
        updateAvatar(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
    },
})

export const { actions: profileActions, reducer: profileReducer } = slice
