import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { IDocument } from 'types/IDocument'
import { convertDocumentState } from 'utils/convertUtils'

interface DocumentStatusRowProps {
    item: IDocument
}

export const DocumentStatusRow: React.FC<DocumentStatusRowProps> = ({ item }) => (
    <Typography
        variant="body2"
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
    >
        {convertDocumentState(item.state.state)}
    </Typography>
)
