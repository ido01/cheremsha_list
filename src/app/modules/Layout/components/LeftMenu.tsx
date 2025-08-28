import {
    AssistWalker as AssistWalkerIcon,
    CalendarMonth as CalendarMonthIcon,
    Contacts as ContactsIcon,
    Group as GroupIcon,
    ListAlt as ListAltIcon,
    Menu as MenuIcon,
    Poll as PollIcon,
    School as SchoolIcon,
    SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material'
import { Box, colors, Container, Divider, IconButton, Paper } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile, selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ERole } from 'types'
import { TMenuItem } from 'types/TMenuItem'

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
    ]

    if (settings.project === 'hrzn') {
        menuItems.push({
            icon: <ListAltIcon />,
            title: 'Брони',
            path: '/list',
        })
    }

    if (profileRole === ERole.ADMIN) {
        menuItems.push({
            icon: <PollIcon />,
            title: 'Опрос',
            path: '/polls',
        })

        menuItems.push({
            icon: <AssistWalkerIcon />,
            title: 'Админка',
            path: '/admin',
        })
    }

    return (
        <Paper
            sx={{
                width: isLage ? '280px' : '88px',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: colors.blueGrey[50],
                justifyContent: 'space-between',
                transition: '1s',
                overflow: 'hidden',
                flexShrink: 0,
            }}
            elevation={0}
            square={true}
        >
            <Box>
                <Container>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} height={'90px'}>
                        <IconButton onClick={() => setLage(!isLage)}>
                            <MenuIcon />
                        </IconButton>

                        {isLage && <Logo />}
                    </Box>
                </Container>

                <Divider sx={{ m: 0, borderColor: colors.grey[400] }} />

                <Box
                    sx={{
                        mt: 2.5,
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

            <Box mb={3.5}>
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
                        icon: <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={'24px'} />,
                        title: `${profile.last_name} ${profile.name}`,
                        path: '/profile',
                    }}
                    isLage={isLage}
                />
            </Box>
        </Paper>
    )
}
