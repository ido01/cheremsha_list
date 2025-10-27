import { Logout as LogoutIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { EGameState } from 'types/IGame'
import { request } from 'utils/request'

import { EscapeMap, generateLab } from '../../utils'
import { IPoint, Person } from '../Person/Person'
import { Wall } from '../Wall'

const PADDING = 64

interface Game {
    level: number
    size: number
    onEndGame: () => void
    onChangeState: (state: EGameState) => void
}

export const Game: React.FC<Game> = ({ level, size, onEndGame, onChangeState }: Game) => {
    const [lastWay, setLastWay] = useState<'left' | 'right'>('right')
    const [squareSizeThree, setSquareSizeThree] = useState(0)
    const [squareSize, setSquareSize] = useState(0)
    const [minSize, setMinSize] = useState(0)
    const [k, setK] = useState(0)
    const [pt, setPt] = useState(0)
    const [pl, setPl] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [lab, setLab] = useState<EscapeMap>([])

    const [point, setPoint] = useState<IPoint>()

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(document.body.clientWidth)
            setHeight(document.body.clientHeight)
        }
        updateSize()
        getLab()

        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    useEffect(() => {
        if (width > height) {
            getSize(height)
        } else {
            getSize(width)
        }
    }, [width, height])

    useEffect(() => {
        getLab()
        getSize(minSize)
    }, [size])

    const getSize = (min: number) => {
        setMinSize(min)
        const pw = min - PADDING
        const pSize = pw / size
        if (pSize > 48) {
            setSquareSize(48)
            setSquareSizeThree(16)
            const k = 48 / 8 / 3
            setK(k)
            const s = 48 * size
            const px = width - s
            setPl(px / 2)
            const py = height - s
            setPt(py / 2)
        } else {
            setSquareSize(pSize)
            setSquareSizeThree(pSize / 3)
            const k = pSize / 8 / 3
            setK(k)
            const s = pSize * size
            const px = width - s
            setPl(px / 2)
            const py = height - s
            setPt(py / 2)
        }
    }

    const getLab = () => {
        setLab(generateLab(size))
        setPoint({
            x: Math.floor(size / 2),
            y: Math.floor(size / 2),
        })
    }

    const moveUp = () => {
        if (point) {
            const p = lab[point.y][point.x]
            if (!p.top) {
                setPoint({
                    ...point,
                    y: point.y - 1,
                })
            }
        }
    }

    const moveDown = () => {
        if (point) {
            const p = lab[point.y][point.x]
            if (!p.botton) {
                setPoint({
                    ...point,
                    y: point.y + 1,
                })
            }
        }
    }

    const moveLeft = () => {
        setLastWay('left')
        if (point) {
            const p = lab[point.y][point.x]
            if (!p.left) {
                setPoint({
                    ...point,
                    x: point.x - 1,
                })
            }
        }
    }

    const moveRight = () => {
        setLastWay('right')
        if (point) {
            const p = lab[point.y][point.x]
            if (!p.right) {
                setPoint({
                    ...point,
                    x: point.x + 1,
                })
            }
        }
    }

    const eventListener = (e: any) => {
        if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        } else if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            moveUp()
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => moveLeft(),
        onSwipedRight: () => moveRight(),
        onSwipedUp: () => moveUp(),
        onSwipedDown: () => moveDown(),
        preventScrollOnSwipe: true,
    })

    useEffect(() => {
        document.addEventListener('keyup', eventListener)
        return () => {
            document.removeEventListener('keyup', eventListener)
        }
    }, [eventListener])

    useEffect(() => {
        if (point) {
            if (point.x < 0 || point.y < 0 || point.x >= size || point.y >= size) {
                endGame()
            }

            const newLab = [...lab]
            if (newLab[point.y]?.[point.x]) {
                newLab[point.y][point.x].visible = true
                setLab(newLab)
            }
        }
    }, [point])

    const endGame = () => {
        onEndGame()
        request('games/escape', {
            method: 'POST',
            data: {
                points: level,
            },
        })
    }

    return (
        <Box
            {...handlers}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#131313',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <Typography variant="h3" color="white">
                    Escape
                </Typography>

                <IconButton
                    aria-label="sound"
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        zIndex: 101,
                    }}
                    onClick={() => onChangeState(EGameState.INIT)}
                >
                    <LogoutIcon sx={{ color: '#fff' }} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: `${pt}px`,
                    left: `${pl}px`,
                    backgroundColor: '#232323',
                }}
            >
                {lab.map((line, i) => {
                    return line.map((wall, j) => {
                        return (
                            <Wall
                                key={`${i}_${j}_${wall.visible}`}
                                i={i}
                                j={j}
                                point={wall}
                                size={size}
                                lab={lab}
                                k={k}
                                squareSize={squareSize}
                                squareSizeThree={squareSizeThree}
                            />
                        )
                    })
                })}
                {point && (
                    <Person way={lastWay} point={point} squareSize={squareSize} squareSizeThree={squareSizeThree} />
                )}
            </Box>
        </Box>
    )
}
