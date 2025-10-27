import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EGameState, IGame, IGameResponse } from 'types/IGame'
import { request } from 'utils/request'

import { Game } from './components/Game'
import { Menu } from './components/Menu'
import { Results } from './components/Results'

export const Escape: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState<EGameState>(EGameState.INIT)
    const [openEnd, setOpenEnd] = useState<boolean>(false)
    const [game, setGame] = useState<IGame>()
    const [size, setSize] = useState(3)

    const handleNext = () => {
        setOpenEnd(false)
        getGame()
    }

    const endGame = () => {
        setOpenEnd(true)
    }

    const handleCloseEnd = () => {
        setOpenEnd(false)
        getGame()
        // setPoints(0)
        setState(EGameState.INIT)
    }

    const getGame = () => {
        setLoading(true)
        request('games/escape').then((response: IGameResponse) => {
            setGame(response.data)
        })
    }

    useEffect(() => {
        getGame()
    }, [])

    useEffect(() => {
        if (game) {
            setSize(3 + game.best)
            setLoading(false)
        }
    }, [game])

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#131313',
            }}
        >
            {state === EGameState.INIT && <Menu loading={loading} onChangeState={(newState) => setState(newState)} />}
            {game && state === EGameState.GAME && (
                <Game
                    level={game.best + 1}
                    size={size}
                    onEndGame={endGame}
                    onChangeState={(newState) => setState(newState)}
                />
            )}
            {state === EGameState.RESULT && <Results onChangeState={(newState) => setState(newState)} />}

            <Dialog open={openEnd} aria-labelledby="alert-dialog-title">
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 120, mb: 4 }} />

                        <Typography variant="h5">Вы прошли уровень: {(game?.best || 0) + 1}</Typography>
                        <Typography variant="h5">Вы лучший!</Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ textAlign: 'center' }}>Истинный исследователь всего темного!</Typography>
                        <Typography sx={{ textAlign: 'center' }}>
                            Теперь надо выбраться из чего-то более темного и глубокого
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button fullWidth onClick={handleNext} color="success" variant="contained">
                        Следующий уровень
                    </Button>
                    <Button fullWidth onClick={handleCloseEnd} color="primary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
