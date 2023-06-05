import {
    AddBox as AddBoxIcon,
    AddCircle as AddCircleIcon,
    DeleteForever as DeleteForeverIcon,
    Edit as EditIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { categoriesActions } from 'app/modules/Categories/slice'
import { CategoryForm } from 'app/modules/Categories/templates/CategoryForm'
import { documentsActions } from 'app/modules/Documents/slice'
import { DocumentForm } from 'app/modules/Documents/templates/DocumentForm'
import { quizActions } from 'app/modules/Quiz/slice'
import { QuizForm } from 'app/modules/Quiz/templates/QuizForm'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EState, EType } from 'types'
import { ICategory } from 'types/ICategory'
import { EQuizState } from 'types/IQuizState'

interface CategoryAdminSettingsProps {
    type: EType
    open: boolean
    id?: string
    category?: ICategory
    handleClose: () => void
}

export const CategoryAdminSettings: React.FC<CategoryAdminSettingsProps> = ({
    id,
    category,
    open,
    type,
    handleClose,
}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const handleAddCategory = () => {
        dispatch(
            categoriesActions.openModal({
                id: '',
                type: 'category',
                path: type,
                name: '',
                parentId: id || '0',
                state: {
                    id: '',
                    state: EState.INITIAL,
                    uid: '',
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            })
        )
    }

    const handleAddEvent = () => {
        if (type === 'quiz') {
            addQuiz()
        } else {
            addDocument()
        }
    }

    const addQuiz = () => {
        dispatch(
            quizActions.openEditModal({
                id: '',
                draft: true,
                type: 'quiz',
                path: type,
                name: '',
                description: '',
                incorrect_count: 0,
                max_min: 30,
                parentId: id || '0',
                questions: [],
                state: {
                    id: '',
                    state: EQuizState.INITIAL,
                    uid: '',
                    qid: '',
                    current_question: -1,
                    correct: 0,
                    incorrect: 0,
                    all_questions: 0,
                    time_passed: 0,
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            })
        )
    }

    const addDocument = () => {
        dispatch(
            documentsActions.openEditModal({
                id: '',
                type: 'document',
                path: type,
                name: '',
                parentId: id || '0',
                info: [],
                state: {
                    id: '',
                    state: EState.INITIAL,
                    uid: '',
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            })
        )
    }

    const handleUpdateCategory = () => {
        if (category) {
            dispatch(categoriesActions.openModal(category))
        }
    }

    const handleShowDeleteCategory = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteCategory = () => {
        if (id) {
            dispatch(categoriesActions.deleteCategory(id))
            history.push(`/${type}/${category?.parentId}`)
        }
        setOpenDelete(false)
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={handleAddCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить подкатегорию'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={handleAddEvent}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary={
                                    type === 'faq'
                                        ? 'Добавить гайд'
                                        : type === 'school'
                                        ? 'Добавить обучение'
                                        : type === 'actions'
                                        ? 'Добавить акцию'
                                        : type === 'motivation'
                                        ? 'Добавить мотивацию'
                                        : 'Добавить тестирование'
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem disabled={!id || id === '0'} disablePadding onClick={handleUpdateCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Редактировать категорию'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disabled={!id || id === '0'} disablePadding onClick={handleShowDeleteCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Удалить категорию'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SettingsModal>

            <CategoryForm />
            <DocumentForm />
            <QuizForm />

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить катеорию ${category?.name}?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteCategory} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
