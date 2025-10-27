import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EState, EStatus } from 'types'
import { IReview } from 'types/IReview'

import { reviewsActions } from '../slice'
import { selectDelete } from '../slice/selectors'

interface ControlProps {
    review: IReview
}

export const MyControl: React.FC<ControlProps> = ({ review }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState(false)

    const { status: deleteStatus } = useSelector(selectDelete)

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleEdit = () => {
        dispatch(reviewsActions.openEditModal(review))
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleDeleteRequest = () => {
        dispatch(reviewsActions.mydeleteReview(review.id))
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                width: isMobile ? '54px' : '86px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                top: 0,
                left: '10px',
            }}
        >
            {review.status === EState.INITIAL && (
                <>
                    <IconButton color="info" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>

                    <IconButton color="error" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleOpenDelete}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )}

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить такое обращение "${review.title}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton
                        loading={deleteStatus === EStatus.PENDING}
                        onClick={handleDeleteRequest}
                        autoFocus
                        color="error"
                    >
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
