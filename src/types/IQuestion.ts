import { ISortVariant, IVariant } from './IVariant'

export interface IQuestion {
    id: string
    parentId: string
    delete?: boolean
    text: string
    sort: number
    uniq: string
    type: EQuestionType
    state?: IQuestionState
    variants: IVariant[]
    first_variants?: ISortVariant[]
    second_variants?: ISortVariant[]
    createdAt: string
}

export enum EQuestionType {
    VARIANT = 'variant',
    TEXT = 'text',
    SORT = 'sort',
}

interface IQuestionState {
    id: string
    uid: string
    qid: string
    quid: string
    vid: string
    answer: string
    checked: boolean
    result: boolean
}
