import { IAuthState } from 'app/modules/Auth/slice/types'
import { ICategoriesState } from 'app/modules/Categories/slice/types'
import { IDocumentsState } from 'app/modules/Documents/slice/types'
import { IFileState } from 'app/modules/File/slice/types'
import { IProfileState } from 'app/modules/Profile/slice/types'
import { IUsersState } from 'app/modules/Users/slice/types'

export interface RootState {
    auth: IAuthState
    categories: ICategoriesState
    documents: IDocumentsState
    file: IFileState
    profile: IProfileState
    users: IUsersState
}
