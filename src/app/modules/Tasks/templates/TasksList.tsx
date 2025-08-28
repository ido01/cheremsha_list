import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { TitleBlock } from 'app/components/TitleBlock'
import { CategoryAdminSettings } from 'app/modules/Categories/components/CategoryAdminSettings'
import { CategoriesBigList } from 'app/modules/Categories/templates/CategoriesBigList'
import { documentsActions } from 'app/modules/Documents/slice'
import { DocumentModal } from 'app/modules/Documents/templates/DocumentModal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ERole } from 'types'

import { FilterBlock } from '../components/FilterBlock'

export const TasksList: React.FC = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const { id } = useParams<{ id?: string }>()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Задачи',
            link: '/tasks',
        },
    ]

    useEffect(() => {
        dispatch(documentsActions.loadDocuments('task'))
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
                title={'Задачи'}
                breadcrumbs={breadcrumbsItems}
                breadcrumbsItemsMobile={breadcrumbsItems}
                searchDisabled
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

            <Box
                pt={4}
                flex="1 0 100%"
                sx={{
                    bgcolor: isMobile ? 'grey.200' : 'grey.50',
                    overflow: 'auto',
                    maxHeight: { md: 'calc( 100vh - 90px )' },
                }}
            >
                <FilterBlock />
                <CategoriesBigList />
            </Box>

            <DocumentModal />

            {profileRole === ERole.ADMIN && <CategoryAdminSettings open={open} id={id} handleClose={handleClose} />}
        </>
    )
}
