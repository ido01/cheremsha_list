import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'

import { ItemBreadcrumb } from './ItemBreadcrumb'

interface PageBreadcrumbsProps {
    items: BreadcrumbItem[]
}

export interface BreadcrumbItem {
    text: string
    link?: string
}

export const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({ items }) => {
    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            separator={
                <Typography variant="body3" color="grey.400" sx={{ mt: 0.5 }}>
                    •
                </Typography>
            }
        >
            {items.map((item, index) => (
                <ItemBreadcrumb key={index} text={item.text} link={item.link} />
            ))}
        </Breadcrumbs>
    )
}
