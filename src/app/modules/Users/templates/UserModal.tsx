import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    IconButton,
    Modal as ModalComponent,
    Typography,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERole, EStatus } from 'types'
import { convertGenderName, convertPlaceName, convertPositionName, convertRoleName } from 'utils/convertUtils'

import { usersActions } from '../slice'
import { selectForm, selectModal, selectUserById } from '../slice/selectors'

export const UserModal: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openPhoto, setOpenPhoto] = useState<boolean>(false)

    const { status } = useSelector(selectForm)
    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getUser = useSelector(selectUserById)
    const user = getUser(activeId)

    const handleClose = () => {
        dispatch(usersActions.hideModal())
    }

    const handleActiveUser = () => {
        if (user) {
            dispatch(usersActions.activeUser(user.id))
        }
    }

    const handleEditDocument = () => {
        if (user) {
            dispatch(usersActions.setForm(user))
            history.push(`/users/${user.id}`)
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleBanUser = () => {
        if (user) {
            dispatch(usersActions.banUser(user.id))
        }
        setOpenDelete(false)
    }

    const handleOpenAvatar = () => {
        setOpenPhoto(true)
    }

    // const handleSetComplete = () => {
    //     if (document) {
    //         dispatch(
    //             usersActions.setComplete({
    //                 did: document.id,
    //                 id: document.state.id,
    //             })
    //         )
    //     }
    // }

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

                        <Typography variant="h5" sx={{ ml: 1 }}>
                            {`${user?.last_name} ${user?.name}`}
                        </Typography>
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
                                    label="Статус"
                                    node={
                                        <Typography
                                            variant="body1"
                                            sx={(theme) => ({
                                                color: user?.blocked
                                                    ? theme.palette.error.main
                                                    : !user?.active
                                                    ? theme.palette.success.main
                                                    : theme.palette.warning.main,
                                            })}
                                        >
                                            {user?.blocked ? 'Заблокирован' : !user?.active ? 'Новый' : 'Действующий'}
                                        </Typography>
                                    }
                                />
                            </Grid>

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
                                        <LabelText
                                            label="Должность"
                                            text={convertPositionName(user?.position || 'seller')}
                                        />
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
                                        <LabelText
                                            label="Место работы"
                                            text={convertPlaceName(user?.place_id || '1')}
                                        />
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
                        {!user?.active && (
                            <LoadingButton
                                loading={status === EStatus.PENDING}
                                sx={{ mt: 4 }}
                                fullWidth
                                color="success"
                                variant="contained"
                                onClick={handleActiveUser}
                            >
                                Разрешить использовать платформу
                            </LoadingButton>
                        )}
                    </Container>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        py: 2,
                        bgcolor: 'white',
                        zIndex: 1,
                    }}
                >
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box display={'flex'}>
                            {profileRole === ERole.ADMIN && (
                                <>
                                    <IconButton color="error" onClick={handleOpenDelete}>
                                        <DeleteIcon />
                                    </IconButton>

                                    <IconButton color="info" onClick={handleEditDocument}>
                                        <EditIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>

                        {/* {document?.state.state !== EState.COMPLETED && (
                            <LoadingButton color="success" variant="contained" onClick={handleSetComplete}>
                                Подтверждаю, что изучил
                            </LoadingButton>
                        )} */}
                    </Container>
                </Box>
            </Modal>

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    {`Вы уверены, что хотите заблокировать "${user?.name}"?`}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleBanUser} autoFocus color="error">
                        Заблокировать
                    </LoadingButton>
                </DialogActions>
            </Dialog>

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
