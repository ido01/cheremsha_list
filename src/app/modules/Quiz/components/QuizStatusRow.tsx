import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { IQuiz } from 'types/IQuiz'
import { EQuizState } from 'types/IQuizState'
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
                : item.state.state === EQuizState.REJECTED || item.state.state === EQuizState.CLOSED
                ? theme.palette.error.main
                : item.state.state === EQuizState.DONE
                ? theme.palette.warning.main
                : item.state.state === EQuizState.COMPLETED
                ? theme.palette.success.main
                : theme.palette.primary.main,
        })}
    >
        {item.draft ? 'Черновик' : convertQuizState(item.state.state)}
    </Typography>
)
