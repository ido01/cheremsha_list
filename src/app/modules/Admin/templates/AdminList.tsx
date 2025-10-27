import {
    Agriculture as AgricultureIcon,
    Apartment as ApartmentIcon,
    Grade as GradeIcon,
    TableRestaurant as TableRestaurantIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkAdminAccess } from 'utils/roles'

export const AdminList: React.FC = () => {
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profileRole = useSelector(selectProfileRole)
    const settings = useSelector(selectSettings)

    const links: ITile[] = []
    if (checkAdminAccess(profileRole)) {
        // links.push({
        //     icon: <PollIcon fontSize="large" />,
        //     title: 'Опрос',
        //     path: '/polls',
        // })

        links.push({
            icon: <AgricultureIcon fontSize="large" />,
            title: 'Должности',
            path: '/positions',
        })

        links.push({
            icon: <ApartmentIcon fontSize="large" />,
            title: 'Точки',
            path: '/locations',
        })

        links.push({
            icon: <GradeIcon fontSize="large" />,
            title: 'Ачивки',
            path: '/achieve',
        })
    }

    if (settings.project === 'hrzn') {
        links.push({
            icon: <TableRestaurantIcon fontSize="large" />,
            title: 'Столы',
            path: '/tables',
        })
    }

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <Main title={'Админка'} searchDisabled>
            <Box pb={11}>
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
