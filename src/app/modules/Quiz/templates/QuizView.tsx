import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { profileActions } from 'app/modules/Profile/slice'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EState } from 'types'

import { Question } from '../components/Question'
import { quizActions } from '../slice'
import { selectQuizById } from '../slice/selectors'

export const QuizView: React.FC = () => {
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profile = useSelector(selectProfile)
    const quiz = useSelector(selectQuizById)(profile.state?.qid || '')

    const [expanded, setExpanded] = React.useState<number>(0)

    useEffect(() => {
        if (profile.state?.qid) {
            dispatch(quizActions.loadQuizById(profile.state.qid))
        }
    }, [profile])

    const handleCompleted = () => {
        if (quiz) {
            dispatch(quizActions.completed(quiz.id))
        }
    }

    const handleFinish = () => {
        dispatch(profileActions.loadProfile())
    }

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
                    {(quiz?.state.state === EState.COMPLETED || quiz?.state.state === EState.CLOSED) && (
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
                                {quiz?.state.state === EState.COMPLETED && (
                                    <>
                                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />

                                        <Typography variant="h5">Вы успешно выполнили тест</Typography>
                                    </>
                                )}

                                {quiz?.state.state === EState.CLOSED && (
                                    <>
                                        <HighlightOffIcon color="error" sx={{ fontSize: 64 }} />

                                        <Typography variant="h5">Тест провален</Typography>
                                    </>
                                )}

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
                                        <Typography variant="h6" sx={(theme) => ({ color: theme.palette.error.main })}>
                                            {quiz.state.incorrect}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box mt={4}>
                                <LoadingButton color="success" fullWidth onClick={handleFinish}>
                                    Завершить
                                </LoadingButton>
                            </Box>
                        </>
                    )}

                    {quiz?.state.state === EState.PENDING && (
                        <>
                            {quiz?.questions.map((question, index) => (
                                <Question
                                    key={index}
                                    expanded={expanded}
                                    index={index}
                                    question={question}
                                    qid={quiz.id}
                                    onExpandedChange={(expanded) => setExpanded(expanded)}
                                    onNext={() => setExpanded((value) => value + 1)}
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
