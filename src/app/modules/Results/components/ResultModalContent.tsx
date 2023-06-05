import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { EQuizState, IQuizState } from 'types/IQuizState'
import { IUser } from 'types/IUser'
import { convertResultState } from 'utils/convertUtils'

import { resultsActions } from '../slice'
import {
    selectClosedLoading,
    selectCompletedLoading,
    selectQuiz,
    selectRejectedLoading,
    selectStatusQuiz,
} from '../slice/selectors'
import { ResultQuestion } from './ResultQuestion'

interface ResultModalContentProps {
    id: string
    user: IUser
    onQuizStateChange?: (state: IQuizState) => void
}

export const ResultModalContent: React.FC<ResultModalContentProps> = ({ id, user, onQuizStateChange }) => {
    const dispatch = useDispatch()

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const status = useSelector(selectStatusQuiz)
    const quiz = useSelector(selectQuiz)
    const closedLoading = useSelector(selectClosedLoading)
    const completedLoading = useSelector(selectCompletedLoading)
    const rejectedLoading = useSelector(selectRejectedLoading)

    const stateToText = useMemo(() => convertResultState(quiz?.state?.state || EQuizState.INITIAL), [quiz])

    const timePassed = useMemo(() => {
        if (quiz && quiz.state) {
            const all_time = quiz.state.end_time - quiz.state.start_time
            const hours = Math.floor(all_time / 3600)
            const minutes = Math.floor((all_time % 3600) / 60)
            const seconds = all_time % 60
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`
        }

        return '00:00:00'
    }, [quiz])

    const percent = useMemo(() => {
        if (quiz && quiz.state) {
            return `${Math.round((quiz.state.correct / quiz.state.all_questions) * 100)}%`
        }

        return '0%'
    }, [quiz])

    const handleSetComplete = () => {
        dispatch(resultsActions.setResultCompleted({ id, uid: user.id }))
    }

    const handleSetClosed = () => {
        dispatch(resultsActions.setResultClosed({ id, uid: user.id }))
    }

    const handleSetRejected = () => {
        dispatch(resultsActions.setResultReject({ id, uid: user.id }))
        setOpenDialog(false)
    }

    useEffect(() => {
        if (quiz) {
            onQuizStateChange?.(quiz.state)
        }
    }, [quiz?.state])

    return (
        <>
            <Grid container sx={{ my: 2.5 }} spacing={2.5}>
                {quiz && (
                    <Grid item xs={12}>
                        <LabelText
                            label="Статус"
                            node={
                                <Typography
                                    variant="body2"
                                    sx={(theme) => ({
                                        color:
                                            !quiz.state ||
                                            quiz.state.state === EQuizState.INITIAL ||
                                            quiz.state.state === EQuizState.REJECTED ||
                                            quiz.state.state === EQuizState.PENDING
                                                ? theme.palette.primary.main
                                                : quiz.state.state === EQuizState.DONE
                                                ? theme.palette.warning.main
                                                : quiz.state.state === EQuizState.COMPLETED
                                                ? theme.palette.success.main
                                                : theme.palette.error.main,
                                    })}
                                >
                                    {stateToText}
                                </Typography>
                            }
                        />
                    </Grid>
                )}

                {quiz &&
                    quiz.state &&
                    quiz.state.state !== EQuizState.INITIAL &&
                    quiz.state.state !== EQuizState.REJECTED &&
                    quiz.state.state !== EQuizState.PENDING && (
                        <>
                            <Grid item xs={6}>
                                <LabelText
                                    label="Время выполнения"
                                    node={<Typography variant="h6">{timePassed}</Typography>}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LabelText
                                    label="Результат"
                                    node={
                                        <Typography
                                            variant="h6"
                                            sx={(theme) => ({
                                                color:
                                                    quiz.state?.state === EQuizState.COMPLETED
                                                        ? theme.palette.success.main
                                                        : quiz.state?.state === EQuizState.CLOSED
                                                        ? theme.palette.error.main
                                                        : quiz.state && quiz.state.incorrect > quiz.incorrect_count
                                                        ? theme.palette.error.main
                                                        : theme.palette.warning.main,
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
                                                {quiz.state.correct}
                                            </Typography>

                                            <Typography>из {quiz.state.all_questions}</Typography>
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
                                                {quiz.state.incorrect}
                                            </Typography>

                                            <Typography>из {quiz.state.all_questions}</Typography>
                                        </Box>
                                    }
                                />
                            </Grid>
                        </>
                    )}
            </Grid>

            <Divider />

            {quiz &&
                (quiz.state?.state === EQuizState.COMPLETED ||
                    quiz.state?.state === EQuizState.CLOSED ||
                    quiz.state?.state === EQuizState.DONE) && (
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
                                    <ResultQuestion key={question.uniq} index={index} question={question} />
                                ))}
                            </>
                        )}
                    </Box>
                )}

            {quiz &&
                (quiz.state?.state === EQuizState.COMPLETED ||
                    quiz.state?.state === EQuizState.CLOSED ||
                    quiz.state?.state === EQuizState.DONE) && (
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
                                {(quiz.state?.state === EQuizState.CLOSED ||
                                    quiz.state?.state === EQuizState.COMPLETED) && (
                                    <LoadingButton
                                        disabled={completedLoading}
                                        color="error"
                                        variant="contained"
                                        onClick={() => setOpenDialog(true)}
                                    >
                                        Отменить результат тестирования
                                    </LoadingButton>
                                )}
                                {quiz.state?.state === EQuizState.DONE && (
                                    <LoadingButton
                                        loading={closedLoading}
                                        disabled={completedLoading}
                                        color="error"
                                        variant="contained"
                                        onClick={handleSetClosed}
                                    >
                                        Отклонить
                                    </LoadingButton>
                                )}
                            </Box>

                            {(quiz.state?.state === EQuizState.CLOSED || quiz.state?.state === EQuizState.DONE) && (
                                <LoadingButton
                                    disabled={closedLoading || rejectedLoading}
                                    loading={completedLoading}
                                    color="success"
                                    variant="contained"
                                    onClick={handleSetComplete}
                                >
                                    Принять
                                </LoadingButton>
                            )}
                        </Container>
                    </Box>
                )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Вы безвозвратно хотите отменить результаты данного тестирования. Вы уверены?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton loading={rejectedLoading} onClick={handleSetRejected} autoFocus color="error">
                        Отменить результаты тестирования
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
