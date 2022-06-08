export type TOrder = 'desc' | 'asc'
export type TLimit = 10 | 25 | 50

export type TTableRowData = {
    title: string
    alignTitle?: 'right' | 'inherit' | 'left' | 'center' | 'justify'
    name: string
    isSort?: boolean
    size?: number
    xs?: number
    md?: number
    headerXs?: number
    element: (data: any) => React.ReactNode
}

export type TTableOrder = {
    row: string
    order: TOrder
}

export type TTablePagination = {
    limit: TLimit
    page: number
    total_pages: number
}
