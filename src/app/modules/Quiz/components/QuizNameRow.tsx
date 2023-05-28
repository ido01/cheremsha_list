import { Assignment as AssignmentIcon, AssignmentTurnedIn as AssignmentTurnedInIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { IQuiz } from 'types/IQuiz'

interface QuizNameRowProps {
    item: IQuiz
}

export const QuizNameRow: React.FC<QuizNameRowProps> = ({ item }) => (
    <>
        {item.state.state !== EState.COMPLETED && (
            <AssignmentIcon
                sx={(theme) => ({
                    color:
                        item.state.state === EState.REJECTED || item.state.state === EState.CLOSED
                            ? theme.palette.error.main
                            : item.state.state === EState.PENDING
                            ? theme.palette.warning.main
                            : item.state.state === EState.COMPLETED
                            ? theme.palette.success.main
                            : theme.palette.primary.main,
                })}
            />
        )}
        {item.state.state === EState.COMPLETED && (
            <AssignmentTurnedInIcon
                sx={(theme) => ({
                    color:
                        item.state.state === EState.REJECTED
                            ? theme.palette.error.main
                            : item.state.state === EState.PENDING
                            ? theme.palette.warning.main
                            : item.state.state === EState.COMPLETED
                            ? theme.palette.success.main
                            : theme.palette.primary.main,
                })}
            />
        )}

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
