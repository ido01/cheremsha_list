import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import * as Colors from '@mui/material/colors'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EGameState, IGame, IGameResponse } from 'types/IGame'
import { rand } from 'utils/rand'
import { request } from 'utils/request'

import { FindColorInit } from '../components/FindColorInit'
import { FindColorResults } from '../components/FindColorResults'

const colors = [
    Colors.purple,
    Colors.pink,
    Colors.deepPurple,
    Colors.indigo,
    Colors.blue,
    Colors.lightBlue,
    Colors.cyan,
    Colors.teal,
    Colors.green,
    Colors.lightGreen,
    Colors.lime,
    Colors.yellow,
    Colors.amber,
    Colors.orange,
]

export const FindColor: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null)
    const tick_time = 200

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [game, setGame] = useState<IGame>()
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [levelTime, setLevelTime] = React.useState(5000)
    const [currentTime, setCurrentTime] = React.useState(-10)
    const [openEnd, setOpenEnd] = useState<boolean>(false)
    const [lines, setLines] = useState(0)
    const [points, setPoints] = useState(0)
    const [activeItem, setActiveItem] = useState<number>(0)
    const [activeColorKey, setActiveColorKey] = useState<number>(0)
    const [state, setState] = useState<EGameState>(EGameState.INIT)

    const itemsCount = useMemo(() => lines * lines, [lines])

    const itemHeight = useMemo(() => {
        if (!ref.current || !lines) return 50
        return (ref.current.offsetHeight - 2 * (isMobile ? 8 : 8 * 4)) / lines - 8
    }, [lines])

    const xs = useMemo(() => {
        return 12 / lines
    }, [lines])

    const items = useMemo(() => {
        const rows = []
        for (let i = 0; i < lines * lines; i++) {
            rows.push(i)
        }

        return rows
    }, [lines])

    useEffect(() => {
        if (timer) {
            clearTimeout(timer)
        }
        if (currentTime >= 0) {
            setTimer(
                setTimeout(() => {
                    if (currentTime - tick_time < 0) {
                        endGame()
                    } else {
                        setCurrentTime(currentTime - tick_time)
                    }
                }, tick_time)
            )
        }
    }, [currentTime])

    useEffect(() => {
        if (state === EGameState.GAME) {
            setLines(2)
            setPoints(1)
            setLevelTime(5000)
        }
    }, [state])

    useEffect(() => {
        if (!points) return
        if (points % 10 === 0) {
            setLines((value) => value + 1)
        }
        nextStep()
    }, [points])

    const nextStep = () => {
        if (timer) {
            clearTimeout(timer)
        }
        setLevelTime((value) => {
            const newTime = value - 100
            setCurrentTime(newTime > 1000 ? newTime : value)
            return newTime > 1000 ? newTime : value
        })
        setActiveColorKey(rand(0, colors.length - 1))
        setActiveItem(rand(0, itemsCount - 1))
    }

    const handleClick = (item: number) => {
        if (item === activeItem) {
            setPoints((value) => value + 1)
        } else {
            endGame()
        }
    }

    const endGame = () => {
        if (timer) {
            clearTimeout(timer)
        }
        setOpenEnd(true)
        request('games/find_color', {
            method: 'POST',
            data: {
                points,
            },
        }).then((response: IGameResponse) => {
            setGame(response.data)
        })
    }

    const handleCloseEnd = () => {
        setOpenEnd(false)
        setLines(2)
        setPoints(0)
        setState(EGameState.INIT)
    }

    const getGame = () => {
        request('games/find_color').then((response: IGameResponse) => {
            setGame(response.data)
        })
    }

    useEffect(() => {
        getGame()
    }, [])

    return (
        <Box
            sx={{
                width: '700px',
                maxWidth: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: '1 0 auto',
                py: 2,
            }}
        >
            <Paper
                sx={{
                    bgcolor: 'white',
                    height: '100%',
                    width: '100%',
                    borderRadius: 2,
                    py: 4,
                    px: isMobile ? 1 : 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1 0 auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'flex-end',
                        mb: 2,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        Лишний цвет
                    </Typography>

                    {state === EGameState.GAME && (
                        <Typography variant="h6" fontWeight="bold">
                            Счет: {points}
                        </Typography>
                    )}

                    {state !== EGameState.GAME && (
                        <Typography variant="h6" fontWeight="bold">
                            Лучший: {game?.best}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {state === EGameState.GAME && (
                        <Box
                            sx={{
                                height: '2px',
                                backgroundColor: colors[activeColorKey][600],
                                transition: '0.3s',
                                width: `${(currentTime / levelTime) * 100}%`,
                            }}
                        />
                    )}

                    <Paper
                        ref={ref}
                        sx={{
                            bgcolor: 'grey.100',
                            height: '100%',
                            width: '100%',
                            borderRadius: 2,
                            p: isMobile ? 1 : 4,
                            flex: '1 0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {state === EGameState.INIT && (
                            <FindColorInit onChangeState={(newState) => setState(newState)} />
                        )}

                        {state === EGameState.RESULT && (
                            <FindColorResults onChangeState={(newState) => setState(newState)} />
                        )}

                        {state === EGameState.GAME && (
                            <>
                                <Grid container spacing={2} alignItems="baseline">
                                    {items.map((item) => (
                                        <Grid key={item} item xs={xs}>
                                            <Paper
                                                sx={{
                                                    bgcolor:
                                                        activeItem === item
                                                            ? colors[activeColorKey][400]
                                                            : colors[activeColorKey][600],
                                                    width: '100%',
                                                    height: `${itemHeight}px`,
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleClick(item)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Paper>
                </Box>
            </Paper>

            <Dialog open={openEnd} aria-labelledby="alert-dialog-title">
                <DialogTitle>Упс!</DialogTitle>

                <DialogContent>
                    <DialogContentText>Вы проиграли, ваш результат:</DialogContentText>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography fontWeight="bold">{points}</Typography>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button fullWidth onClick={handleCloseEnd} color="primary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
