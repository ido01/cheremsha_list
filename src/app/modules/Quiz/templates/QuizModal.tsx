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
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ERole } from 'types'
import { EQuizState } from 'types/IQuizState'
import { convertQuizState } from 'utils/convertUtils'

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

    const timePassed = useMemo(() => {
        if (quiz && quiz.state) {
            const all_time = quiz.state.end_time - quiz.state.start_time
            const hours = Math.floor(all_time / 3600)
            const minutes = Math.floor((all_time % 3600) / 60)
            const seconds = all_time % 60
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`
        }

        return '00:00:00'
    }, [quiz])

    const percent = useMemo(() => {
        if (quiz?.state) {
            return `${Math.round((quiz.state.correct / quiz.state.all_questions) * 100)}%`
        }

        return '0%'
    }, [quiz])

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
                        <Grid container sx={{ my: 2.5 }} spacing={2.5}>
                            <Grid item xs={12}>
                                <LabelText
                                    label="Статус"
                                    node={
                                        <Typography
                                            variant="body2"
                                            sx={(theme) => ({
                                                color:
                                                    !quiz?.state ||
                                                    quiz?.state.state === EQuizState.INITIAL ||
                                                    quiz?.state.state === EQuizState.REJECTED ||
                                                    quiz?.state.state === EQuizState.PENDING
                                                        ? theme.palette.primary.main
                                                        : quiz?.state.state === EQuizState.DONE
                                                        ? theme.palette.warning.main
                                                        : quiz?.state.state === EQuizState.COMPLETED
                                                        ? theme.palette.success.main
                                                        : theme.palette.error.main,
                                            })}
                                        >
                                            {convertQuizState(quiz?.state.state || EQuizState.INITIAL)}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            {quiz?.state &&
                                (quiz?.state.state === EQuizState.CLOSED ||
                                    quiz?.state.state === EQuizState.COMPLETED) && (
                                    <>
                                        <Grid item xs={6}>
                                            <LabelText
                                                label="Время выполнения"
                                                node={<Typography variant="h6">{timePassed}</Typography>}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LabelText
                                                label="Результат"
                                                node={
                                                    <Typography
                                                        variant="h6"
                                                        sx={(theme) => ({
                                                            color:
                                                                quiz?.state?.state === EQuizState.COMPLETED
                                                                    ? theme.palette.success.main
                                                                    : theme.palette.error.main,
                                                        })}
                                                    >
                                                        {percent}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LabelText
                                                label="Правильно"
                                                node={
                                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={(theme) => ({
                                                                color: theme.palette.success.main,
                                                                lineHeight: 1,
                                                            })}
                                                        >
                                                            {quiz?.state.correct}
                                                        </Typography>

                                                        <Typography>из {quiz?.state.all_questions}</Typography>
                                                    </Box>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <LabelText
                                                label="Ошибки"
                                                node={
                                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={(theme) => ({
                                                                color: theme.palette.error.main,
                                                                lineHeight: 1,
                                                            })}
                                                        >
                                                            {quiz?.state.incorrect}
                                                        </Typography>

                                                        <Typography>из {quiz?.state.all_questions}</Typography>
                                                    </Box>
                                                }
                                            />
                                        </Grid>
                                    </>
                                )}
                        </Grid>
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

                        {quiz &&
                            quiz.state.state !== EQuizState.COMPLETED &&
                            quiz.state.state !== EQuizState.CLOSED &&
                            quiz.state.state !== EQuizState.DONE && (
                                <LoadingButton color="success" variant="contained" onClick={() => setOpenStart(true)}>
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
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить тест "${quiz?.name}"?`}</DialogContentText>
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

            <Dialog open={openStart} onClose={handleCloseStart} aria-labelledby="alert-dialog-title">
                <DialogTitle>Осторожно</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите начать тест "${quiz?.name}"?`}</DialogContentText>
                    <DialogContentText>У вас будет огранично время выполнения</DialogContentText>
                </DialogContent>

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
