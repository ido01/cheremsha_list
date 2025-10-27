import {
    AddBox as AddBoxIcon,
    AddCircle as AddCircleIcon,
    ContentCut as ContentCutIcon,
    ContentPasteGo as ContentPasteGoIcon,
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
import { selectCopyId, selectForm, selectMoveId } from 'app/modules/Documents/slice/selectors'
import { DocumentForm } from 'app/modules/Documents/templates/DocumentForm'
import { quizActions } from 'app/modules/Quiz/slice'
import { selectMoveQuizId } from 'app/modules/Quiz/slice/selectors'
import { QuizForm } from 'app/modules/Quiz/templates/QuizForm'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EState, EStatus } from 'types'
import { ICategory } from 'types/ICategory'
import { EQuizState } from 'types/IQuizState'

import { selectmoveCategoryId } from '../slice/selectors'

interface CategoryAdminSettingsProps {
    open: boolean
    id?: string
    category?: ICategory
    handleClose: () => void
}

export const CategoryAdminSettings: React.FC<CategoryAdminSettingsProps> = ({ id, category, open, handleClose }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { open: openDocumentForm, copy } = useSelector(selectForm)
    const moveCategoryId = useSelector(selectmoveCategoryId)
    const moveId = useSelector(selectMoveId)
    const copyId = useSelector(selectCopyId)
    const quizMoveId = useSelector(selectMoveQuizId)
    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const handlePasteCategory = () => {
        dispatch(
            categoriesActions.moveCategory({
                id: moveCategoryId,
                parentId: id || '0',
            })
        )
    }

    const handlePasteDocument = () => {
        dispatch(
            documentsActions.moveDocument({
                id: moveId,
                parentId: id || '0',
            })
        )
    }

    const handlePasteQuiz = () => {
        dispatch(
            quizActions.moveQuiz({
                id: quizMoveId,
                parentId: id || '0',
            })
        )
    }

    const handleCopyDocument = () => {
        dispatch(
            documentsActions.createDocument({
                ...copy,
                id: '',
                parentId: id || '0',
                name: `Копия ${copy.name}`,
            })
        )
    }

    const handleAddCategory = () => {
        dispatch(
            categoriesActions.openModal({
                id: '',
                type: 'category',
                name: '',
                parentId: id || '0',
                createdAt: '',
                icon: '',
            })
        )
    }

    const addQuiz = () => {
        dispatch(
            quizActions.openEditModal({
                id: '',
                draft: true,
                type: 'quiz',
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
                    start_time: 0,
                    end_time: 0,
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
                task_status: EStatus.INITIAL,
                type: 'document',
                uid: '',
                name: '',
                end_date: '',
                end_date_unix: 0,
                deadTime: '',
                parentId: id || '0',
                info: [],
                points: [],
                users: [],
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

    const handleCutCategory = () => {
        if (category) {
            dispatch(categoriesActions.cutCategory(category.id))
        }
    }

    const handleDeleteCategory = () => {
        if (id) {
            dispatch(categoriesActions.deleteCategory(id))
            history.push(`/doc/${category?.parentId}`)
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

                    <ListItem disablePadding onClick={addDocument}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить документ'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={addQuiz}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить тестирование'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {id && id !== '0' && id !== moveCategoryId && (
                        <ListItem
                            // disabled={!id || id === '0'}
                            disablePadding
                            onClick={handleCutCategory}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContentCutIcon />
                                </ListItemIcon>

                                <ListItemText primary={'Перенести категорию'} />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {moveCategoryId && id !== moveCategoryId && (
                        <ListItem
                            // disabled={!id || id === '0'}
                            disablePadding
                            onClick={handlePasteCategory}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContentPasteGoIcon />
                                </ListItemIcon>

                                <ListItemText primary={'Вставить категорию'} />
                            </ListItemButton>
                        </ListItem>
                    )}

                    <ListItem
                        // disabled={!id || id === '0'}
                        disablePadding
                        onClick={handleUpdateCategory}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Редактировать категорию'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        // disabled={!id || id === '0'}
                        disablePadding
                        onClick={handleShowDeleteCategory}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Удалить категорию'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                {!!moveId && (
                    <>
                        <Divider />
                        <List>
                            <ListItem
                                // disabled={!id || id === '0'}
                                disablePadding
                                onClick={handlePasteDocument}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContentPasteGoIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={'Вставить вырезанный документ'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}

                {!!copyId && (
                    <>
                        <Divider />
                        <List>
                            <ListItem
                                // disabled={!id || id === '0'}
                                disablePadding
                                onClick={handleCopyDocument}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContentPasteGoIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={'Вставить cкопированный документ'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}

                {!!quizMoveId && (
                    <>
                        <Divider />
                        <List>
                            <ListItem
                                // disabled={!id || id === '0'}
                                disablePadding
                                onClick={handlePasteQuiz}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContentPasteGoIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={'Вставить тест'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
            </SettingsModal>

            <CategoryForm />
            {openDocumentForm && <DocumentForm />}
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
