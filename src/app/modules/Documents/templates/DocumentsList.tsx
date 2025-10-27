import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { CategoryMainAdminSettings } from 'app/modules/Categories/components/CategoryMainAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategories } from 'app/modules/Categories/slice/selectors'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkAdminAccess } from 'utils/roles'

export const DocumentsList: React.FC = () => {
    const dispatch = useDispatch()

    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [open, setOpen] = useState<boolean>(false)
    const profileRole = useSelector(selectProfileRole)
    const getCategories = useSelector(selectCategories)

    const categories = getCategories('0')

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(categoriesActions.loadCategories('0'))
    }, [])

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <Main
            title={'Документы'}
            searchDisabled
            endNode={
                checkAdminAccess(profileRole) ? (
                    <IconButton
                        sx={{ ml: 2 }}
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleSettingOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
        >
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Grid container spacing={2}>
                    {categories.map((category, index) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const Icon = Icons[category.icon]
                        return (
                            <Grid item key={index} xs={isMobile ? 6 : 3}>
                                <Tile
                                    data={{
                                        title: category.name,
                                        icon: Icon ? <Icon fontSize="large" /> : <></>,
                                        path: `/doc/${category.id}`,
                                    }}
                                    onClick={handleClickRow}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            {checkAdminAccess(profileRole) && <CategoryMainAdminSettings open={open} handleClose={handleClose} />}
        </Main>
    )
}
