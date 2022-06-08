import {
    AccountCircle as AccountCircleIcon,
    ChildCare as ChildCareIcon,
    DesignServices as DesignServicesIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Quiz as QuizIcon,
    School as SchoolIcon,
} from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { TMenuItem } from 'types/TMenuItem'

export const MobileNavigation: React.FC = () => {
    const history = useHistory()

    const { url } = useRouteMatch()
    const [value, setValue] = React.useState(0)

    const profile = useSelector(selectProfile)

    const menuItems: TMenuItem[] = [
        {
            icon: <QuizIcon />,
            title: 'Гайд',
            path: '/faq',
            id: 0,
        },
        {
            icon: <SchoolIcon />,
            title: 'Обучение',
            path: '/school',
            id: 1,
        },
        {
            icon: <DesignServicesIcon />,
            title: 'Тестирование',
            path: '/quiz',
            id: 2,
        },
        {
            icon: <AvatarImage name={profile.name} image={profile.avatar?.url} size={'24px'} />,
            title: 'Профиль',
            path: '/profile',
            id: 3,
        },
    ]

    useEffect(() => {
        const activeItem = menuItems.find((item) => {
            if (item.path === '/') {
                return url === '/' ? true : false
            }
            return item.path ? url.indexOf(item.path) !== -1 : false
        })
        setValue(activeItem?.id || 0)
    }, [])

    const handleClick = (item: TMenuItem) => {
        setValue(item.id || 0)
        if (item.path) {
            history.push(item.path)
        }
    }

    return (
        <Box position={'fixed'} bottom={0} left={0} width={'100%'}>
            <BottomNavigation showLabels value={value}>
                {menuItems.map((item, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={item.title}
                        icon={item.icon}
                        onClick={() => handleClick(item)}
                    />
                ))}
            </BottomNavigation>
        </Box>
    )
}
