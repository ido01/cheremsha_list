import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EQuestionType, IQuestion } from 'types/IQuestion'
import { convertQuestionType } from 'utils/convertUtils'

import { resultsActions } from '../slice'
import { selectAcceptLoading, selectDeclineLoading } from '../slice/selectors'

interface ResultQuestionProps {
    index: number
    question: IQuestion
}

export const ResultQuestion: React.FC<ResultQuestionProps> = ({ index, question }) => {
    const dispatch = useDispatch()

    const acceptLoading = useSelector(selectAcceptLoading)(question.state?.id || '')
    const declineLoading = useSelector(selectDeclineLoading)(question.state?.id || '')

    const handleQuestionAccept = () => {
        if (question.state) {
            dispatch(resultsActions.setQuestionAccept(question.state?.id))
        }
    }

    const handleQuestionDecline = () => {
        if (question.state) {
            dispatch(resultsActions.setQuestionDecline(question.state?.id))
        }
    }

    return (
        <Box key={question.uniq} sx={{ my: 1 }}>
            <Divider />

            <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                <Typography fontWeight="bold">Вопрос {index + 1}</Typography>

                <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                    {convertQuestionType(question.type)}
                </Typography>
            </Box>

            <Typography variant="body2">{question.text}</Typography>

            {question.type === EQuestionType.VARIANT &&
                question.variants.map((variant) => {
                    return (
                        <Box key={`${variant.id}_${variant.uniq}`} sx={{ display: 'flex', alignItems: 'center' }}>
                            {variant.id === question.state?.vid && variant.isCorrect && (
                                <CheckCircleOutlineIcon
                                    sx={(theme) => ({
                                        fontSize: 20,
                                        color: theme.palette.success.main,
                                    })}
                                />
                            )}
                            {variant.id === question.state?.vid && !variant.isCorrect && (
                                <HighlightOffIcon
                                    sx={(theme) => ({
                                        fontSize: 20,
                                        color: theme.palette.error.main,
                                    })}
                                />
                            )}
                            <Typography
                                variant="body3"
                                sx={(theme) => ({
                                    ml: variant.id !== question.state?.vid ? 3.5 : 1,
                                    color: variant.isCorrect ? theme.palette.success.main : theme.palette.grey[900],
                                })}
                            >
                                {variant.text}
                            </Typography>
                        </Box>
                    )
                })}

            {question.type === EQuestionType.TEXT && (
                <Box sx={{ display: 'flex' }}>
                    {question.state?.checked && !!question.state.result && (
                        <CheckCircleOutlineIcon
                            sx={(theme) => ({
                                fontSize: 20,
                                color: theme.palette.success.main,
                            })}
                        />
                    )}
                    {question.state?.checked && !question.state.result && (
                        <HighlightOffIcon
                            sx={(theme) => ({
                                fontSize: 20,
                                color: theme.palette.error.main,
                            })}
                        />
                    )}
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: question.state?.checked ? 1 : 3.5 }}
                    >
                        <Typography variant="body3">{question.state?.answer}</Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {(!question.state?.checked || question.state.result) && (
                                <LoadingButton
                                    loading={declineLoading}
                                    disabled={acceptLoading}
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    onClick={handleQuestionDecline}
                                >
                                    Не правильно
                                </LoadingButton>
                            )}

                            {(!question.state?.checked || !question.state.result) && (
                                <LoadingButton
                                    disabled={declineLoading}
                                    loading={acceptLoading}
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    onClick={handleQuestionAccept}
                                >
                                    Правильно
                                </LoadingButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}

            {question.type === EQuestionType.SORT &&
                question.variants.map((variant) => {
                    return (
                        <Box key={variant.uniq} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography
                                variant="body3"
                                sx={(theme) => ({
                                    ml: 3.5,
                                    color: theme.palette.grey[900],
                                })}
                            >
                                {variant.text}
                            </Typography>

                            {variant.state?.result && (
                                <CheckCircleOutlineIcon
                                    sx={(theme) => ({
                                        fontSize: 20,
                                        color: theme.palette.success.main,
                                    })}
                                />
                            )}
                            {!variant.state?.result && (
                                <HighlightOffIcon
                                    sx={(theme) => ({
                                        fontSize: 20,
                                        color: theme.palette.error.main,
                                    })}
                                />
                            )}

                            <Typography
                                variant="body3"
                                sx={(theme) => ({
                                    ml: variant.id !== question.state?.vid ? 3.5 : 1,
                                    color: theme.palette.grey[900],
                                })}
                            >
                                {variant.state?.text}
                            </Typography>
                        </Box>
                    )
                })}
        </Box>
    )
}
