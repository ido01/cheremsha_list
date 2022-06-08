import { PayloadAction } from '@reduxjs/toolkit'
import { documentsActions } from 'app/modules/Documents/slice'
import { profileActions } from 'app/modules/Profile/slice'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IFile, IFileRequest } from 'types/IFile'
import { request } from 'utils/request'

import { fileActions } from '.'

interface IFidResponse {
    fid: string
}

interface IFileResponse {
    data: IFile
}

export function* uploadImage(action: PayloadAction<File>) {
    try {
        const data = new FormData()
        data.append('file', action.payload)

        const response: IFidResponse = yield call(request, `file`, {
            method: 'POST',
            data: data,
        })

        yield put(profileActions.updateAvatar(response.fid))
        yield put(fileActions.statusFinished())
    } catch (error: any) {
        yield put(fileActions.statusError())
    }
}

export function* createImage(action: PayloadAction<IFileRequest>) {
    try {
        const data = new FormData()
        data.append('file', action.payload.file)

        const response: IFileResponse = yield call(request, `file/admin`, {
            method: 'POST',
            data,
        })

        yield put(fileActions.statusFinished())
        yield put(
            documentsActions.updateInfo({
                index: action.payload.index,
                file: response.data,
            })
        )
    } catch (error: any) {
        yield put(fileActions.statusError())
    }
}

export function* fileWatcher() {
    yield takeLeading(fileActions.uploadImage.type, uploadImage)
    yield takeLeading(fileActions.createImage.type, createImage)
}
