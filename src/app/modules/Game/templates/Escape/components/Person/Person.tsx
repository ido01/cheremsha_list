import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

export interface IPoint {
    x: number
    y: number
}

interface PersonProps {
    way: 'left' | 'right'
    squareSizeThree: number
    squareSize: number
    point: IPoint
}

export const Person: React.FC<PersonProps> = ({ way, squareSize, squareSizeThree, point }) => {
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [walk, setWalk] = useState(true)

    const top = (squareSize - 16) / 2 - squareSizeThree
    const left = (squareSize - 16) / 2 - squareSizeThree

    useEffect(() => {
        if (timer) {
            clearTimeout(timer)
        }

        setWalk(true)

        setTimer(
            setTimeout(() => {
                setWalk(false)
            }, 300)
        )
    }, [point])

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    height: `${16}px`,
                    width: `${16}px`,
                    opacity: walk ? 0 : 1,
                    top: `${(point.y - 0) * squareSize + top}px`,
                    left: `${(point.x - 0) * squareSize + left}px`,
                    backgroundImage: 'url(/assets/escape/Idle.png)',
                    animation: 'idle 1s steps(9) infinite',
                    backgroundSize: '576px 64px',
                    transform: way === 'left' ? 'scaleX(-1)' : undefined,
                    marginLeft: way === 'left' ? '8px' : undefined,
                    transition: '.3s',
                    '@keyframes idle': {
                        from: {
                            backgroundPosition: '-85px -28px',
                        },
                        to: {
                            backgroundPosition: `-1237px -28px`,
                        },
                    },
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    height: `${16}px`,
                    width: `${16}px`,
                    opacity: walk ? 1 : 0,
                    top: `${(point.y - 0) * squareSize + top}px`,
                    left: `${(point.x - 0) * squareSize + left}px`,
                    backgroundImage: 'url(/assets/escape/Walk.png)',
                    animation: 'walk .5s steps(12) infinite',
                    backgroundSize: '768px 64px',
                    transform: way === 'left' ? 'scaleX(-1)' : undefined,
                    marginLeft: way === 'left' ? '8px' : undefined,
                    transition: '.3s',
                    '@keyframes walk': {
                        from: {
                            backgroundPosition: '-85px -28px',
                        },
                        to: {
                            backgroundPosition: '-1621px -28px',
                        },
                    },
                }}
            />

            {/* <Box
                sx={{
                    position: 'absolute',
                    height: '38px',
                    width: '28px',
                    opacity: walk ? 0 : 1,
                    top: `${(point.y - 0) * squareSize + squareSize - 38}px`,
                    left: `${(point.x - 0) * squareSize + squareSize / 2 - 14}px`,
                    backgroundImage: 'url(/assets/escape/Idle.png)',
                    animation: 'idle 1s steps(9) infinite',
                    backgroundSize: '576px 64px',
                    transform: way === 'left' ? 'scaleX(-1)' : undefined,
                    marginLeft: way === 'left' ? '-4px' : undefined,
                    transition: '.3s',
                    '@keyframes idle': {
                        from: {
                            backgroundPosition: '-85px -28px',
                        },
                        to: {
                            backgroundPosition: `-1237px -28px`,
                        },
                    },
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    height: '38px',
                    width: '28px',
                    opacity: walk ? 1 : 0,
                    top: `${(point.y - 0) * squareSize + squareSize - 38}px`,
                    left: `${(point.x - 0) * squareSize + squareSize / 2 - 14}px`,
                    backgroundImage: 'url(/assets/escape/Walk.png)',
                    animation: 'walk .5s steps(12) infinite',
                    backgroundSize: '768px 64px',
                    transform: way === 'left' ? 'scaleX(-1)' : undefined,
                    marginLeft: way === 'left' ? '-4px' : undefined,
                    transition: '.3s',
                    '@keyframes walk': {
                        from: {
                            backgroundPosition: '-85px -28px',
                        },
                        to: {
                            backgroundPosition: '-1621px -28px',
                        },
                    },
                }}
            /> */}
        </>
    )
}
