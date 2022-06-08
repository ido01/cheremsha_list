import { createSelector } from '@reduxjs/toolkit'
import { EType, RootState } from 'types'

import { categoriesAdapter } from '.'

const { selectAll, selectById } = categoriesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.categories

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectCategories = createSelector(
    [selectDomain],
    (state) => (id: string, path: EType) =>
        selectAll(state).filter((category) => category.parentId === id && category.path === path)
)

export const selectSearchCategories = createSelector(
    [selectDomain],
    (state) => (search: string, path: EType) =>
        selectAll(state)
            .filter((category) => category.path === path)
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
