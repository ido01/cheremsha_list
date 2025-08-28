import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, Container, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { TitleBlock } from 'app/components/TitleBlock'
import { CategoryMainAdminSettings } from 'app/modules/Categories/components/CategoryMainAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategories } from 'app/modules/Categories/slice/selectors'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERole } from 'types'

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
        <>
            <TitleBlock
                title={'Документы'}
                searchDisabled
                endNode={
                    profileRole === ERole.ADMIN ? (
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
            />

            <Box
                flex="1 0 100%"
                sx={{
                    pt: 2,
                    pb: 1,
                    bgcolor: isMobile ? 'grey.200' : 'grey.50',
                    overflow: 'auto',
                    maxHeight: { md: 'calc( 100vh - 90px )' },
                }}
            >
                <Container>
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
                </Container>
            </Box>

            {profileRole === ERole.ADMIN && <CategoryMainAdminSettings open={open} handleClose={handleClose} />}
        </>
    )
}
