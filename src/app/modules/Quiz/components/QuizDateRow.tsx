import { Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { IQuiz } from 'types/IQuiz'

interface QuizDateRowProps {
    item: IQuiz
}

export const QuizDateRow: React.FC<QuizDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {moment(item.createdAt).locale('ru').format('LL')}
    </Typography>
)
