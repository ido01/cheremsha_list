import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { IQuiz } from 'types/IQuiz'
import { convertQuizState } from 'utils/convertUtils'

interface QuizStatusRowProps {
    item: IQuiz
}

export const QuizStatusRow: React.FC<QuizStatusRowProps> = ({ item }) => (
    <Typography
        variant="body2"
        sx={(theme) => ({
            color: item.draft
                ? theme.palette.grey[600]
                : item.state.state === EState.REJECTED || item.state.state === EState.CLOSED
                ? theme.palette.error.main
                : item.state.state === EState.PENDING
                ? theme.palette.warning.main
                : item.state.state === EState.COMPLETED
                ? theme.palette.success.main
                : theme.palette.primary.main,
        })}
    >
        {item.draft ? 'Черновик' : convertQuizState(item.state.state)}
    </Typography>
)
