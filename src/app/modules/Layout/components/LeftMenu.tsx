import {
    CalendarMonth as CalendarMonthIcon,
    Contacts as ContactsIcon,
    DesignServices as DesignServicesIcon,
    Group as GroupIcon,
    Menu as MenuIcon,
    Percent as PercentIcon,
    Quiz as QuizIcon,
    School as SchoolIcon,
    StackedLineChart as StackedLineChartIcon,
} from '@mui/icons-material'
import { Box, colors, Container, Divider, IconButton, Paper } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { favoritesActions } from 'app/modules/Favorites/slice'
import { selectfavorites } from 'app/modules/Favorites/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TMenuItem } from 'types/TMenuItem'

import { MenuItem } from './MenuItem'

export const LeftMenu: React.FC = () => {
    const dispatch = useDispatch()

    const [isLage, setLage] = useState<boolean>(true)

    const profile = useSelector(selectProfile)

    const favorites = useSelector(selectfavorites)

    const menuItems: TMenuItem[] = [
        {
            icon: <QuizIcon />,
            title: 'Гайд',
            path: '/faq',
        },
        {
            icon: <SchoolIcon />,
            title: 'Обучение',
            path: '/school',
        },
        {
            icon: <StackedLineChartIcon />,
            title: 'Мотивация',
            path: '/motivation',
        },
        {
            icon: <PercentIcon />,
            title: 'Акции',
            path: '/actions',
        },
        {
            icon: <DesignServicesIcon />,
            title: 'Тестирование',
            path: '/quiz',
        },
        {
            icon: <CalendarMonthIcon />,
            title: 'Календарь',
            path: '/events',
        },
        {
            icon: <GroupIcon />,
            title: 'Сотрудники',
            path: '/users',
        },
        {
            icon: <ContactsIcon />,
            title: 'Важные контакты',
            path: '/contacts',
        },
    ]

    useEffect(() => {
        dispatch(favoritesActions.loadFavorites())
    }, [])

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

                    {favorites.map((user) => (
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
                    ))}
                </Box>
            </Box>

            <Box mb={3.5}>
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
