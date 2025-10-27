import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { documentsAdapter } from '.'

const { selectAll, selectById } = documentsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.documents

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectMoveId = createSelector([selectDomain], (state) => state.moveId)

export const selectCopyId = createSelector([selectDomain], (state) => state.copyId)

export const selectDocuments = createSelector(
    [selectDomain],
    (state) => (id: string) => selectAll(state).filter((document) => document.parentId === id)
)

export const selectSearchDocuments = createSelector(
    [selectDomain],
    (state) => (search: string, id: string) =>
        selectAll(state)
            .filter((document) => document.parentId === id)
            .filter((document) => {
                const words = search.toLowerCase().split(' ')

                let find = true

                words.forEach((word) => {
                    if (document.name.toLowerCase().indexOf(word.trim()) === -1) find = false
                })

                return find
            })
)

export const selectDocumentById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
