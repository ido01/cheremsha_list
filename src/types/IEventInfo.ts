import { IFile } from './IFile'

export type TEventInfoType = 'title' | 'text' | 'image' | 'delete'

export interface IEventInfo {
    id: string
    parentId: string
    type: TEventInfoType
    text: string
    fid: string
    image?: IFile
    sort: number
    createdAt: string
}
