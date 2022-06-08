import { Assignment as AssignmentIcon, AssignmentTurnedIn as AssignmentTurnedInIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { IDocument } from 'types/IDocument'

interface DocumentNameRowProps {
    item: IDocument
}

export const DocumentNameRow: React.FC<DocumentNameRowProps> = ({ item }) => (
    <>
        {item.state.state !== EState.COMPLETED && (
            <AssignmentIcon
                sx={(theme) => ({
                    color:
                        item.state.state === EState.REJECTED
                            ? theme.palette.error.main
                            : item.state.state === EState.PENDING
                            ? theme.palette.warning.main
                            : item.state.state === EState.COMPLETED
                            ? theme.palette.grey[600]
                            : theme.palette.success.main,
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
                            ? theme.palette.grey[600]
                            : theme.palette.success.main,
                })}
            />
        )}

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
