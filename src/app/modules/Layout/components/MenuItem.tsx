import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Box, Collapse, colors, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { ERole } from 'types'
import { TMenuItem } from 'types/TMenuItem'

interface MenuItemProps {
    item: TMenuItem
    isLage?: boolean
    onClick?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, isLage, onClick }) => {
    const { url } = useRouteMatch()
    const isActive =
        item.path === '/profile'
            ? url === '/'
                ? true
                : url.indexOf(item.path) !== -1
            : item.path
            ? url.indexOf(item.path) !== -1
            : false

    const [open, setOpen] = useState<boolean>(true)

    const profileRole = useSelector(selectProfileRole)

    const handleMenuClick = () => {
        if (item.submenus && item.submenus.length > 0) {
            setOpen(!open)
        }
        onClick?.()
    }

    return (
        <>
            {(!item.isAdmin || profileRole === ERole.ADMIN) && (
                <>
                    <Box
                        display={'flex'}
                        mt={1}
                        mx={1.75}
                        px={1.25}
                        height={'44px'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        sx={{
                            cursor: 'pointer',
                            color: isActive ? 'grey.900' : 'grey.700',
                            textDecoration: 'none',
                            bgcolor: isActive ? colors.blueGrey[100] : 'transparent',
                            borderRadius: 1,
                            '&:hover': {
                                color: 'grey.900',
                            },
                        }}
                        component={item.path ? Link : Box}
                        to={item.path || ''}
                        onClick={() => handleMenuClick()}
                    >
                        <Box display={'flex'} alignItems={'center'} pl={1}>
                            {item.icon}

                            {isLage && (
                                <Typography variant="body1" sx={{ ml: item.icon ? 2 : 5 }}>
                                    {item.title}
                                </Typography>
                            )}
                        </Box>

                        {item.submenus && item.submenus.length > 0 && (
                            <>{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}</>
                        )}
                    </Box>

                    {item.submenus && item.submenus.length > 0 && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {item.submenus?.map((item, index) => (
                                <MenuItem key={index} item={item} />
                            ))}
                        </Collapse>
                    )}
                </>
            )}
        </>
    )
}
