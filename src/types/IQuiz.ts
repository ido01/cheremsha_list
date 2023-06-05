import { EType } from 'types'

import { IQuestion } from './IQuestion'
import { IQuizState } from './IQuizState'

export interface IQuizResponse {
    data: IQuiz[]
}

export interface IQuizItemResponse {
    data: IQuiz
}

export interface ISortValue {
    [key: string]: string
}

export interface IQuestionRequest {
    id: string
    qid: string
    vid?: string
    answer?: string
    sortValue?: ISortValue
}

export interface IQuiz {
    id: string
    draft: boolean
    type: 'quiz'
    path: EType
    parentId: string
    name: string
    description: string
    incorrect_count: number
    max_min: number
    questions: IQuestion[]
    state: IQuizState
    createdAt: string
}
