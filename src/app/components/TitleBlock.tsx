import { Search as SearchIcon } from '@mui/icons-material'
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'

import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs'

interface TitleBlockProps {
    title: string
    searchDisabled?: boolean
    count?: number
    breadcrumbs?: BreadcrumbItem[]
    breadcrumbsItemsMobile?: BreadcrumbItem[]
    value?: string
    endNode?: React.ReactNode
    onSearch?: (query: string) => void
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
    title,
    searchDisabled,
    count,
    breadcrumbs,
    breadcrumbsItemsMobile,
    value = '',
    endNode,
    onSearch,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [search, setSearch] = useState<string>(value)

    const handleSearchChange = (e: any) => {
        const { value } = e.target
        setSearch(value)

        if (timer) {
            clearTimeout(timer)
        }

        setTimer(
            setTimeout(() => {
                onSearch?.(value)
            }, 300)
        )
    }

    return (
        <Box position={isMobile ? 'fixed' : 'relative'} top={0} width={'100%'} zIndex={2}>
            <Box
                display={'flex'}
                flexShrink={0}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={{
                    xs: 2,
                    md: 4,
                }}
                height={isMobile ? '58px' : '90px'}
                sx={{ bgcolor: 'white', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.08)', zIndex: 1 }}
            >
                <Box display={'flex'} alignItems={'flex-start'}>
                    <Box display={'flex'} alignItems={'center'}>
                        {!!breadcrumbs && !isMobile && breadcrumbs.length > 1 && <Breadcrumbs items={breadcrumbs} />}

                        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>
                            {title}
                        </Typography>
                    </Box>

                    {!!count && (
                        <Typography variant="h6" fontWeight={400} color="grey.400" ml={1}>
                            {count?.toLocaleString()}
                        </Typography>
                    )}
                </Box>

                <Box display={'flex'}>
                    {!searchDisabled && !isMobile && (
                        <TextField
                            fullWidth
                            placeholder={'Поиск'}
                            variant="filled"
                            value={search || ''}
                            onChange={handleSearchChange}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: <SearchIcon style={{ color: '#c7c7cc' }} />,
                            }}
                        />
                    )}

                    {!!endNode && endNode}
                </Box>
            </Box>

            {!!breadcrumbsItemsMobile && isMobile && breadcrumbsItemsMobile.length > 0 && (
                <Box px={2} py={1.5} sx={{ bgcolor: 'white', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.08)', zIndex: 1 }}>
                    <Breadcrumbs items={breadcrumbsItemsMobile} />
                </Box>
            )}
        </Box>
    )
}
