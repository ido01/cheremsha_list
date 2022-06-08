import { IFile } from './IFile'

export type TDocumentInfoType = 'title' | 'text' | 'image' | 'delete'

export interface IDocumentInfo {
    id: string
    parentId: string
    type: TDocumentInfoType
    text: string
    fid: string
    image?: IFile
    sort: number
    createdAt: string
}
