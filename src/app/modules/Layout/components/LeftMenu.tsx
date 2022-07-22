import {
    DesignServices as DesignServicesIcon,
    Group as GroupIcon,
    Menu as MenuIcon,
    Quiz as QuizIcon,
    School as SchoolIcon,
    StackedLineChart as StackedLineChartIcon,
} from '@mui/icons-material'
import { Box, colors, Container, Divider, IconButton, Paper } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TMenuItem } from 'types/TMenuItem'

import { MenuItem } from './MenuItem'

export const LeftMenu: React.FC = () => {
    const [isLage, setLage] = useState<boolean>(true)

    const profile = useSelector(selectProfile)

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
        // {
        //     icon: <DesignServicesIcon />,
        //     title: 'Тестирование',
        //     path: '/quiz',
        // },
        {
            icon: <GroupIcon />,
            title: 'Сотрудники',
            path: '/users',
        },
    ]

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
                </Box>
            </Box>

            <Box mb={3.5}>
                <MenuItem
                    item={{
                        icon: <AvatarImage name={profile.name} image={profile.avatar?.url} size={'24px'} />,
                        title: `${profile.last_name} ${profile.name}`,
                        path: '/profile',
                    }}
                    isLage={isLage}
                />
            </Box>
        </Paper>
    )
}
