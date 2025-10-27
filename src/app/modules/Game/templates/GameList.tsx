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
import { useNavigate } from 'react-router-dom'

export const GameList: React.FC = () => {
    const history = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ITile[] = [
        {
            icon: <BorderStyleIcon fontSize="large" />,
            title: 'Escape',
            onClick: () => {
                location.href = '/game/escape'
            },
        },
        {
            icon: <RocketIcon fontSize="large" />,
            title: 'Space',
            onClick: () => {
                location.href = '/game/space'
            },
        },
        {
            icon: <WidgetsIcon fontSize="large" />,
            title: 'Собери белый свет',
            onClick: () => {
                location.href = '/game/do_white'
            },
        },
        {
            icon: <SportsEsportsIcon fontSize="large" />,
            title: 'Лишний цвет',
            onClick: () => {
                location.href = '/game/find_color'
            },
        },
    ]

    const handleClickRow = (item: ITile) => {
        if (item.path) {
            history(item.path)
        }
        item.onClick?.()
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
