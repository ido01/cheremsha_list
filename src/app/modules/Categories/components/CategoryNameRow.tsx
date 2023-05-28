import { FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryNameRowProps {
    item: ICategory
}

export const CategoryNameRow: React.FC<CategoryNameRowProps> = ({ item }) => (
    <>
        <FolderOpenIcon
            sx={(theme) => ({
                color: theme.palette.grey[600],
            })}
        />

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
