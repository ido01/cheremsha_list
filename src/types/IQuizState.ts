export enum EQuizState {
    INITIAL = 'initial',
    PENDING = 'pending',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
    CLOSED = 'closed',
    DONE = 'done',
}

export interface IQuizState {
    id: string
    state: EQuizState
    uid: string
    qid: string
    current_question: number
    correct: number
    incorrect: number
    all_questions: number
    time_passed: number
    createdAt: string
    updatedAt: string
}
