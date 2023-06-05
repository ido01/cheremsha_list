import { createSelector } from '@reduxjs/toolkit'
import { EType, RootState } from 'types'

import { quizAdapter } from '.'

const { selectAll, selectById } = quizAdapter.getSelectors()

const selectDomain = (state: RootState) => state.quiz

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectQuestionLoading = createSelector([selectDomain], (state) => state.questionLoading)

export const selectQuizLoading = createSelector([selectDomain], (state) => state.quizLoading)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectQuiz = createSelector(
    [selectDomain],
    (state) => (id: string) => selectAll(state).filter((quiz) => quiz.parentId === id)
)

export const selectSearchQuiz = createSelector(
    [selectDomain],
    (state) => (search: string, path: EType) =>
        selectAll(state)
            .filter((document) => document.path === path)
            .filter((document) => {
                const words = search.toLowerCase().split(' ')

                let find = true

                words.forEach((word) => {
                    if (document.name.toLowerCase().indexOf(word.trim()) === -1) find = false
                })

                return find
            })
)

export const selectQuizById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
