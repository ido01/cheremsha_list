import { Box, Typography } from '@mui/material'
import React from 'react'
import { IDocument } from 'types/IDocument'

import { DocumentDateRow } from './DocumentDateRow'
import { DocumentNameRow } from './DocumentNameRow'
import { DocumentStatusRow } from './DocumentStatusRow'

interface MobileDocumentViewProps {
    item: IDocument
}

export const MobileDocumentView: React.FC<MobileDocumentViewProps> = ({ item }) => (
    <Box px={2} width={'100%'}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Typography variant="caption" color="grey.600">
                    Название
                </Typography>

                <Box display={'flex'}>
                    <DocumentNameRow item={item} />
                </Box>
            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                <Typography variant="caption" color="grey.600">
                    Дата создания
                </Typography>

                <DocumentDateRow item={item} />
            </Box>
        </Box>

        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography mr={1} variant="caption" color="grey.600">
                    Статус
                </Typography>

                <DocumentStatusRow item={item} />
            </Box>
        </Box>
    </Box>
)
