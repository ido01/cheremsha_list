import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Auth } from 'app/modules/Auth/templates/Auth'
import { FavoriteModal } from 'app/modules/Favorites/templates/FavoriteModal'
import React from 'react'

import { LeftMenu } from '../components/LeftMenu'
import { MobileNavigation } from '../components/MobileNavigation'

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Auth>
            <Box display="flex" height={'100%'}>
                {!isMobile && <LeftMenu />}

                {!isMobile && (
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        flex={'1 1 auto'}
                        maxHeight={!isMobile ? '100vh' : 'auto'}
                        overflow={'auto'}
                        bgcolor={isMobile ? 'grey.200' : 'white'}
                    >
                        <Box display="flex" flexDirection="column" minHeight="100vh">
                            {children}
                        </Box>
                    </Box>
                )}

                {isMobile && (
                    <Box
                        width={'100%'}
                        minHeight={'calc( 100vh - 56px )'}
                        overflow={'auto'}
                        py={10}
                        bgcolor={isMobile ? 'grey.200' : 'white'}
                    >
                        {children}
                    </Box>
                )}

                <FavoriteModal />

                {isMobile && <MobileNavigation />}
            </Box>
        </Auth>
    )
}
