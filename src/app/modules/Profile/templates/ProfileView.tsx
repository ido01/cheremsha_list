import { Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { TitleBlock } from 'app/components/TitleBlock'
import { authActions } from 'app/modules/Auth/slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AccountData } from '../components/AccountData'
import { AccountDataForm } from '../components/AccountDataForm'
import { AvatarForm } from '../components/AvatarForm'

export const ProfileView: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)
    const [hasAccountDataEdit, setHasAccountDataEdit] = useState<boolean>(false)

    const handleClickAccountDataEdit = () => {
        setHasAccountDataEdit(true)
    }

    const handleFinishAccountDataEdit = () => {
        setHasAccountDataEdit(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const logout = () => {
        setOpen(false)
        dispatch(authActions.logout())
    }

    return (
        <>
            <TitleBlock
                title={'Профиль'}
                searchDisabled
                endNode={
                    <Button
                        variant="text"
                        startIcon={<LogoutIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ textTransform: 'uppercase' }}
                    >
                        {'Выйти'}
                    </Button>
                }
            />

            <Box p={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <AvatarForm />

                    {!hasAccountDataEdit && (
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickAccountDataEdit}>
                            Редактировать
                        </Button>
                    )}
                </Box>

                <Box sx={{ mt: 5 }}>
                    {!hasAccountDataEdit && <AccountData />}

                    {hasAccountDataEdit && <AccountDataForm onEditFinish={handleFinishAccountDataEdit} />}
                </Box>

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                    <DialogContent>
                        <DialogContentText>Вы уверены, что хотите выйти?</DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={logout} color="error">
                            Выйти
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}
