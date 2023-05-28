import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
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
                <DialogTitle id="alert-dialog-title">
                    Заявка на регистрацию отправлена, ждите подтверждения на email
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
