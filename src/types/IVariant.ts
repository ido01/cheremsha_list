export interface IVariant {
    id: string
    parentId: string
    text: string
    second_text: string
    isCorrect: boolean
    uniq: string
    delete?: boolean
    state?: {
        result: boolean
        text: string
    }
}

export interface ISortVariant {
    id: string
    parentId: string
    text: string
}
