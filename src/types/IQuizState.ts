import { EState } from 'types'

export interface IQuizState {
    id: string
    state: EState
    uid: string
    qid: string
    correct: number
    incorrect: number
    all_questions: number
    createdAt: string
    updatedAt: string
}
