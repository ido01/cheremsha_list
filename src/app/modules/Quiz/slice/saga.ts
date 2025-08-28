import { PayloadAction } from '@reduxjs/toolkit'
import { categoriesActions } from 'app/modules/Categories/slice'
import { IPasteDocument } from 'app/modules/Documents/slice/types'
import { profileActions } from 'app/modules/Profile/slice'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IQuestionRequest, IQuiz, IQuizItemResponse, IQuizResponse } from 'types/IQuiz'
import { IProfileResponse } from 'types/IUser'
import { request } from 'utils/request'

import { quizActions } from '.'

export function* loadQuiz() {
    try {
        const response: IQuizResponse = yield call(request, 'quiz')

        yield put(quizActions.quizLoaded(response.data))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* loadQuizById(action: PayloadAction<string>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload}`)

        yield put(quizActions.quizByIdLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* question(action: PayloadAction<IQuestionRequest>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload.id}/question`, {
            method: 'POST',
            data: {
                qid: action.payload.qid,
                vid: action.payload.vid,
                answer: action.payload.answer,
                sortValue: action.payload.sortValue,
            },
        })

        yield put(quizActions.questionLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* completed(action: PayloadAction<string>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload}/completed`, {
            method: 'POST',
        })

        yield put(quizActions.quizByIdLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* setPublic(action: PayloadAction<string>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload}/public`, {
            method: 'POST',
        })

        yield put(quizActions.quizByIdLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* setDraft(action: PayloadAction<string>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload}/draft`, {
            method: 'POST',
        })

        yield put(quizActions.quizByIdLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* setStart(action: PayloadAction<string>) {
    try {
        const response: IProfileResponse = yield call(request, `quiz/${action.payload}/start`, {
            method: 'POST',
        })

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

// export function* setComplete(action: PayloadAction<IDocumentStateRequest>) {
//     try {
//         const response: IDocumentResponse = yield call(
//             request,
//             `documents/${action.payload.did}/state/${action.payload.id}/completed`,
//             {
//                 method: 'POST',
//             }
//         )

//         yield put(documentsActions.documentSave(response.data))

//         if (response.data.parentId && response.data.parentId !== '0') {
//             yield put(categoriesActions.reloadCategory(response.data.parentId))
//         }
//     } catch (error: any) {
//         yield put(documentsActions.statusError())
//     }
// }

export function* createQuiz(action: PayloadAction<IQuiz>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(quizActions.quizSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* updateQuiz(action: PayloadAction<IQuiz>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(quizActions.quizSave(response.data))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* moveQuiz(action: PayloadAction<IPasteDocument>) {
    try {
        const response: IQuizItemResponse = yield call(request, `quiz/${action.payload.id}/move`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(quizActions.quizSave(response.data))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* deleteQuiz(action: PayloadAction<string>) {
    try {
        yield call(request, `quiz/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(quizActions.quizDeleted(action.payload))
    } catch (error: any) {
        yield put(quizActions.statusError())
    }
}

export function* quizWatcher() {
    yield takeLeading(quizActions.loadQuiz.type, loadQuiz)
    yield takeLeading(quizActions.loadQuizById.type, loadQuizById)
    yield takeLeading(quizActions.question.type, question)
    yield takeLeading(quizActions.completed.type, completed)
    yield takeLeading(quizActions.setPublic.type, setPublic)
    yield takeLeading(quizActions.setDraft.type, setDraft)
    yield takeLeading(quizActions.setStart.type, setStart)
    // yield takeLeading(quizActions.setComplete.type, setComplete)
    yield takeLeading(quizActions.createQuiz.type, createQuiz)
    yield takeLeading(quizActions.updateQuiz.type, updateQuiz)
    yield takeLeading(quizActions.deleteQuiz.type, deleteQuiz)
    yield takeLeading(quizActions.moveQuiz.type, moveQuiz)
}
