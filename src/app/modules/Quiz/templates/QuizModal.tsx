import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Container, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ERole, EState } from 'types'

import { quizActions } from '../slice'
import { selectModal, selectQuizById } from '../slice/selectors'

export const QuizModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openStart, setOpenStart] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getQuiz = useSelector(selectQuizById)
    const quiz = getQuiz(activeId)

    const handleClose = () => {
        dispatch(quizActions.hideModal())
    }

    const handleEditDocument = () => {
        if (quiz) {
            dispatch(quizActions.openEditModal(quiz))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleCloseStart = () => {
        setOpenStart(false)
    }

    const handleDeleteDocument = () => {
        if (quiz) {
            dispatch(quizActions.deleteQuiz(quiz.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    const handleStart = () => {
        if (quiz) {
            dispatch(quizActions.setStart(quiz.id))
        }
    }

    const handlePublic = () => {
        if (quiz) {
            dispatch(quizActions.setPublic(quiz.id))
        }
    }

    const handleDraft = () => {
        if (quiz) {
            dispatch(quizActions.setDraft(quiz.id))
        }
    }

    return (
        <>
            <Modal open={isOpen} title={quiz?.name || ''} handleClose={handleClose}>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <LabelText
                                    label="Описание"
                                    node={<Typography variant="body1">{quiz?.description}</Typography>}
                                />
                            </Box>
                            <Box>
                                <LabelText
                                    label="Информация"
                                    node={<Typography variant="body1">Вопросов {quiz?.questions.length}</Typography>}
                                />
                            </Box>
                        </Box>
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
                    {profileRole === ERole.ADMIN && (
                        <Container sx={{ mb: 4 }}>
                            <LoadingButton
                                component={Link}
                                to={`/quiz/result/${quiz?.id}`}
                                fullWidth
                                color="warning"
                                variant="contained"
                            >
                                Результаты
                            </LoadingButton>
                        </Container>
                    )}
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

                                    {quiz && !quiz.draft && (
                                        <LoadingButton onClick={handleDraft}>В Черновик</LoadingButton>
                                    )}
                                </>
                            )}
                        </Box>

                        {quiz && quiz.state.state !== EState.COMPLETED && quiz.state.state !== EState.CLOSED && (
                            <LoadingButton color="success" variant="contained" onClick={handleStart}>
                                Приступить к тестированию
                            </LoadingButton>
                        )}
                        {quiz && quiz.draft && profileRole === ERole.ADMIN && (
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Typography color="grey.600">Черновик</Typography>

                                <LoadingButton color="success" variant="contained" onClick={handlePublic}>
                                    Опубликовать
                                </LoadingButton>
                            </Box>
                        )}
                    </Container>
                </Box>
            </Modal>

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    {`Вы уверены, что хотите удалить тест "${quiz?.name}"?`}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteDocument} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <Dialog open={openStart} onClose={handleCloseStart} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    {`Вы уверены, что хотите начать тест "${quiz?.name}"? У вас будет огранично время выполнения`}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseStart} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleStart} autoFocus color="success">
                        Начать
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
