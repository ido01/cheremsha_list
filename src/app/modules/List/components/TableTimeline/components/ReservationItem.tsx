import { Air as AirIcon, TableBar as TableBarIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Colors } from 'app/modules/List/constants'
import { listsActions } from 'app/modules/List/slice'
import { convertTimeToText, curretnTime } from 'app/modules/List/utils'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { IReservationItemStatus, IReservationMapping, IReservationStatus } from 'types/ITable'

export const ReservationItem: React.FC<{
    reservation: IReservationMapping
    minWidth: number
    heightItem: number
    currentTime: number
    places: number
    free: boolean
}> = ({ reservation, minWidth, heightItem, currentTime, places, free }) => {
    const dispatch = useDispatch()

    const top = useMemo(() => {
        if (!free) {
            return 4
        }
        return 4 + (reservation.cross * (heightItem - 8)) / places
    }, [reservation, free])

    const leftTable = useMemo(() => {
        return reservation.stepsLeft * minWidth * 30 + 4
    }, [reservation, minWidth])

    const widthCard = useMemo(() => {
        return minWidth * 28
    }, [minWidth])

    const itemHeightDefault = heightItem - 8

    const itemHeight = useMemo(() => {
        if (free) {
            return (reservation.guests * (heightItem - 8)) / places
        }
        return itemHeightDefault
    }, [reservation, heightItem, free, places, itemHeightDefault])

    const dangerStart = useMemo(() => {
        return free ? 0 : reservation.startCrossMinutes * minWidth
    }, [reservation, minWidth])

    const dangerEnd = useMemo(() => {
        return free ? 0 : reservation.endCrossMinutes * minWidth
    }, [reservation, minWidth])

    // const start = (startPosition * 60 + reservation.start.minute + 30) * minWidth + 4
    const start = useMemo(() => {
        return (curretnTime(reservation.start, 0, 12) + 30) * minWidth + 4 + dangerStart
    }, [reservation, dangerStart, minWidth])

    const end = useMemo(() => {
        return (
            (curretnTime(reservation.status === 'close' ? reservation.close : reservation.end, 0, 12) + 30) * minWidth +
            4 -
            start -
            dangerEnd
        )
    }, [reservation, dangerStart, minWidth, dangerEnd, start])

    const startTime = useMemo(() => {
        return curretnTime(reservation.start)
    }, [reservation])

    const endTime = useMemo(() => {
        return curretnTime(reservation.end)
    }, [reservation])

    const statusPosition = useMemo(() => {
        return (currentTime - startTime) * minWidth - 108
    }, [currentTime, startTime, minWidth])

    const reservationStatus = useMemo(() => {
        if (reservation.status === 'init' && currentTime > startTime) {
            return 'late' as IReservationStatus
        } else if (reservation.status === 'active' && currentTime > endTime) {
            return 'delay' as IReservationStatus
        }
        return reservation.status
    }, [reservation, currentTime])

    const currentColor = useMemo(() => {
        return Colors[reservationStatus]
    }, [reservationStatus])

    const currentTableTimestamp = useMemo(() => {
        if (reservationStatus !== 'active' && reservationStatus !== 'delay') {
            return -1
        }
        return currentTime - startTime
    }, [currentTime, reservationStatus])

    const currentTableTime = useMemo(() => {
        if (currentTableTimestamp < 0) return ''

        const hour = Math.floor(currentTableTimestamp / 60)
        const minute = currentTableTimestamp % 60
        return convertTimeToText({
            hour,
            minute,
        })
    }, [currentTableTimestamp])

    const filterHookah = useMemo(() => {
        return reservation.items.filter((item) => item.position !== 'tea')
    }, [reservation])

    const currentHookahTimestamp = useMemo(() => {
        if (reservationStatus !== 'active' && reservationStatus !== 'delay') return -1
        if (!filterHookah.length) return -1

        const hookah = filterHookah[filterHookah.length - 1]

        const hookahTimeHour = hookah.time.hour > 10 ? hookah.time.hour : hookah.time.hour + 24
        const startTime = hookahTimeHour * 60 + hookah.time.minute
        return currentTime - startTime
    }, [currentTime, filterHookah, reservationStatus])

    const currentHookahTime = useMemo(() => {
        if (currentHookahTimestamp < 0) return ''

        const hour = Math.floor(currentHookahTimestamp / 60)
        const minute = currentHookahTimestamp % 60
        return convertTimeToText({
            hour,
            minute,
        })
    }, [currentHookahTimestamp])

    const handleClick = () => {
        dispatch(listsActions.showModal(reservation))
    }

    const getScheme = (position: IReservationItemStatus) => {
        if (position === 'hookah') {
            return {
                width: '2px',
                height: '12px',
                backgroundColor: '#fff',
            }
        } else if (position === 'author') {
            return {
                width: '12px',
                height: '12px',
                backgroundColor: '#fff',
            }
        } else if (position === 'double') {
            return {
                width: '12px',
                borderBottom: '2px solid #fff',
                borderTop: '2px solid #fff',
                height: '8px',
                position: 'relative',
                ':after': {
                    content: '""',
                    position: 'absolute',
                    top: '1px',
                    left: '-3px',
                    width: '18px',
                    height: '2px',
                    backgroundColor: '#fff',
                    transform: 'rotate(0.15turn)',
                },
            }
        } else if (position === 'express') {
            return {
                width: '12px',
                borderBottom: '2px solid #fff',
                position: 'relative',
                ':after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '2px',
                    backgroundColor: '#fff',
                    transform: 'rotate(0.15turn)',
                },
            }
        }
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                width: `${end}px`,
                top: `${top}px`,
                borderTopLeftRadius: !free && reservation.startCrossMinutes > 0 ? 0 : '8px',
                borderTopRightRadius: '8px',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: !free && reservation.endCrossMinutes > 0 ? 0 : '8px',
                backgroundColor: currentColor,
                border: '1px solid #fff',
                height: `${itemHeight}px`,
                left: `${start}px`,
                // overflow: 'hidden',
                boxSizing: 'border-box',
            }}
            onClick={handleClick}
        >
            {!!reservation.crossDelay && reservation.crossDelay > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: `100%`,
                        width: `${reservation.crossDelay}px`,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, #f00 10%, ${currentColor} 10%, ${currentColor} 50%, #f00 50%, #f00 60%, ${currentColor} 60%, ${currentColor})`,
                        zIndex: 2,
                        backgroundSize: '10px 10px',
                    }}
                ></Box>
            )}
            {!free && (reservationStatus === 'active' || reservationStatus === 'delay') && (
                <Box
                    sx={{
                        color: '#fff',
                        zIndex: 2,
                        position: 'absolute',
                        left:
                            statusPosition < 50 ? '50px' : end - statusPosition < 210 ? 'auto' : `${statusPosition}px`,
                        right: end - statusPosition < 210 ? `0px` : 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        height: `${itemHeight}px`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        pr: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                width: '100px',
                            }}
                        >
                            <Typography>{currentTableTime || '--:--'}</Typography>
                            <TableBarIcon fontSize="small" />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                minWidth: '100px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <AirIcon fontSize="small" />
                                <Typography>{currentHookahTime || '--:--'}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                {filterHookah.map((h, i) => (
                                    <Box key={i} sx={getScheme(h.position)}></Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            width: '100%',
                        }}
                    >
                        {filterHookah.map((h, i) => (
                            <Box key={i} sx={{ backgroundColor: '#fff', width: '2px', height: '20px' }}></Box>
                        ))}
                    </Box> */}
                </Box>
            )}
            {reservation.startCrossMinutes > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: `-${dangerStart}px`,
                        top: 0,
                        height: `calc(50% - 2px)`,
                        width: `${dangerStart}px`,
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                        background: `linear-gradient(45deg, #f00 10%, ${currentColor} 10%, ${currentColor} 50%, #f00 50%, #f00 60%, ${currentColor} 60%, ${currentColor})`,
                        zIndex: 1,
                        backgroundSize: '10px 10px',
                    }}
                ></Box>
            )}

            {reservation.endCrossMinutes > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        right: `-${dangerEnd - 2}px`,
                        bottom: 0,
                        height: `calc(50% - 2px)`,
                        width: `${dangerEnd}px`,
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: '8px',
                        background: `linear-gradient(45deg, #f00 10%, ${currentColor} 10%, ${currentColor} 50%, #f00 50%, #f00 60%, ${currentColor} 60%, ${currentColor})`,
                        zIndex: 1,
                        backgroundSize: '10px 10px',
                    }}
                ></Box>
            )}

            {!free ? (
                <Typography
                    variant="body1"
                    sx={{
                        color: '#FFF',
                        lineHeight: `${itemHeight}px`,
                        pl: 1,
                        position: 'relative',
                        left: 0,
                        zIndex: 2,
                    }}
                >
                    {reservation.name}
                </Typography>
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        height: `${itemHeightDefault}px`,
                        borderTopLeftRadius: !free && reservation.startCrossMinutes > 0 ? 0 : '8px',
                        borderTopRightRadius: '8px',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: !free && reservation.endCrossMinutes > 0 ? 0 : '8px',
                        backgroundColor: currentColor,
                        border: '1px solid #fff',
                        boxSizing: 'border-box',
                        top: `-${top - 4}px`,
                        left: `${leftTable}px`,
                        display: 'flex',
                        alignItems: 'center',
                        width: `${widthCard}px`,
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            width: `${widthCard + 4}px`,
                            top: `${top - 5}px`,
                            left: '-2px',
                            backgroundColor: currentColor,
                            height: `${itemHeight - 2}px`,
                        }}
                    ></Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#FFF',
                            lineHeight: `${itemHeight}px`,
                            pl: 1,
                            position: 'relative',
                            left: 0,
                            zIndex: 2,
                        }}
                    >
                        {reservation.name}
                    </Typography>

                    {(reservationStatus === 'active' || reservationStatus === 'delay') && (
                        <Box
                            sx={{
                                ml: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // flexDirection: 'column',
                                gap: 1,
                                zIndex: 2,
                            }}
                        >
                            {filterHookah.map((h, i) => (
                                <Box key={i} sx={getScheme(h.position)}></Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    )
}
