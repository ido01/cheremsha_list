import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EGameState } from 'types/IGame'

interface MenuProps {
    loading: boolean
    onChangeState: (state: EGameState) => void
}

export const Menu: React.FC<MenuProps> = ({ loading, onChangeState }) => {
    const history = useHistory()

    const [activeStep, setActiveStep] = useState(0)
    const [openHelp, setOpenHelp] = useState<boolean>(false)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleRules = () => {
        setActiveStep(0)
        setOpenHelp(true)
    }

    return (
        <>
            <Box
                sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    px: 4,
                    pt: 11,
                }}
            >
                <Typography variant="h2" color="white">
                    ESCAPE
                </Typography>
                <Button
                    fullWidth
                    disabled={loading}
                    color="success"
                    variant="contained"
                    size="large"
                    onClick={() => onChangeState(EGameState.GAME)}
                >
                    Новая игра
                </Button>
                <Button
                    fullWidth
                    color="warning"
                    variant="contained"
                    size="large"
                    onClick={() => onChangeState(EGameState.RESULT)}
                >
                    Результаты
                </Button>
                <Button fullWidth color="primary" variant="contained" size="large" onClick={handleRules}>
                    Правила игры
                </Button>
                <Button fullWidth color="error" variant="contained" size="large" onClick={() => history.push('/game')}>
                    Выйти с игры
                </Button>
            </Box>
            <Dialog fullWidth open={openHelp} onClose={() => setOpenHelp(false)} aria-labelledby="alert-dialog-title">
                <DialogTitle>Как играть</DialogTitle>

                <DialogContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step key={0}>
                            <StepLabel>Шаг 1</StepLabel>
                            <StepContent>
                                <Typography>Используй стрелочки клавиатуры или свайп телефона что бы ходить</Typography>

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                            Далее
                                        </Button>
                                        <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>Шаг 2</StepLabel>
                            <StepContent>
                                <Typography>Исследуйте лабирит и ищите выход</Typography>

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={() => setOpenHelp(false)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Играть
                                        </Button>
                                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
            </Dialog>
        </>
    )
}
