import { IState } from './IState'
import { IVariant } from './IVariant'

export interface IQuestion {
    id: string
    parentId: string
    text: string
    state: IState
    variants: IVariant[]
    createdAt: string
}
