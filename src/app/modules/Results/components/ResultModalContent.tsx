import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EState, EStatus } from 'types'
import { IUser } from 'types/IUser'

import { resultsActions } from '../slice'
import { selectQuiz, selectStatusQuiz } from '../slice/selectors'

interface ResultModalContentProps {
    id: string
    user: IUser
}

export const ResultModalContent: React.FC<ResultModalContentProps> = ({ id, user }) => {
    const dispatch = useDispatch()

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const status = useSelector(selectStatusQuiz)
    const quiz = useSelector(selectQuiz)

    const stateToText = useMemo(() => {
        switch (user.quiz?.state) {
            case EState.INITIAL:
                return 'Не пройден'
            case EState.PENDING:
                return 'В процессе'
            case EState.COMPLETED:
                return 'Выполнен'
            case EState.CLOSED:
                return 'Провален'
            case EState.REJECTED:
                return 'Отменен'
            default:
                return 'Не пройден'
        }
    }, [user])

    const percent = useMemo(() => {
        if (user.quiz) {
            return `${Math.round((user.quiz.correct / user.quiz.all_questions) * 100)}%`
        }

        return '0%'
    }, [user])

    const handleSetComplete = () => {
        dispatch(resultsActions.setResultCompleted({ id, uid: user.id }))
    }

    const handleSetRejected = () => {
        dispatch(resultsActions.setResultReject({ id, uid: user.id }))
        setOpenDialog(false)
    }

    return (
        <>
            <Grid container sx={{ my: 2.5 }} spacing={2.5}>
                <Grid item xs={6}>
                    <LabelText
                        label="Статус"
                        node={
                            <Typography
                                variant="body2"
                                sx={(theme) => ({
                                    color:
                                        !user.quiz ||
                                        user.quiz.state === EState.INITIAL ||
                                        user.quiz.state === EState.REJECTED
                                            ? theme.palette.primary.main
                                            : user.quiz.state === EState.PENDING
                                            ? theme.palette.warning.main
                                            : user.quiz.state === EState.COMPLETED
                                            ? theme.palette.success.main
                                            : theme.palette.error.main,
                                })}
                            >
                                {stateToText}
                            </Typography>
                        }
                    />
                </Grid>
                {user.quiz && user.quiz.state !== EState.REJECTED && (
                    <>
                        <Grid item xs={6}>
                            <LabelText
                                label="Результат"
                                node={
                                    <Typography
                                        variant="h6"
                                        sx={(theme) => ({
                                            color:
                                                user.quiz?.state === EState.COMPLETED
                                                    ? theme.palette.success.main
                                                    : theme.palette.error.main,
                                        })}
                                    >
                                        {percent}
                                    </Typography>
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LabelText
                                label="Правильно"
                                node={
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                                        <Typography
                                            variant="h6"
                                            sx={(theme) => ({ color: theme.palette.success.main, lineHeight: 1 })}
                                        >
                                            {user.quiz.correct}
                                        </Typography>

                                        <Typography>из {user.quiz.all_questions}</Typography>
                                    </Box>
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <LabelText
                                label="Ошибки"
                                node={
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                                        <Typography
                                            variant="h6"
                                            sx={(theme) => ({ color: theme.palette.error.main, lineHeight: 1 })}
                                        >
                                            {user.quiz.incorrect}
                                        </Typography>

                                        <Typography>из {user.quiz.all_questions}</Typography>
                                    </Box>
                                }
                            />
                        </Grid>
                    </>
                )}
            </Grid>

            <Divider />

            {(user.quiz?.state === EState.COMPLETED || user.quiz?.state === EState.CLOSED) && (
                <Box sx={{ my: 2.5 }}>
                    <Typography variant="h5">Тестирование</Typography>

                    {status === EStatus.PENDING && (
                        <Box sx={{ m: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {quiz && status !== EStatus.PENDING && (
                        <>
                            {quiz.questions.map((question, index) => (
                                <Box key={question.uniq} sx={{ my: 1 }}>
                                    <Typography fontWeight="bold">Вопрос {index + 1}</Typography>
                                    <Typography variant="body2">{question.text}</Typography>

                                    {question.variants.map((variant) => {
                                        return (
                                            <Box
                                                key={variant.uniq}
                                                sx={{ display: 'flex', ml: 2, gap: 1, alignItems: 'center' }}
                                            >
                                                {variant.id === question.state?.vid && (
                                                    <CheckCircleOutlineIcon
                                                        sx={(theme) => ({
                                                            fontSize: 11,
                                                            color: variant.isCorrect
                                                                ? theme.palette.success.main
                                                                : theme.palette.error.main,
                                                        })}
                                                    />
                                                )}
                                                <Typography
                                                    variant="body3"
                                                    sx={(theme) => ({
                                                        ml: variant.id !== question.state?.vid ? 2.4 : 0,
                                                        color: variant.isCorrect
                                                            ? theme.palette.success.main
                                                            : theme.palette.grey[900],
                                                    })}
                                                >
                                                    {variant.text}
                                                </Typography>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            ))}
                        </>
                    )}
                </Box>
            )}

            {(user.quiz?.state === EState.COMPLETED || user.quiz?.state === EState.CLOSED) && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        left: 0,
                        py: 2,
                        bgcolor: 'white',
                        zIndex: 1,
                    }}
                >
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            {(user.quiz?.state === EState.CLOSED || user.quiz?.state === EState.COMPLETED) && (
                                <LoadingButton color="error" variant="contained" onClick={() => setOpenDialog(true)}>
                                    Отменить результат тестирования
                                </LoadingButton>
                            )}
                        </Box>

                        {user.quiz?.state === EState.CLOSED && (
                            <LoadingButton color="success" variant="contained" onClick={handleSetComplete}>
                                Пометить пройденным
                            </LoadingButton>
                        )}
                    </Container>
                </Box>
            )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    Внимание! Вы безвозвратно хотите отменить результаты данного тестирования. Вы уверены?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleSetRejected} autoFocus color="error">
                        Отменить результаты тестирования
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
