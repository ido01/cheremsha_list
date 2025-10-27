import { Box } from '@mui/material'
import React from 'react'

import { EscapeItem, EscapeMap } from '../../utils'

interface WallProps {
    i: number
    j: number
    lab: EscapeMap
    size: number
    k: number
    squareSizeThree: number
    squareSize: number
    point: EscapeItem
}

export const Wall: React.FC<WallProps> = ({ point, squareSize, squareSizeThree, k, size, lab, i, j }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: `${i * squareSize}px`,
                left: `${j * squareSize}px`,
                width: `${squareSize}px`,
                height: `${squareSize}px`,
            }}
        >
            {point.visible && (
                <>
                    {point.top && i === 0 && (
                        <>
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    top: `-${squareSizeThree}px`,
                                    left: `${squareSizeThree}px`,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `-${9 * k}px 0px`,
                                }}
                            />

                            {point.left ? (
                                <Box
                                    sx={{
                                        width: `${squareSizeThree}px`,
                                        height: `${squareSizeThree}px`,
                                        top: `-${squareSizeThree}px`,
                                        left: 0,
                                        position: 'absolute',
                                        backgroundImage: 'url(/assets/escape/sprite1.png)',
                                        backgroundSize: `${143 * k}px ${89 * k}px`,
                                        backgroundPosition: `-${0}px -${36 * k}px`,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: `${squareSizeThree}px`,
                                        height: `${squareSizeThree}px`,
                                        top: `-${squareSizeThree}px`,
                                        left: 0,
                                        position: 'absolute',
                                        backgroundImage: 'url(/assets/escape/sprite1.png)',
                                        backgroundSize: `${143 * k}px ${89 * k}px`,
                                        backgroundPosition: `-${9 * k}px 0px`,
                                    }}
                                />
                            )}

                            {point.right ? (
                                <Box
                                    sx={{
                                        width: `${squareSizeThree}px`,
                                        height: `${squareSizeThree}px`,
                                        top: `-${squareSizeThree}px`,
                                        right: 0,
                                        position: 'absolute',
                                        backgroundImage: 'url(/assets/escape/sprite1.png)',
                                        backgroundSize: `${143 * k}px ${89 * k}px`,
                                        backgroundPosition: `-${9 * k}px -${36 * k}px`,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: `${squareSizeThree}px`,
                                        height: `${squareSizeThree}px`,
                                        top: `-${squareSizeThree}px`,
                                        right: 0,
                                        position: 'absolute',
                                        backgroundImage: 'url(/assets/escape/sprite1.png)',
                                        backgroundSize: `${143 * k}px ${89 * k}px`,
                                        backgroundPosition: `-${9 * k}px 0px`,
                                    }}
                                />
                            )}
                        </>
                    )}

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${9 * k}px -${9 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: 0,
                            left: `${squareSizeThree}px`,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${36 * k}px -${36 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: 0,
                            right: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${9 * k}px -${9 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: `${squareSizeThree}px`,
                            left: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${36 * k}px -${36 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: `${squareSizeThree}px`,
                            left: `${squareSizeThree}px`,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${36 * k}px -${36 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            top: `${squareSizeThree}px`,
                            right: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${36 * k}px -${36 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            bottom: 0,
                            left: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${9 * k}px -${9 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            bottom: 0,
                            left: `${squareSizeThree}px`,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${36 * k}px -${36 * k}px`,
                        }}
                    />

                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${9 * k}px -${9 * k}px`,
                        }}
                    />
                    {!point.left &&
                        !point.botton &&
                        i < size - 1 &&
                        lab[i + 1]?.[j].left &&
                        j > 0 &&
                        lab[i][j - 1].botton && (
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    bottom: 0,
                                    left: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `-${27 * k}px -${27 * k}px`,
                                }}
                            />
                        )}
                    {point.left && (
                        <>
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    top: `${squareSizeThree}px`,
                                    left: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `0px -${9 * k}px`,
                                }}
                            />
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    top: 0,
                                    left: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `0px -${9 * k}px`,
                                }}
                            />

                            {!point.botton && (
                                <>
                                    {i < size - 1 && lab[i + 1]?.[j].left ? (
                                        <Box
                                            sx={{
                                                width: `${squareSizeThree}px`,
                                                height: `${squareSizeThree}px`,
                                                bottom: 0,
                                                left: 0,
                                                position: 'absolute',
                                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                                backgroundPosition: `0px -${9 * k}px`,
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: `${squareSizeThree}px`,
                                                height: `${squareSizeThree}px`,
                                                bottom: 0,
                                                left: 0,
                                                position: 'absolute',
                                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                                backgroundPosition: `-${9 * k}px -${27 * k}px`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {!point.right &&
                        !point.botton &&
                        i < size - 1 &&
                        lab[i + 1]?.[j].right &&
                        j < size - 1 &&
                        lab[i][j + 1]?.botton && (
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `-${18 * k}px -${27 * k}px`,
                                }}
                            />
                        )}
                    {point.right && (
                        <>
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    top: 0,
                                    right: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `-${27 * k}px -${9 * k}px`,
                                }}
                            />
                            <Box
                                sx={{
                                    width: `${squareSizeThree}px`,
                                    height: `${squareSizeThree}px`,
                                    top: `${squareSizeThree}px`,
                                    right: 0,
                                    position: 'absolute',
                                    backgroundImage: 'url(/assets/escape/sprite1.png)',
                                    backgroundSize: `${143 * k}px ${89 * k}px`,
                                    backgroundPosition: `-${27 * k}px -${9 * k}px`,
                                }}
                            />

                            {!point.botton && (
                                <>
                                    {i < size - 1 && lab[i + 1]?.[j].right ? (
                                        <Box
                                            sx={{
                                                width: `${squareSizeThree}px`,
                                                height: `${squareSizeThree}px`,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                                backgroundPosition: `-${27 * k}px -${9 * k}px`,
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: `${squareSizeThree}px`,
                                                height: `${squareSizeThree}px`,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                                backgroundPosition: `-${0}px -${27 * k}px`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            {point.botton && (point.visible || (i < size - 1 && lab[i + 1]?.[j].visible)) && (
                <>
                    <Box
                        sx={{
                            width: `${squareSizeThree}px`,
                            height: `${squareSizeThree}px`,
                            bottom: 0,
                            left: `${squareSizeThree}px`,
                            position: 'absolute',
                            backgroundImage: 'url(/assets/escape/sprite1.png)',
                            backgroundSize: `${143 * k}px ${89 * k}px`,
                            backgroundPosition: `-${9 * k}px 0px`,
                        }}
                    />

                    {i < size - 1 && lab[i + 1]?.[j].left ? (
                        <Box
                            sx={{
                                width: `${squareSizeThree}px`,
                                height: `${squareSizeThree}px`,
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                backgroundPosition: `-${0}px -${36 * k}px`,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: `${squareSizeThree}px`,
                                height: `${squareSizeThree}px`,
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                backgroundPosition: `-${9 * k}px 0px`,
                            }}
                        />
                    )}

                    {i < size - 1 && lab[i + 1]?.[j].right ? (
                        <Box
                            sx={{
                                width: `${squareSizeThree}px`,
                                height: `${squareSizeThree}px`,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                backgroundPosition: `-${9 * k}px -${36 * k}px`,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: `${squareSizeThree}px`,
                                height: `${squareSizeThree}px`,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                backgroundImage: 'url(/assets/escape/sprite1.png)',
                                backgroundSize: `${143 * k}px ${89 * k}px`,
                                backgroundPosition: `-${9 * k}px 0px`,
                            }}
                        />
                    )}
                </>
            )}
        </Box>
    )
}
