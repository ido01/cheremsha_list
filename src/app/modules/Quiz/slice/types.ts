import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IQuiz } from 'types/IQuiz'
import { TTableOrder } from 'types/ITable'

export interface IQuizState extends EntityState<IQuiz> {
    status: EStatus
    order: TTableOrder
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        open: boolean
        data: IQuiz
    }
}
