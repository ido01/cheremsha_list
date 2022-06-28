import { EType } from 'types'

import { IQuestion } from './IQuestion'
import { IState } from './IState'

export interface IQuizResponse {
    data: IQuiz[]
}

export interface IQuizItemResponse {
    data: IQuiz
}
export interface IQuiz {
    id: string
    type: 'quiz'
    path: EType
    parentId: string
    name: string
    questions: IQuestion[]
    state: IState
    createdAt: string
}
