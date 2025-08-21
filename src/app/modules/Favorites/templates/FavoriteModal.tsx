import { StarBorder as StarBorderIcon, StarRate as StarRateIcon } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Modal as ModalComponent, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { usersActions } from 'app/modules/Users/slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole } from 'types'
import { convertGenderName, convertRoleName } from 'utils/convertUtils'

import { favoritesActions } from '../slice'
import { selectFavoriteById, selectModal } from '../slice/selectors'

export const FavoriteModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openPhoto, setOpenPhoto] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const user = useSelector(selectFavoriteById)(activeId)
    const getLocation = useSelector(selectLocation)

    const handleClose = () => {
        dispatch(favoritesActions.hideModal())
    }

    const handleOpenAvatar = () => {
        setOpenPhoto(true)
    }

    const handleAddFavorite = () => {
        if (user) {
            dispatch(usersActions.addFavorite(user.id))
        }
    }

    const handleDeleteFavorite = () => {
        if (user) {
            dispatch(usersActions.deleteFavorite(user.id))
        }
    }

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Box display={'flex'} alignItems={'center'}>
                        <AvatarImage
                            name={`${user?.last_name} ${user?.name}`}
                            image={user?.avatar?.url}
                            size={'42px'}
                            onClick={handleOpenAvatar}
                        />

                        <Typography variant="h5" sx={{ mx: 1 }}>
                            {`${user?.last_name} ${user?.name}`}
                        </Typography>

                        {profileRole === ERole.ADMIN && (
                            <>
                                {!!user?.favorite && (
                                    <IconButton onClick={handleDeleteFavorite}>
                                        <StarRateIcon color="warning" />
                                    </IconButton>
                                )}

                                {!user?.favorite && (
                                    <IconButton onClick={handleAddFavorite}>
                                        <StarBorderIcon />
                                    </IconButton>
                                )}
                            </>
                        )}

                        {profileRole !== ERole.ADMIN && (
                            <>
                                {!!user?.favorite && <StarRateIcon color="warning" />}

                                {!user?.favorite && <StarBorderIcon />}
                            </>
                        )}
                    </Box>
                }
                handleClose={handleClose}
            >
                <Box
                    mt={1}
                    pb={3}
                    sx={(theme) => ({
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        borderBottom: 1,
                        maxHeight: 'calc( 100% - 117px )',
                        borderColor: theme.palette.grey[300],
                    })}
                >
                    <Container>
                        <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                            <Grid item xs={6}>
                                <LabelText
                                    label="Email"
                                    node={
                                        user?.email ? (
                                            <Typography variant="body1">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>
                                            </Typography>
                                        ) : (
                                            ''
                                        )
                                    }
                                />
                            </Grid>

                            {!!user?.active && (
                                <>
                                    <Grid item xs={6}>
                                        <LabelText
                                            label="Телефон"
                                            node={
                                                user?.phone ? (
                                                    <Typography variant="body1">
                                                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                                                    </Typography>
                                                ) : (
                                                    ''
                                                )
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Пол" text={convertGenderName(user?.gender || 'male')} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Должность" text={user?.job || ''} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText
                                            label="Права доступа"
                                            text={convertRoleName(user?.role || ERole.GUEST)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="День рождения" text={user?.birthday || ''} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Место работы" text={getLocation(user?.place_id)} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Адрес проживания" text={user?.address || ''} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Место учебы" text={user?.university || ''} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LabelText label="Хобби" text={user?.hobby || ''} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <LabelText label="О себе" text={user?.about || ''} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Container>
                </Box>
            </Modal>

            <ModalComponent
                open={openPhoto}
                onClose={() => setOpenPhoto(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box component={'img'} src={user?.avatar?.url} sx={{ maxWidth: '90%', maxHeight: '90%' }} />
            </ModalComponent>
        </>
    )
}
