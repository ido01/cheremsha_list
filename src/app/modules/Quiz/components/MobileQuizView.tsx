import { Box, Typography } from '@mui/material'
import React from 'react'
import { IQuiz } from 'types/IQuiz'

import { QuizDateRow } from './QuizDateRow'
import { QuizNameRow } from './QuizNameRow'
import { QuizStatusRow } from './QuizStatusRow'

interface MobileQuizViewProps {
    item: IQuiz
}

export const MobileQuizView: React.FC<MobileQuizViewProps> = ({ item }) => (
    <Box px={2} width={'100%'}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Typography variant="caption" color="grey.600">
                    Название
                </Typography>

                <Box display={'flex'}>
                    <QuizNameRow item={item} />
                </Box>
            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                <Typography variant="caption" color="grey.600">
                    Дата создания
                </Typography>

                <QuizDateRow item={item} />
            </Box>
        </Box>

        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography mr={1} variant="caption" color="grey.600">
                    Статус
                </Typography>

                <QuizStatusRow item={item} />
            </Box>
        </Box>
    </Box>
)
