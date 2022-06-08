import { Avatar, Skeleton } from '@mui/material'
import React from 'react'

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

function stringAvatar(name: string, size?: string) {
    return {
        sx: {
            width: size || 64,
            height: size || 64,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`,
    }
}

interface AvatarImageProps {
    name?: string
    image?: string
    size?: string
    onClick?: () => void
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ image, name, size, onClick }) => {
    if (image) {
        return (
            <Avatar
                alt={name}
                src={image}
                onClick={onClick}
                sx={{
                    width: size || 64,
                    height: size || 64,
                }}
            />
        )
    }

    if (name) {
        return <Avatar {...stringAvatar(name || '', size)} onClick={onClick} />
    }

    return <Skeleton variant="circular" width={size || 64} height={size || 64} />
}
