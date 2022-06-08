import { Box, Typography } from '@mui/material'
import React from 'react'
import { ICategory } from 'types/ICategory'

import { CategoryDateRow } from './CategoryDateRow'
import { CategoryNameRow } from './CategoryNameRow'
import { CategoryStatusRow } from './CategoryStatusRow'

interface MobileCategoryViewProps {
    item: ICategory
}

export const MobileCategoryView: React.FC<MobileCategoryViewProps> = ({ item }) => (
    <Box px={2} width={'100%'}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Typography variant="caption" color="grey.600">
                    Название
                </Typography>

                <Box display={'flex'}>
                    <CategoryNameRow item={item} />
                </Box>
            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                <Typography variant="caption" color="grey.600">
                    Дата создания
                </Typography>

                <CategoryDateRow item={item} />
            </Box>
        </Box>

        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography mr={1} variant="caption" color="grey.600">
                    Статус
                </Typography>

                <CategoryStatusRow item={item} />
            </Box>
        </Box>
    </Box>
)
