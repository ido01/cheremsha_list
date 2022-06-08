import { EType } from '.'
import { IState } from './IState'

export interface ICategoriesRequest {
    id?: string
    path: EType
}

export interface ICategoriesResponse {
    data: ICategory[]
}

export interface ICategoryResponse {
    data: ICategory
}

export interface ICategory {
    id: string
    type: 'category'
    path: EType
    parentId: string
    name: string
    state: IState
    createdAt: string
}
