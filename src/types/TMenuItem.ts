export type TMenuItem = {
    id?: number
    icon?: React.ReactNode
    title: string
    path?: string
    activePath?: string[]
    submenus?: TMenuItem[]
    isAdmin?: boolean
}
