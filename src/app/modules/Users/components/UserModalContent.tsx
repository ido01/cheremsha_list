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
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { selectLocation } from 'app/modules/Locations/selectors'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERole, EStatus } from 'types'
import { IUser } from 'types/IUser'
import { convertGenderName, convertPositionName, convertRoleName } from 'utils/convertUtils'
import { getNoun } from 'utils/getNoun'

import { usersActions } from '../slice'
import { selectForm } from '../slice/selectors'

interface UserModalContentProps {
    profileRole: ERole
    user: IUser
}

export const UserModalContent: React.FC<UserModalContentProps> = ({ profileRole, user }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const { status } = useSelector(selectForm)
    const getLocation = useSelector(selectLocation)

    const workday = useMemo(() => {
        if (!user) return ''
        const now = dayjs()
        const dayInMonth = now.subtract(1, 'month').daysInMonth()

        let day = now.date() - user.workday
        let month = day < 0 ? now.month() - user.workmonth : now.month() + 1 - user.workmonth
        const year = month < 0 ? now.year() - user.workyear - 1 : now.year() - user.workyear
        if (day < 0) day = dayInMonth + day
        if (month < 0) month = 12 + month

        return `${year ? `${year} ${getNoun(year, 'год', 'года', 'лет')}` : ''} ${
            month ? `${month} ${getNoun(month, 'месяц', 'месяца', 'месяцев')}` : ''
        } ${day ? `${day} ${getNoun(day, 'день', 'дня', 'дней')}` : ''}`
    }, [user])

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

    return (
        <>
            <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                {!user?.ban && user?.first_date && (
                    <Grid item xs={12}>
                        <LabelText
                            label="Работает в чернике"
                            node={<Typography variant="body1">{workday}</Typography>}
                        />
                    </Grid>
                )}

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText
                        label="Статус"
                        node={
                            <Typography
                                variant="body1"
                                sx={(theme) => ({
                                    color: user?.ban
                                        ? theme.palette.error.main
                                        : !user?.active
                                        ? theme.palette.success.main
                                        : theme.palette.warning.main,
                                })}
                            >
                                {user?.ban ? 'Заблокирован' : !user?.active ? 'Новый' : 'Действующий'}
                            </Typography>
                        }
                    />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
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

                <Grid item xs={isMobile ? 12 : 6}>
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

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Пол" text={convertGenderName(user?.gender || 'male')} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Должность" text={convertPositionName(user?.position || 'seller')} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Права доступа" text={convertRoleName(user?.role || ERole.GUEST)} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="День рождения" text={user?.birthday || ''} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Место работы" text={getLocation(user?.place_id)} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Адрес проживания" text={user?.address || ''} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Место учебы" text={user?.university || ''} />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                    <LabelText label="Хобби" text={user?.hobby || ''} />
                </Grid>

                <Grid item xs={12}>
                    <LabelText label="О себе" text={user?.about || ''} />
                </Grid>
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

            {profileRole === ERole.ADMIN && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        left: 0,
                        py: 2,
                        bgcolor: 'white',
                        zIndex: 1,
                    }}
                >
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box display={'flex'}>
                            <IconButton color="error" onClick={handleOpenDelete}>
                                <DeleteIcon />
                            </IconButton>

                            <IconButton color="info" onClick={handleEditDocument}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Box>
            )}

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
        </>
    )
}
