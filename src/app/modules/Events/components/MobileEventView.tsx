import { Box, Typography } from '@mui/material'
import React from 'react'
import { IEvent } from 'types/IEvent'

interface MobileEventViewProps {
    event: IEvent
}

export const MobileEventView: React.FC<MobileEventViewProps> = ({ event }) => {
    return (
        <Box px={2} pt={2} width={'100%'}>
            <Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Box ml={2}>
                        <Typography variant="body2">{event.name}</Typography>
                    </Box>

                    <Box>
                        {event.prioritet === 'hight' && (
                            <Typography variant="body2" color="red">
                                Важно
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
