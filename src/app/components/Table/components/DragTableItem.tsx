import { Box, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { ReactComponent as DndSVG } from 'assets/icons/DND.svg'
import React from 'react'
import { TTableRowData } from 'types/ITable'

import { TableRow } from './TableRow'

interface DragTableItemProps {
    item: any
    rows: TTableRowData[]
    isDraggable?: boolean
    mobileView?: (data: any) => React.ReactNode
    handleClickRow?: (data: any) => void
}

export const DragTableItem: React.FC<DragTableItemProps> = ({
    item,
    rows,
    isDraggable,
    mobileView,
    handleClickRow,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Box
            key={item.id}
            sx={{
                mt: { xs: 1, md: 0 },
                bgcolor: 'white',
                borderRadius: { xs: 2, md: 1 },
                cursor: handleClickRow ? 'pointer' : 'default',
                '&:hover': handleClickRow
                    ? {
                          bgcolor: '#F4F6FB',
                      }
                    : undefined,
            }}
            onClick={(e) => {
                if (e.target instanceof Element) {
                    if (e.target.tagName.toLowerCase() !== 'svg' && e.target.tagName.toLowerCase() !== 'button') {
                        handleClickRow?.(item)
                    }
                } else {
                    handleClickRow?.(item)
                }
            }}
        >
            <Box
                display={'flex'}
                alignItems={'center'}
                minHeight={'56px'}
                py={1.25}
                px={{ md: 2 }}
                sx={{ borderBottom: '1px solid #F4F6FB' }}
            >
                {(!isMobile || !mobileView) && (
                    <Grid container columnSpacing={2}>
                        {rows.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.xs ? (
                                    <Grid item xs={row.xs} md={row.md || row.xs}>
                                        <TableRow>
                                            {!index && isDraggable && (
                                                <Box>
                                                    <IconButton>
                                                        <DndSVG />
                                                    </IconButton>
                                                </Box>
                                            )}
                                            {row.element(item)}
                                        </TableRow>
                                    </Grid>
                                ) : (
                                    <Grid item xs>
                                        <TableRow>
                                            {!index && isDraggable && (
                                                <Box>
                                                    <IconButton>
                                                        <DndSVG />
                                                    </IconButton>
                                                </Box>
                                            )}
                                            {row.element(item)}
                                        </TableRow>
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                )}

                {isMobile && mobileView && <>{mobileView(item)}</>}
            </Box>
        </Box>
    )
}
