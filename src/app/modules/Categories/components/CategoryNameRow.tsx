import { FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { ICategory } from 'types/ICategory'

interface CategoryNameRowProps {
    item: ICategory
}

export const CategoryNameRow: React.FC<CategoryNameRowProps> = ({ item }) => (
    <>
        <FolderOpenIcon
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

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
