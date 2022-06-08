import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { ICategory } from 'types/ICategory'
import { convertDocumentState } from 'utils/convertUtils'

interface CategoryStatusRow {
    item: ICategory
}

export const CategoryStatusRow: React.FC<CategoryStatusRow> = ({ item }) => (
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
