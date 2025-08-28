import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { categoriesAdapter } from '.'

const { selectAll, selectById } = categoriesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.categories

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectmoveCategoryId = createSelector([selectDomain], (state) => state.moveId)

export const selectCategories = createSelector(
    [selectDomain],
    (state) => (id: string) => selectAll(state).filter((category) => category.parentId === id)
)

export const selectSearchCategories = createSelector(
    [selectDomain],
    (state) => (search: string, id: string) =>
        selectAll(state)
            .filter((category) => category.parentId === id)
            .filter((category) => {
                const words = search.toLowerCase().split(' ')

                let find = true

                words.forEach((word) => {
                    if (category.name.toLowerCase().indexOf(word.trim()) === -1) find = false
                })

                return find
            })
)

export const selectCategoryById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
