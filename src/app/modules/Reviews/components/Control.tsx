import {
    AddCircleOutline as AddCircleOutlineIcon,
    Block as BlockIcon,
    Delete as DeleteIcon,
    HighlightOff as HighlightOffIcon,
    TaskAlt as TaskAltIcon,
    WorkOutline as WorkOutlineIcon,
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

export const Control: React.FC<ControlProps> = ({ review }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState(false)

    const { status: deleteStatus } = useSelector(selectDelete)

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleReject = () => {
        dispatch(
            reviewsActions.statusReview({
                ...review,
                status: EState.REJECTED,
            })
        )
    }

    const handleOpen = () => {
        dispatch(
            reviewsActions.statusReview({
                ...review,
                status: EState.OPEN,
            })
        )
    }

    const handleClose = () => {
        dispatch(
            reviewsActions.statusReview({
                ...review,
                status: EState.CLOSED,
            })
        )
    }

    const handlePending = () => {
        dispatch(
            reviewsActions.statusReview({
                ...review,
                status: EState.PENDING,
            })
        )
    }

    const handleComplete = () => {
        dispatch(
            reviewsActions.statusReview({
                ...review,
                status: EState.COMPLETED,
            })
        )
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleDeleteRequest = () => {
        dispatch(reviewsActions.deleteReview(review.id))
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
            {(review.status === EState.INITIAL ||
                review.status === EState.COMPLETED ||
                review.status === EState.CLOSED) && (
                <>
                    <IconButton color="info" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleOpen}>
                        <AddCircleOutlineIcon />
                    </IconButton>

                    <IconButton color="error" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleReject}>
                        <BlockIcon />
                    </IconButton>
                </>
            )}

            {review.status === EState.OPEN && (
                <>
                    <IconButton color="success" sx={{ bgcolor: '#FDFDFD90' }} onClick={handlePending}>
                        <WorkOutlineIcon />
                    </IconButton>
                </>
            )}

            {review.status === EState.PENDING && (
                <>
                    <IconButton color="success" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleComplete}>
                        <TaskAltIcon />
                    </IconButton>
                </>
            )}

            {review.status !== EState.INITIAL &&
                review.status !== EState.REJECTED &&
                review.status !== EState.COMPLETED &&
                review.status !== EState.CLOSED && (
                    <>
                        <IconButton color="error" sx={{ bgcolor: '#FDFDFD90' }} onClick={handleClose}>
                            <HighlightOffIcon />
                        </IconButton>
                    </>
                )}

            {(review.status === EState.REJECTED || review.status === EState.CLOSED) && (
                <>
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
