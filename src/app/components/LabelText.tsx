import { Typography } from '@mui/material'
import React from 'react'

interface LabelTextProps {
    label: string
    text?: string
    node?: React.ReactNode
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'button'
        | 'overline'
        | 'inherit'
        | 'body3'
        | undefined
}

export const LabelText: React.FC<LabelTextProps> = ({ label, text, node, variant }) => (
    <>
        <Typography variant="body3" color="grey.600" sx={{ fontSize: '0.9rem' }}>
            {label}
        </Typography>
        {!!text && (
            <Typography variant={variant ? variant : 'body1'} color="grey.900">
                {text}
            </Typography>
        )}
        {!!node && node}
    </>
)
