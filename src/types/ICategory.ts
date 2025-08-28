import { IDocument } from './IDocument'
import { IQuiz } from './IQuiz'

export interface ICategoriesRequest {
    id?: string
}

export interface ICategoriesResponse {
    data: ICategory[]
    documents: IDocument[]
    quiz: IQuiz[]
}

export interface ICategoryResponse {
    data: ICategory
}

export interface ICategory {
    id: string
    type: 'category'
    parentId: string
    name: string
    createdAt: string
    icon: string
}
