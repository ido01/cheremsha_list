import { IVariant } from './IVariant'

export interface IQuestion {
    id: string
    parentId: string
    delete?: boolean
    text: string
    sort: number
    uniq: string
    state?: IQuestionState
    variants: IVariant[]
    createdAt: string
}

interface IQuestionState {
    id: string
    uid: string
    qid: string
    quid: string
    vid: string
    result: boolean
}
