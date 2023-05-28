import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { TitleBlock } from 'app/components/TitleBlock'
import { CategoryAdminSettings } from 'app/modules/Categories/components/CategoryAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import { CategoriesQuizList } from 'app/modules/Categories/templates/CategoriesQuizList'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ERole } from 'types'

import { quizActions } from '../slice'
import { QuizModal } from './QuizModal'

export const QuizList: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id?: string }>()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(id || '0')
    const parentCategory = getCategory(category?.parentId || '0')

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Тестирование',
            link: '/quiz',
        },
    ]

    const breadcrumbsItemsMobile: BreadcrumbItem[] = [
        {
            text: 'Тестирование',
            link: '/quiz',
        },
    ]

    if (parentCategory) {
        breadcrumbsItems.push({
            text: parentCategory.name || '',
            link: `/quiz/${parentCategory.id}`,
        })
        breadcrumbsItemsMobile.push({
            text: parentCategory.name || '',
            link: `/quiz/${parentCategory.id}`,
        })
    }

    if (category) {
        breadcrumbsItems.push({
            text: '',
        })
        breadcrumbsItemsMobile.push({
            text: category?.name || '',
        })
    }

    useEffect(() => {
        dispatch(categoriesActions.loadCategories('quiz'))
        dispatch(quizActions.loadQuiz())
        dispatch(quizActions.hideModal())
    }, [])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <TitleBlock
                title={category?.name || 'Тестирование'}
                breadcrumbs={breadcrumbsItems}
                breadcrumbsItemsMobile={breadcrumbsItemsMobile}
                endNode={
                    profileRole === ERole.ADMIN ? (
                        <IconButton
                            sx={{ ml: 2 }}
                            aria-label="more"
                            id="long-button"
                            aria-haspopup="true"
                            onClick={handleSettingOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    ) : undefined
                }
            />

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <CategoriesQuizList type={'quiz'} />
            </Box>

            <QuizModal />

            {profileRole === ERole.ADMIN && (
                <CategoryAdminSettings
                    type={'quiz'}
                    open={open}
                    id={id}
                    category={category}
                    handleClose={handleClose}
                />
            )}
        </>
    )
}
