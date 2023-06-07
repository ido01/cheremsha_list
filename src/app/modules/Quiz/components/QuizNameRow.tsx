import { Assignment as AssignmentIcon, AssignmentTurnedIn as AssignmentTurnedInIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { IQuiz } from 'types/IQuiz'
import { EQuizState } from 'types/IQuizState'

interface QuizNameRowProps {
    item: IQuiz
}

export const QuizNameRow: React.FC<QuizNameRowProps> = ({ item }) => (
    <>
        {item.state.state !== EQuizState.COMPLETED && (
            <AssignmentIcon
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
            />
        )}
        {item.state.state === EQuizState.COMPLETED && (
            <AssignmentTurnedInIcon
                sx={(theme) => ({
                    color: theme.palette.success.main,
                })}
            />
        )}

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
