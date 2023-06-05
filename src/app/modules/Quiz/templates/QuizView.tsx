import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CountDown } from 'app/components/CountDown'
import { profileActions } from 'app/modules/Profile/slice'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EQuizState } from 'types/IQuizState'

import { Question } from '../components/Question'
import { quizActions } from '../slice'
import { selectQuizById, selectQuizLoading } from '../slice/selectors'

export const QuizView: React.FC = () => {
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profile = useSelector(selectProfile)
    const quiz = useSelector(selectQuizById)(profile.state?.qid || '')
    const isQuizLoading = useSelector(selectQuizLoading)

    useEffect(() => {
        if (profile.state?.qid) {
            dispatch(quizActions.loadQuizById(profile.state.qid))
        }
    }, [profile])

    const time = useMemo(() => {
        if (quiz?.state) {
            return quiz.max_min * 60 - quiz.state.time_passed
        }
        return null
    }, [quiz?.state.time_passed])

    const handleCompleted = () => {
        if (quiz) {
            dispatch(quizActions.completed(quiz.id))
        }
    }

    const handleFinish = () => {
        dispatch(profileActions.loadProfile())
    }

    useEffect(() => {
        if (time && time <= 0 && quiz?.state.state === EQuizState.PENDING) {
            handleCompleted()
        }
    }, [time])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant={isMobile ? 'h6' : 'h4'}>{`Тест "${quiz?.name || ''}"`}</Typography>
            </Box>

            <Box sx={{ p: 1, mt: 6, flex: '1 0 auto' }}>
                <Paper
                    sx={{
                        bgcolor: 'white',
                        height: '100%',
                        width: '100%',
                        borderRadius: 2,
                        py: 4,
                        px: isMobile ? 1 : 4,
                    }}
                >
                    {isQuizLoading && !quiz && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {(quiz?.state?.state === EQuizState.COMPLETED ||
                        quiz?.state?.state === EQuizState.CLOSED ||
                        quiz?.state?.state === EQuizState.DONE) && (
                        <>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {quiz?.state.state === EQuizState.DONE && (
                                    <>
                                        <CheckCircleOutlineIcon color="warning" sx={{ fontSize: 64 }} />

                                        <Typography variant="h5">Ваш результат отправлен на проверку</Typography>
                                    </>
                                )}
                                {quiz?.state.state === EQuizState.COMPLETED && (
                                    <>
                                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />

                                        <Typography variant="h5">Вы успешно выполнили тест</Typography>
                                    </>
                                )}

                                {quiz?.state.state === EQuizState.CLOSED && (
                                    <>
                                        <HighlightOffIcon color="error" sx={{ fontSize: 64 }} />

                                        <Typography variant="h5">Тест провален</Typography>
                                    </>
                                )}

                                {quiz?.state.state !== EQuizState.DONE && (
                                    <Box
                                        sx={{
                                            width: 540,
                                            maxWidth: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                                            <Typography variant="body1">Правильно:</Typography>
                                            <Typography
                                                variant="h6"
                                                sx={(theme) => ({ color: theme.palette.success.main })}
                                            >
                                                {quiz.state.correct}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                                            <Typography variant="body1">Ошибок:</Typography>
                                            <Typography
                                                variant="h6"
                                                sx={(theme) => ({ color: theme.palette.error.main })}
                                            >
                                                {quiz.state.incorrect}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>

                            <Box mt={4}>
                                <LoadingButton color="success" fullWidth onClick={handleFinish}>
                                    Завершить
                                </LoadingButton>
                            </Box>
                        </>
                    )}

                    {quiz?.state?.state === EQuizState.PENDING && (
                        <>
                            {time !== null && time > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                    <CountDown seconds={time} onEnd={handleCompleted} />
                                </Box>
                            )}

                            {quiz?.questions.map((question, index) => (
                                <Question
                                    key={index}
                                    expanded={quiz.state ? quiz.state.current_question : -1}
                                    index={index}
                                    question={question}
                                    qid={quiz.id}
                                />
                            ))}

                            <Box mt={2}>
                                <LoadingButton color="success" fullWidth onClick={handleCompleted}>
                                    Отправить результат
                                </LoadingButton>
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </>
    )
}
