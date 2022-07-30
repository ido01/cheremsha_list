import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { TitleBlock } from 'app/components/TitleBlock'
import { CategoryAdminSettings } from 'app/modules/Categories/components/CategoryAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import { CategoriesList } from 'app/modules/Categories/templates/CategoriesList'
import { documentsActions } from 'app/modules/Documents/slice'
import { DocumentModal } from 'app/modules/Documents/templates/DocumentModal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ERole } from 'types'

export const SchoolCategoriesPage: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id?: string }>()

    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const profileRole = useSelector(selectProfileRole)
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(id || '0')
    const parentCategory = getCategory(category?.parentId || '0')

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Обучение',
            link: '/school',
        },
    ]

    const breadcrumbsItemsMobile: BreadcrumbItem[] = [
        {
            text: 'Обучение',
            link: '/school',
        },
    ]

    if (parentCategory) {
        breadcrumbsItems.push({
            text: parentCategory.name || '',
            link: `/school/${parentCategory.id}`,
        })
        breadcrumbsItemsMobile.push({
            text: parentCategory.name || '',
            link: `/school/${parentCategory.id}`,
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
        dispatch(categoriesActions.loadCategories('school'))
        dispatch(documentsActions.loadDocuments('school'))
    }, [])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSearchChange = (query: string) => {
        setSearch(query)
    }

    return (
        <>
            <TitleBlock
                title={category?.name || 'Обучение'}
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
                value={search}
                onSearch={handleSearchChange}
            />

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <CategoriesList type={'school'} search={search} />
            </Box>

            <DocumentModal />

            {profileRole === ERole.ADMIN && (
                <CategoryAdminSettings
                    type={'school'}
                    open={open}
                    id={id}
                    category={category}
                    handleClose={handleClose}
                />
            )}
        </>
    )
}
