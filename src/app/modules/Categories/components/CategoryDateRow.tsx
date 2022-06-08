import { Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryDateRowProps {
    item: ICategory
}

export const CategoryDateRow: React.FC<CategoryDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {moment(item.createdAt).locale('ru').format('LL')}
    </Typography>
)
