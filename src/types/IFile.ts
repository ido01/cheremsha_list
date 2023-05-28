export interface IFileRequest {
    file: File
    index: number
}

export interface IFile {
    id: string
    name: string
    path: string
    size: string
    url: string
    thumb: string
    createdAt: string
}
