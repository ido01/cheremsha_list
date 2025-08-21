import { Box, Typography } from '@mui/material'
import { ReactComponent as SortSVG } from 'assets/icons/Sort.svg'
import { ReactComponent as SortDownSVG } from 'assets/icons/SortDown.svg'
import React from 'react'
import { TTableOrder } from 'types/ITableDisplay'

interface TableHeaderRowProps {
    title: string
    alignTitle?: 'right' | 'inherit' | 'left' | 'center' | 'justify'
    name: string
    isSort?: boolean
    order?: TTableOrder
    onClick?: (order: TTableOrder) => void
}

export const TableHeaderRow: React.FC<TableHeaderRowProps> = ({ title, alignTitle, name, isSort, order, onClick }) => {
    const handleCLick = () => {
        if (!isSort) return
        if (name !== order?.row) {
            onClick?.({
                row: name,
                order: 'desc',
            })
        } else {
            onClick?.({
                row: name,
                order: order?.order === 'asc' ? 'desc' : 'asc',
            })
        }
    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            onClick={handleCLick}
            sx={{ cursor: isSort ? 'pointer' : 'default' }}
            position={'relative'}
        >
            <Box display={'flex'} alignItems={'center'} position={'absolute'} sx={{ right: '100%', mr: 0.5 }}>
                {isSort && name !== order?.row && <SortSVG />}

                {name === order?.row && order.order === 'desc' && <SortDownSVG />}
                {name === order?.row && order.order === 'asc' && (
                    <SortDownSVG style={{ transform: 'rotate(180deg)' }} />
                )}
            </Box>

            <Typography
                width={'100%'}
                variant="body3"
                color={name === order?.row ? 'black' : 'grey.600'}
                textAlign={alignTitle}
                sx={{
                    letterSpacing: '-0.5px',
                }}
            >
                {title}
            </Typography>
        </Box>
    )
}
