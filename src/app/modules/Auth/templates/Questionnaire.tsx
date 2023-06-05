import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { AccountDataForm } from 'app/modules/Profile/components/AccountDataForm'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const Questionnaire: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)

    const profile = useSelector(selectProfile)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
                {!profile.name ? 'Заполните анкету, что бы она отправилась на рассмотрение' : 'Заявка на рассмотрении'}
            </Typography>

            <AccountDataForm onEditFinish={() => setOpen(true)} />

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Вы прекрасны!</DialogTitle>

                <DialogContent>
                    <DialogContentText>Ваша заявка на допуск к платформе отправлена администратору!</DialogContentText>
                    <DialogContentText>После получения доступа вы получите email сообщение</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
