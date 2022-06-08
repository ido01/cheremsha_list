import { Close as CloseIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'

interface ModalFormProps {
    children: React.ReactNode
    open: boolean
    disabledSubmit?: boolean
    loadingSubmit?: boolean
    title: string
    handleClose: () => void
    handleSubmit?: () => void
}

export const ModalForm: React.FC<ModalFormProps> = ({
    disabledSubmit,
    loadingSubmit,
    children,
    open,
    title,
    handleClose,
    handleSubmit,
}) => {
    return (
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose}>
            <DialogTitle>
                {title}

                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {children}

                <DialogActions sx={{ mt: 3 }}>
                    <Button onClick={handleClose}>Отмена</Button>

                    <LoadingButton
                        loading={loadingSubmit}
                        disabled={disabledSubmit}
                        variant="contained"
                        onClick={() => handleSubmit?.()}
                    >
                        Сохранить
                    </LoadingButton>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
