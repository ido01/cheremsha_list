import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

import { DesktopFilterBlock } from './components/DesktopFilterBlock'
import { MobileFilterBlock } from './components/MobileFilterBlock'

interface FilterBlockProps {
    open: boolean
    onClose: () => void
}

export const FilterBlock: React.FC<FilterBlockProps> = ({ open, onClose }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <>
            {!isMobile && <DesktopFilterBlock />}

            {isMobile && <MobileFilterBlock open={open} onClose={onClose} />}
        </>
    )
}
