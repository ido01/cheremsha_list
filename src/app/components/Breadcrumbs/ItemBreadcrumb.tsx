import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface ItemBreadcrumbProps {
    text: string
    link?: string
}

export const ItemBreadcrumb: React.FC<ItemBreadcrumbProps> = ({ text, link }) => (
    <>
        {!link ? (
            <Typography color="grey.400" variant="body3">
                {text}
            </Typography>
        ) : (
            <Typography
                variant="body3"
                color="grey.600"
                component={Link}
                to={link}
                sx={(theme) => ({ '&:hover': { color: theme.palette.primary.main } })}
            >
                {text}
            </Typography>
        )}
    </>
)
