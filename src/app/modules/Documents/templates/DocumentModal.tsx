import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EState } from 'types'

import { documentsActions } from '../slice'
import { selectDocumentById, selectModal } from '../slice/selectors'

export const DocumentModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getDocument = useSelector(selectDocumentById)
    const document = getDocument(activeId)

    const handleClose = () => {
        dispatch(documentsActions.hideModal())
    }

    const handleEditDocument = () => {
        if (document) {
            dispatch(documentsActions.openEditModal(document))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteDocument = () => {
        if (document) {
            dispatch(documentsActions.deleteDocument(document.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    const handleSetComplete = () => {
        if (document) {
            dispatch(
                documentsActions.setComplete({
                    did: document.id,
                    id: document.state.id,
                })
            )
        }
    }

    return (
        <>
            <Modal open={isOpen} title={document?.name || ''} handleClose={handleClose}>
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
                        {document?.info.map((info, index) => (
                            <Box key={index}>
                                {info.type === 'title' && (
                                    <Typography sx={{ mt: 3, mb: 1 }} variant="h5" fontWeight={500}>
                                        {info.text}
                                    </Typography>
                                )}

                                {info.type === 'text' && (
                                    <Typography sx={{ mt: 1 }} variant="body1">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: info.text,
                                            }}
                                        />
                                    </Typography>
                                )}

                                {info.type === 'image' && (
                                    <Box mt={1.5} mb={0.5} component={'img'} src={info.image?.url} maxWidth="100%" />
                                )}
                            </Box>
                        ))}
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

                        {document?.state.state !== EState.COMPLETED && (
                            <LoadingButton color="success" variant="contained" onClick={handleSetComplete}>
                                Подтверждаю, что изучил
                            </LoadingButton>
                        )}
                    </Container>
                </Box>
            </Modal>

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить документ "${document?.name}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteDocument} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
