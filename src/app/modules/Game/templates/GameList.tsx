import {
    BorderStyle as BorderStyleIcon,
    Rocket as RocketIcon,
    SportsEsports as SportsEsportsIcon,
    Widgets as WidgetsIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { Main } from 'app/modules/Layout/templates/Main'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const GameList: React.FC = () => {
    const history = useHistory()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ITile[] = [
        {
            icon: <BorderStyleIcon fontSize="large" />,
            title: 'Escape',
            path: '/game/escape',
        },
        {
            icon: <RocketIcon fontSize="large" />,
            title: 'Space',
            path: '/game/space',
        },
        {
            icon: <WidgetsIcon fontSize="large" />,
            title: 'Собери белый свет',
            path: '/game/do_white',
        },
        {
            icon: <SportsEsportsIcon fontSize="large" />,
            title: 'Лишний цвет',
            path: '/game/find_color',
        },
    ]

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <Main title={'Игры'} searchDisabled>
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Grid container spacing={2}>
                    {links.map((link, index) => (
                        <Grid item key={index} xs={isMobile ? 6 : 4}>
                            <Tile data={link} onClick={handleClickRow} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Main>
    )
}
