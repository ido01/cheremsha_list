import {
    AddCircle as AddCircleIcon,
    ContentCopy as ContentCopyIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { achieveUserActions } from 'app/modules/AchieveUser/slice'
import { UserAchieveList } from 'app/modules/AchieveUser/templates/UserAchieveList'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ERole, EStatus } from 'types'
import { IUser } from 'types/IUser'
import { convertGenderName, convertRoleName } from 'utils/convertUtils'
import { getNoun } from 'utils/getNoun'
import { checkAdminAccess, checkSudoAccess } from 'utils/roles'

import { usersActions } from '../slice'
import { selectForm, selectUrl } from '../slice/selectors'

interface UserModalContentProps {
    profileRole: ERole
    user: IUser
    handleClose?: () => void
}

export const UserModalContent: React.FC<UserModalContentProps> = ({ profileRole, user, handleClose }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openLink, setOpenLink] = useState<boolean>(false)

    const { status } = useSelector(selectForm)
    const copyUrl = useSelector(selectUrl)
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

    const handleClickUrl = async () => {
        try {
            await navigator.clipboard.writeText(copyUrl)
            toast.success('Ссылка успешно скопирована', {
                type: 'success',
            })
        } catch (e) {
            toast.success('Не получилось скопировать ссылку в буфер обмена', {
                type: 'error',
            })
        }
    }

    const handleActiveUser = () => {
        if (user) {
            dispatch(usersActions.activeUser(user.id))
        }
    }

    const handleRecoveryUser = () => {
        if (user) {
            dispatch(usersActions.recoveryUser(user.id))
            setOpenLink(true)
        }
    }

    const handleEditDocument = () => {
        if (user) {
            handleClose?.()
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

    const handleCloseLink = () => {
        setOpenLink(false)
    }

    const handleAddAchive = () => {
        dispatch(
            achieveUserActions.openEditModal({
                id: '',
                uid: user.id,
                aid: '',
                description: '',
            })
        )
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
                {user && <UserAchieveList id={user?.id} />}
                {checkAdminAccess(profileRole) && (
                    <Grid item xs={12}>
                        <Box mb={1}>
                            <Typography variant="caption" fontWeight={500}>
                                Санитарная книжка
                            </Typography>
                        </Box>

                        <Box>
                            {!user.doc_file && <Typography variant="body3">Не загружена</Typography>}
                            {!!user.doc_file && (
                                <Button
                                    component="a"
                                    target="_blank"
                                    href={user.doc_file.url}
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<DownloadIcon />}
                                >
                                    {user.doc_file.name}
                                </Button>
                            )}
                        </Box>
                    </Grid>
                )}
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
                    <LabelText label="Должность" text={user?.job || ''} />
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

            {checkAdminAccess(profileRole) && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '4px',
                        left: 0,
                        m: 1,
                        p: 1,
                        borderRadius: 8,
                        backdropFilter: 'blur(4px)',
                        bgcolor: '#FDFDFD30',
                        boxShadow: '0px 4px 4px #3332',
                    }}
                >
                    <Box display={'flex'} gap={1}>
                        {!user?.ban && (
                            <IconButton color="error" onClick={handleOpenDelete} sx={{ bgcolor: '#FDFDFD90' }}>
                                <DeleteIcon />
                            </IconButton>
                        )}

                        <IconButton color="info" onClick={handleEditDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                            <EditIcon />
                        </IconButton>

                        {checkSudoAccess(profileRole) && (
                            <IconButton color="success" onClick={handleAddAchive} sx={{ bgcolor: '#FDFDFD90' }}>
                                <AddCircleIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            )}

            {checkAdminAccess(profileRole) && (!user?.active || user?.ban) && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '4px',
                        right: 0,
                        m: 1,
                        p: 1,
                        borderRadius: 8,
                        backdropFilter: 'blur(4px)',
                        bgcolor: '#FDFDFD30',
                        border: '1px solid #F5F5F5',
                    }}
                >
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        color="success"
                        variant="outlined"
                        onClick={handleActiveUser}
                        sx={{ borderRadius: 8 }}
                    >
                        Активировать
                    </LoadingButton>
                </Box>
            )}

            {checkAdminAccess(profileRole) && user?.active && !user?.ban && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '4px',
                        right: 0,
                        m: 1,
                        p: 1,
                        borderRadius: 8,
                        backdropFilter: 'blur(4px)',
                        bgcolor: '#FDFDFD30',
                        border: '1px solid #F5F5F5',
                    }}
                >
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        color="info"
                        variant="outlined"
                        onClick={handleRecoveryUser}
                        sx={{ borderRadius: 8 }}
                    >
                        Сброс пароля
                    </LoadingButton>
                </Box>
            )}

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите заблокировать "${user?.name}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleBanUser} autoFocus color="error">
                        Заблокировать
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <Dialog open={openLink} onClose={handleCloseLink} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Ссылка для восстановление пароля</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Скопируйте и поделитесь ссылкой для восстановления пароля с беспамятным сотрудником
                        <FormControl sx={{ width: '90%' }} variant="filled">
                            <Input
                                value={copyUrl}
                                disabled
                                type="text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label={'копировать'} onClick={handleClickUrl}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseLink} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
