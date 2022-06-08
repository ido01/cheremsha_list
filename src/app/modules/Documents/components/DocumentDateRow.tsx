import { Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentDateRowProps {
    item: IDocument
}

export const DocumentDateRow: React.FC<DocumentDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {moment(item.createdAt).locale('ru').format('LL')}
    </Typography>
)
