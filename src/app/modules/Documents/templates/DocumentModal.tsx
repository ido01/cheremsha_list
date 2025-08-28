import { ContentCut as ContentCutIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
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
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile, selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EState, EStatus } from 'types'
import { IDocumentPoint } from 'types/IDocumentPoint'
import { IDocumentTaskUser } from 'types/IDocumentTaskUser'

import { DocumentBigStatusRow } from '../components/DocumentBigStatusRow'
import { documentsActions } from '../slice'
import { selectDocumentById, selectModal } from '../slice/selectors'

export const DocumentModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openDeletePoint, setOpenDeletePoint] = useState<string>('0')
    const [deletePointName, setDeletePointName] = useState<string>('')
    const [openDeleteUser, setOpenDeleteUser] = useState<string>('0')
    const [deleteUserName, setDeleteUserName] = useState<string>('')
    const [loadingTasks, setLoadingTasks] = useState<string[]>([])

    const profile = useSelector(selectProfile)
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

    const handleCutDocument = () => {
        if (document) {
            dispatch(documentsActions.cutDocument(document.id))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleOpenDeletePoint = (point: IDocumentPoint) => {
        setOpenDeletePoint(point.id)
        setDeletePointName(point.name)
    }

    const handleOpenDeleteUser = (user: IDocumentTaskUser) => {
        setOpenDeleteUser(user.id)
        setDeleteUserName(user.name || '')
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleCloseDeletePoint = () => {
        setOpenDeletePoint('0')
    }

    const handleCloseDeleteUser = () => {
        setOpenDeleteUser('0')
    }

    const handleDeleteDocument = () => {
        if (document) {
            dispatch(documentsActions.deleteDocument(document.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    const handleDeleteTaskUser = () => {
        dispatch(documentsActions.deleteTaskUser(openDeleteUser))
        setOpenDeleteUser('0')
    }

    const handleDeleteTaskPoint = () => {
        dispatch(documentsActions.deleteTaskPoint(openDeletePoint))
        setOpenDeletePoint('0')
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

    const handleGetUserTask = (taskUser: IDocumentTaskUser) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${taskUser.id}u${taskUser.status}`])
            dispatch(documentsActions.getUserTask(document.id))
        }
    }

    const handleGetPoint = (point: IDocumentPoint) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${point.id}p${point.status}`])
            dispatch(documentsActions.getPoint(document.id))
        }
    }

    const handleCompleteUserTask = (taskUser: IDocumentTaskUser) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${taskUser.id}u${taskUser.status}`])
            dispatch(documentsActions.completeUserTask(document.id))
        }
    }

    const handleCompletePoint = (point: IDocumentPoint) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${point.id}p${point.status}`])
            dispatch(documentsActions.completePoint(document.id))
        }
    }

    const handleRejectUserTask = (taskUser: IDocumentTaskUser) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${taskUser.id}u${taskUser.status}`])
            dispatch(documentsActions.rejectUserTask(taskUser.id))
        }
    }

    const handleRejectPoint = (point: IDocumentPoint) => {
        if (document) {
            setLoadingTasks((value) => [...value, `${point.id}p${point.status}`])
            dispatch(documentsActions.rejectPoint(point.id))
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
                        {document?.end_date && (
                            <Box mb={4}>
                                <LabelText label="Дата окончания акции" text={document.end_date} variant="body2" />
                            </Box>
                        )}
                        {/* {document?.path === 'task' && (
                            <Box mb={4} sx={{ display: 'flex', gap: 4 }}>
                                {document?.author && (
                                    <Box>
                                        <LabelText
                                            label="Задачу поставил"
                                            node={
                                                document.author && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AvatarImage
                                                            name={`${document.author.last_name} ${document.author.name}`}
                                                            image={document.author.avatar?.thumb}
                                                            size={'24px'}
                                                        />

                                                        <Typography variant="body1" color="grey.900" sx={{ ml: 1 }}>
                                                            {document.author.last_name} {document.author.name}
                                                        </Typography>
                                                    </Box>
                                                )
                                            }
                                        />
                                    </Box>
                                )}
                                {document?.deadTime && (
                                    <Box>
                                        <LabelText label="Сроки выполнения" text={document.deadTime} variant="body2" />
                                    </Box>
                                )}
                            </Box>
                        )} */}
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

                        {document?.users && document?.users.length > 0 && (
                            <Box mt={4}>
                                <Typography variant="h6" mb={2}>
                                    Задача назначена персоналу:
                                </Typography>
                                {document?.users.map((taskUser, index) => (
                                    <Box
                                        key={`${index}u${taskUser.id}`}
                                        sx={{
                                            pl: 4,
                                            pr: 2,
                                            py: 2,
                                            width: '100%',
                                            border: '1px solid #eee',
                                            boxShadow: '0 1px 4px #eee',
                                            borderRadius: '8px',
                                            mb: 4,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box>
                                                {taskUser.user && (
                                                    <LabelText
                                                        label="Исполнитель"
                                                        node={
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <AvatarImage
                                                                    name={`${taskUser.user.last_name} ${taskUser.user.name}`}
                                                                    image={taskUser.user.avatar?.thumb}
                                                                    size={'24px'}
                                                                />

                                                                <Typography
                                                                    variant="body1"
                                                                    color="grey.900"
                                                                    sx={{ ml: 1 }}
                                                                >
                                                                    {taskUser.user.last_name} {taskUser.user.name}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                )}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {profile.id === taskUser.user_id &&
                                                    (taskUser.status === EStatus.INITIAL ||
                                                        taskUser.status === EStatus.ERROR) && (
                                                        <LoadingButton
                                                            loading={loadingTasks.includes(
                                                                `${taskUser.id}u${taskUser.status}`
                                                            )}
                                                            color="warning"
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                height: 24,
                                                            }}
                                                            onClick={() => handleGetUserTask(taskUser)}
                                                        >
                                                            Взять в работу
                                                        </LoadingButton>
                                                    )}
                                                {profile.id === taskUser.user_id &&
                                                    taskUser.status === EStatus.PENDING && (
                                                        <LoadingButton
                                                            color="success"
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                height: 24,
                                                            }}
                                                            onClick={() => handleCompleteUserTask(taskUser)}
                                                        >
                                                            Выполнить задачу
                                                        </LoadingButton>
                                                    )}
                                                {profileRole === ERole.ADMIN && taskUser.status === EStatus.FINISHED && (
                                                    <LoadingButton
                                                        color="error"
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            height: 24,
                                                        }}
                                                        onClick={() => handleRejectUserTask(taskUser)}
                                                    >
                                                        Вернуть в работу
                                                    </LoadingButton>
                                                )}

                                                {profileRole === ERole.ADMIN && (
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleOpenDeleteUser(taskUser)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>

                                        <DocumentBigStatusRow status={taskUser.status} />
                                    </Box>
                                ))}
                            </Box>
                        )}

                        {document?.points && document?.points.length > 0 && (
                            <Box mt={4}>
                                <Typography variant="h6" mb={2}>
                                    Задача назначена на точку:
                                </Typography>
                                {document?.points.map((point, index) => (
                                    <Box
                                        key={`${index}p${point.id}`}
                                        sx={{
                                            px: 4,
                                            py: 2,
                                            width: '100%',
                                            border: '1px solid #eee',
                                            boxShadow: '0 1px 4px #eee',
                                            borderRadius: '8px',
                                            mb: 4,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box>{point.name && <LabelText label="Точка" text={point.name} />}</Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {profile.place_id === point.place_id &&
                                                    (point.status === EStatus.INITIAL ||
                                                        point.status === EStatus.ERROR) && (
                                                        <LoadingButton
                                                            color="warning"
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                height: 24,
                                                            }}
                                                            onClick={() => handleGetPoint(point)}
                                                        >
                                                            Взять в работу
                                                        </LoadingButton>
                                                    )}
                                                {profile.place_id === point.place_id &&
                                                    point.status === EStatus.PENDING && (
                                                        <LoadingButton
                                                            color="success"
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                height: 24,
                                                            }}
                                                            onClick={() => handleCompletePoint(point)}
                                                        >
                                                            Выполнить задачу
                                                        </LoadingButton>
                                                    )}
                                                {profileRole === ERole.ADMIN && point.status === EStatus.FINISHED && (
                                                    <LoadingButton
                                                        color="error"
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            height: 24,
                                                        }}
                                                        onClick={() => handleRejectPoint(point)}
                                                    >
                                                        Вернуть в работу
                                                    </LoadingButton>
                                                )}

                                                {profileRole === ERole.ADMIN && (
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleOpenDeletePoint(point)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>

                                        <DocumentBigStatusRow status={point.status} />
                                    </Box>
                                ))}
                            </Box>
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

                                    <IconButton color="secondary" onClick={handleCutDocument}>
                                        <ContentCutIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>

                        {document?.state.state !== EState.COMPLETED && (
                            <LoadingButton color="success" variant="contained" onClick={handleSetComplete}>
                                Прочитал
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

            <Dialog
                open={openDeletePoint !== '0'}
                onClose={handleCloseDeletePoint}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить задачу для "${deletePointName}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDeletePoint} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteTaskPoint} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteUser !== '0'} onClose={handleCloseDeleteUser} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить задачу для "${deleteUserName}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDeleteUser} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteTaskUser} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
