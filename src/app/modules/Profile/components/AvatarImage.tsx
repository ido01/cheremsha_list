import * as Icons from '@mui/icons-material'
import { Avatar, Box, Skeleton } from '@mui/material'
import React, { ReactNode } from 'react'
import { IAchieve } from 'types/IAchieve'

function stringToColor(string: string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.substr(-2)
    }
    return color
}

function stringAvatar(name: string, size: number) {
    return {
        sx: {
            width: size || 64,
            height: size || 64,
            bgcolor: stringToColor(name),
        },
        children: `${name.trim().split(' ')[0][0]}${name.trim().split(' ')[1]?.[0] || ''}`,
    }
}

interface AvatarImageProps {
    name?: string
    image?: string
    size?: number
    achieve?: IAchieve
    onClick?: () => void
}

interface AchieveBoxProps {
    achieve?: IAchieve
    size: number
    children: ReactNode
}

const AchieveBox: React.FC<AchieveBoxProps> = ({ achieve, size, children }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Icon = Icons[achieve?.icon]
    if (!achieve) {
        return <>{children}</>
    }
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                backgroundColor: achieve.color,
                p: '2px',
                borderRadius: '100%',
                position: 'relative',
            }}
        >
            {children}
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    borderRadius: 8,
                    backgroundColor: achieve.color,
                    color: '#fff',
                    p: achieve.image ? 0 : 0.25,
                    overflow: 'hidden',
                    left: `${size * 0.65}px`,
                    bottom: 0,
                }}
            >
                {achieve.image && (
                    <img
                        src={achieve.image.thumb}
                        style={{ width: `${size / 2 + 1}px`, height: `${size / 2 + 1}px` }}
                    />
                )}
                {!achieve.image && Icon && <Icon sx={{ width: `${size / 2}px`, height: `${size / 2}px` }} />}
            </Box>
        </Box>
    )
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ achieve, image, name, size, onClick }) => {
    let newSize = size || 64
    if (achieve) {
        newSize -= 4
    }
    if (image) {
        return (
            <AchieveBox achieve={achieve} size={newSize}>
                <Avatar
                    alt={name}
                    src={image}
                    onClick={onClick}
                    sx={{
                        width: newSize,
                        height: newSize,
                    }}
                />
            </AchieveBox>
        )
    }

    if (name) {
        return (
            <AchieveBox achieve={achieve} size={newSize}>
                <Avatar {...stringAvatar(name || '', newSize)} onClick={onClick} />
            </AchieveBox>
        )
    }

    return (
        <AchieveBox achieve={achieve} size={newSize}>
            <Skeleton variant="circular" width={newSize} height={newSize} />
        </AchieveBox>
    )
}
