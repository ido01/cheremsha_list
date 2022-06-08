import { Box } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { TitleBlock } from 'app/components/TitleBlock'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { UserDataForm } from '../components/UserDataForm'
import { usersActions } from '../slice'
import { selectUserById } from '../slice/selectors'

export const UserChange: React.FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    const getUser = useSelector(selectUserById)
    const user = getUser(id)

    const imageSrc = user?.avatar?.url || ''
    const userName = user?.name

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Сотрудники',
            link: '/users',
        },
    ]

    const breadcrumbsItemsMobile: BreadcrumbItem[] = [
        {
            text: 'Сотрудники',
            link: '/users',
        },
    ]

    if (user) {
        breadcrumbsItems.push({
            text: '',
        })
        breadcrumbsItemsMobile.push({
            text: user.name || '',
        })
    }

    useEffect(() => {
        dispatch(usersActions.loadUser(id))
    }, [])

    return (
        <>
            <TitleBlock
                title={user?.name || 'Сотрудники'}
                breadcrumbs={breadcrumbsItems}
                breadcrumbsItemsMobile={breadcrumbsItemsMobile}
            />

            <Box p={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <Box display={'flex'}>
                    <AvatarImage name={userName} image={imageSrc} size={'70px'} />
                </Box>

                <Box sx={{ mt: 5 }}>
                    <UserDataForm />
                </Box>
            </Box>
        </>
    )
}
