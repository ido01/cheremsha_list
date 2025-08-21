import { Box, Typography } from '@mui/material'
import React from 'react'

import { IFilter, ITableFree } from '../../types'
import { EmptyTable } from './EmptyTable'
import { TinyFilter } from './TinyFilter'

export const StepTwo: React.FC<{ tables: ITableFree[]; filter: IFilter; onChange: () => void }> = ({
    tables,
    filter,
    onChange,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
            }}
        >
            <TinyFilter filter={filter} onChange={onChange} />
            <Box>
                <Typography variant="body1">Свободные столы</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr',
                    }}
                >
                    {tables.map((table, index) => {
                        if (table.disabled) {
                            return null
                        }

                        return <EmptyTable key={index} table={table} filter={filter} />
                    })}
                </Box>
            </Box>
        </Box>
    )
}
