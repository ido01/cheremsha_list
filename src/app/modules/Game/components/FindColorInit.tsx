import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EGameState } from 'types/IGame'

interface FindColorInitProps {
    onChangeState: (state: EGameState) => void
}

export const FindColorInit: React.FC<FindColorInitProps> = ({ onChangeState }) => {
    const history = useHistory()

    const [openHelp, setOpenHelp] = useState<boolean>(false)

    return (
        <>
            <Box
                sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Button color="success" variant="contained" size="large" onClick={() => onChangeState(EGameState.GAME)}>
                    Новая игра
                </Button>
                <Button
                    color="warning"
                    variant="contained"
                    size="large"
                    onClick={() => onChangeState(EGameState.RESULT)}
                >
                    Результаты
                </Button>
                <Button color="primary" variant="contained" size="large" onClick={() => setOpenHelp(true)}>
                    Правила игры
                </Button>
                <Button color="error" variant="contained" size="large" onClick={() => history.push('/game')}>
                    Выйти с игры
                </Button>
            </Box>
            <Dialog open={openHelp} onClose={() => setOpenHelp(false)} aria-labelledby="alert-dialog-title">
                <DialogTitle>Правила</DialogTitle>

                <DialogContent>
                    <DialogContentText>Есть поле одинаковых квадратиков</DialogContentText>
                    <DialogContentText>Но один квадратик отличается по цвету</DialogContentText>
                    <DialogContentText>Выберите верный</DialogContentText>
                    <DialogContentText>Но время ограничено!</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button fullWidth onClick={() => setOpenHelp(false)} color="primary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
