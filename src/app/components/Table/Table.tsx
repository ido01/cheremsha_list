import {
    Box,
    CircularProgress,
    Grid,
    Pagination,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React from 'react'
import { TLimit, TTableOrder, TTablePagination, TTableRowData } from 'types/ITableDisplay'

import { DragTableItem, TableHeaderRow } from '.'

interface TableProps {
    items: any[]
    rows: TTableRowData[]
    order?: TTableOrder
    pagination?: TTablePagination
    isDraggable?: boolean
    isLoading?: boolean
    disablePadding?: boolean
    disableBorder?: boolean
    disableHeader?: boolean
    fullBorder?: boolean
    mobileView?: (data: any) => React.ReactNode
    handleOrderChange?: (order: TTableOrder) => void
    handleLimitChange?: (limit: TLimit) => void
    handlePageChange?: (page: number) => void
    handleClickRow?: (data: any) => void
}

export const Table: React.FC<TableProps> = ({
    items,
    order,
    rows,
    pagination,
    isDraggable,
    isLoading,
    disablePadding,
    disableBorder,
    disableHeader,
    fullBorder,
    mobileView,
    handleOrderChange,
    handleLimitChange,
    handlePageChange,
    handleClickRow,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Box px={{ xs: disablePadding ? 0 : 1, md: disablePadding ? 0 : 4 }} mb={6} position={'relative'}>
            {!isMobile && !disableHeader && (
                <Box
                    sx={{
                        pb: 1.5,
                        px: { md: 2 },
                        borderBottom: disableBorder ? undefined : '1px solid #f2f2f7',
                    }}
                >
                    <Grid container columnSpacing={2}>
                        {rows.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.xs || row.headerXs ? (
                                    <Grid item xs={row.headerXs || row.xs}>
                                        <TableHeaderRow
                                            title={row.title}
                                            alignTitle={row.alignTitle}
                                            name={row.name}
                                            isSort={row.isSort}
                                            order={order}
                                            onClick={handleOrderChange}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid key={index} item xs>
                                        <TableHeaderRow
                                            title={row.title}
                                            alignTitle={row.alignTitle}
                                            name={row.name}
                                            isSort={row.isSort}
                                            order={order}
                                            onClick={handleOrderChange}
                                        />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            )}

            <Box>
                {items.map((item, index) => (
                    <DragTableItem
                        index={index}
                        item={item}
                        rows={rows}
                        key={`${item.type}${item.id}`}
                        isDraggable={isDraggable}
                        fullBorder={fullBorder}
                        disableBorder={disableBorder}
                        mobileView={mobileView}
                        handleClickRow={handleClickRow}
                    />
                ))}
            </Box>

            {isLoading && !pagination && (
                <Box mt={4.25} display={'flex'} justifyContent={'center'}>
                    <CircularProgress />
                </Box>
            )}

            {!!pagination && (
                <Box display={'flex'} justifyContent={'space-between'} mt={4}>
                    {pagination.total_pages > 1 && (
                        <Pagination
                            count={pagination.total_pages}
                            page={pagination.page}
                            shape="rounded"
                            onChange={(_, value) => handlePageChange?.(value)}
                        />
                    )}

                    {pagination.total_pages <= 1 && <Box />}

                    {isLoading && <CircularProgress />}

                    {!isMobile && (
                        <ToggleButtonGroup
                            size="small"
                            value={pagination.limit}
                            exclusive
                            onChange={(_, value) => handleLimitChange?.(value)}
                        >
                            <ToggleButton value={25}>25</ToggleButton>
                            <ToggleButton value={50}>50</ToggleButton>
                            <ToggleButton value={100}>100</ToggleButton>
                        </ToggleButtonGroup>
                    )}
                </Box>
            )}
        </Box>
    )
}
