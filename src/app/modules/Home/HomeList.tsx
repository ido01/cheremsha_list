import {
    AssistWalker as AssistWalkerIcon,
    CalendarMonth as CalendarMonthIcon,
    Contacts as ContactsIcon,
    ListAlt as ListAltIcon,
    LiveHelp as LiveHelpIcon,
    School as SchoolIcon,
    SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkAdminAccess } from 'utils/roles'

import { Main } from '../Layout/templates/Main'

export const HomeList: React.FC = () => {
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profileRole = useSelector(selectProfileRole)
    const settings = useSelector(selectSettings)

    const links: ITile[] = [
        // {
        //     icon: <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={'35px'} />,
        //     title: 'Профиль',
        //     path: '/profile',
        // },
        {
            icon: <CalendarMonthIcon fontSize="large" />,
            title: 'Календарь',
            path: '/events',
        },
        {
            icon: <ContactsIcon fontSize="large" />,
            title: 'Важные контакты',
            path: '/contacts',
        },
        {
            icon: <SchoolIcon fontSize="large" />,
            title: 'Документы',
            path: '/doc',
        },
        // {
        //     icon: <TaskAltIcon fontSize="large" />,
        //     title: 'Задачи',
        //     path: '/taskList',
        // },
        {
            icon: <SportsEsportsIcon fontSize="large" />,
            title: 'Игры',
            path: '/game',
        },
        {
            icon: <LiveHelpIcon fontSize="large" />,
            title: 'Обратная связь',
            path: '/reviews',
        },
    ]
    if (settings.project === 'hrzn') {
        links.push({
            icon: <ListAltIcon fontSize="large" />,
            title: 'Брони',
            path: '/list',
        })
    }

    if (checkAdminAccess(profileRole)) {
        // links.push({
        //     icon: <PollIcon fontSize="large" />,
        //     title: 'Опрос',
        //     path: '/polls',
        // })

        links.push({
            icon: <AssistWalkerIcon fontSize="large" />,
            title: 'Админка',
            path: '/admin',
        })
    }

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <Main title={'Главная'} searchDisabled>
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Grid container spacing={2}>
                    {links.map((link, index) => (
                        <Grid item key={index} xs={isMobile ? 6 : 3}>
                            <Tile data={link} onClick={handleClickRow} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Main>
    )
}
