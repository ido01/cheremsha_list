import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { ERole, EStatus } from 'types'
import { IProfileResponse, IUser } from 'types/IUser'

import { IProfileState } from './types'

const initialProfile: IUser = {
    id: '',
    active: false,
    ban: false,
    role: ERole.GUEST,
    gender: 'male',
    name: '',
    last_name: '',
    address: '',
    fid: '',
    university: '',
    birthday: '',
    day: 0,
    month: 0,
    workday: 0,
    workmonth: 0,
    workyear: 0,
    hobby: '',
    about: '',
    place_id: '1',
    first_date: '',
    position: 'seller',
    rate: 0,
    phone: '',
    email: '',
    blocked: false,
    favorite: false,
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
            action.payload
        },
        updateAvatar(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
    },
})

export const { actions: profileActions, reducer: profileReducer } = slice
