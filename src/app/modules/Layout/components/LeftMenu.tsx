import {
    AssistWalker as AssistWalkerIcon,
    CalendarMonth as CalendarMonthIcon,
    Contacts as ContactsIcon,
    Group as GroupIcon,
    ListAlt as ListAltIcon,
    LiveHelp as LiveHelpIcon,
    Menu as MenuIcon,
    School as SchoolIcon,
    SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material'
import { Box, IconButton, Paper } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile, selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TMenuItem } from 'types/TMenuItem'
import { checkAdminAccess } from 'utils/roles'

import { MenuItem } from './MenuItem'

export const LeftMenu: React.FC = () => {
    const [isLage, setLage] = useState<boolean>(true)

    const profile = useSelector(selectProfile)
    const profileRole = useSelector(selectProfileRole)
    const settings = useSelector(selectSettings)

    const menuItems: TMenuItem[] = [
        // {
        //     icon: (
        //         <Badge badgeContent={1} color="error">
        //             <TaskAltIcon />
        //         </Badge>
        //     ),
        //     title: 'Задачи',
        //     path: '/tasks',
        // },
        {
            icon: <SchoolIcon />,
            title: 'Документы',
            path: '/doc',
        },
        {
            icon: <ContactsIcon />,
            title: 'Важные контакты',
            path: '/contacts',
        },
        {
            icon: <GroupIcon />,
            title: 'Все сотрудники',
            path: '/users',
        },
        {
            icon: <SportsEsportsIcon />,
            title: 'Игры',
            path: '/game',
        },
        {
            icon: <LiveHelpIcon />,
            title: 'Обратная связь',
            path: '/reviews',
        },
    ]

    if (settings.project === 'hrzn') {
        menuItems.push({
            icon: <ListAltIcon />,
            title: 'Брони',
            path: '/list',
        })
    }

    if (checkAdminAccess(profileRole)) {
        menuItems.push({
            icon: <AssistWalkerIcon />,
            title: 'Админка',
            path: '/admin',
        })
    }

    return (
        <Paper
            sx={{
                width: isLage ? '280px' : '68px',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#FAFAFA',
                justifyContent: 'space-between',
                transition: '.3s',
                overflow: 'hidden',
                flexShrink: 0,
                borderRadius: 8,
                m: 1,
                mr: 0,
                boxSizing: 'border-box',
                border: '1px solid #EEEEEE',
            }}
            elevation={0}
            square={true}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 8,
                        boxShadow: '0px 4px 4px #3332',
                        p: 1,
                        pr: 2,
                        m: 1,
                    }}
                >
                    <IconButton onClick={() => setLage(!isLage)}>
                        <MenuIcon />
                    </IconButton>

                    {isLage && <Logo />}
                </Box>

                <Box
                    sx={{
                        mt: 1,
                        p: '8px',
                        overflow: 'auto',
                    }}
                >
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} item={item} isLage={isLage} />
                    ))}

                    {/* {favorites.map((user) => (
                        <MenuItem
                            key={user.id}
                            item={{
                                icon: <AvatarImage name={user.name} image={user.avatar?.url} size={'24px'} />,
                                title: `${user.last_name} ${user.name}`,
                            }}
                            isLage={isLage}
                            onClick={() => {
                                dispatch(favoritesActions.setActiveId(user.id))
                                dispatch(favoritesActions.showModal())
                            }}
                        />
                    ))} */}
                </Box>
            </Box>

            <Box
                sx={{
                    p: '8px',
                    pb: '12px',
                    overflow: 'auto',
                }}
            >
                <MenuItem
                    item={{
                        icon: <CalendarMonthIcon />,
                        title: 'Календарь',
                        path: '/events',
                    }}
                    isLage={isLage}
                />
                <MenuItem
                    item={{
                        icon: <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={28} />,
                        title: `${profile.last_name} ${profile.name}`,
                        path: '/profile',
                    }}
                    isLage={isLage}
                />
            </Box>
        </Paper>
    )
}
