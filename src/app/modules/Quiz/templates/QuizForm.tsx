import {
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Container,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material'
import { Modal } from 'app/components/Modal'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import md5 from 'md5'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { EQuestionType } from 'types/IQuestion'
import { convertQuestionType } from 'utils/convertUtils'
import * as yup from 'yup'

import { quizActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const QuizForm: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        name: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.id) {
                dispatch(
                    quizActions.updateQuiz({
                        ...values,
                        questions: values.questions.map((question, index) => ({
                            ...question,
                            sort: index,
                        })),
                    })
                )
            } else {
                dispatch(
                    quizActions.createQuiz({
                        ...values,
                        questions: values.questions.map((question, index) => ({
                            ...question,
                            sort: index,
                        })),
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(quizActions.hideEditModal())
    }

    const handleAddVariant = (index: number) => {
        dispatch(
            quizActions.openEditModal({
                ...formik.values,
                questions: formik.values.questions.map((question, iq) => {
                    if (iq == index) {
                        return {
                            ...question,
                            variants: [
                                ...question.variants,
                                {
                                    id: '',
                                    parentId: '',
                                    text: '',
                                    second_text: '',
                                    isCorrect: false,
                                    uniq: md5(`${dayjs().unix()}`),
                                },
                            ],
                        }
                    }
                    return question
                }),
            })
        )
    }

    const handleAddQuestion = (type: EQuestionType) => {
        dispatch(
            quizActions.openEditModal({
                ...formik.values,
                questions: [
                    ...formik.values.questions,
                    {
                        id: '',
                        parentId: data.id,
                        text: '',
                        sort: formik.values.questions.length,
                        uniq: md5(`${dayjs().unix()}`),
                        type: type,
                        variants: [
                            {
                                id: '',
                                parentId: '',
                                text: '',
                                second_text: '',
                                uniq: md5(`${dayjs().unix() + 1}`),
                                isCorrect: true,
                            },
                            {
                                id: '',
                                parentId: '',
                                text: '',
                                second_text: '',
                                uniq: md5(`${dayjs().unix() + 2}`),
                                isCorrect: false,
                            },
                            {
                                id: '',
                                parentId: '',
                                text: '',
                                second_text: '',
                                uniq: md5(`${dayjs().unix() + 3}`),
                                isCorrect: false,
                            },
                        ],
                        createdAt: '',
                    },
                ],
            })
        )
    }

    const handleAddQuestionText = () => {
        dispatch(
            quizActions.openEditModal({
                ...formik.values,
                questions: [
                    ...formik.values.questions,
                    {
                        id: '',
                        parentId: data.id,
                        text: '',
                        sort: formik.values.questions.length,
                        uniq: md5(`${dayjs().unix()}`),
                        type: EQuestionType.TEXT,
                        variants: [],
                        createdAt: '',
                    },
                ],
            })
        )
    }

    const handleRemoveVariant = (uniq: string, vuniq: string, id: string) => {
        if (!id) {
            dispatch(
                quizActions.openEditModal({
                    ...formik.values,
                    questions: formik.values.questions.map((question) => {
                        if (question.uniq === uniq) {
                            return {
                                ...question,
                                variants: [...question.variants.filter((variant) => vuniq !== variant.uniq)],
                            }
                        }
                        return question
                    }),
                })
            )
        } else {
            dispatch(
                quizActions.openEditModal({
                    ...formik.values,
                    questions: formik.values.questions.map((question) => {
                        if (question.uniq === uniq) {
                            return {
                                ...question,
                                variants: question.variants.map((variant) => {
                                    if (variant.uniq === vuniq) {
                                        return {
                                            ...variant,
                                            delete: true,
                                        }
                                    }
                                    return variant
                                }),
                            }
                        }
                        return question
                    }),
                })
            )
        }
    }

    const handleRemoveQuestion = (uniq: string, id: string) => {
        if (!id) {
            dispatch(
                quizActions.openEditModal({
                    ...formik.values,
                    questions: formik.values.questions.filter((question) => uniq !== question.uniq),
                })
            )
        } else {
            dispatch(
                quizActions.openEditModal({
                    ...formik.values,
                    questions: formik.values.questions.map((question) => {
                        if (question.uniq === uniq) {
                            return {
                                ...question,
                                delete: true,
                            }
                        }
                        return question
                    }),
                })
            )
        }
    }

    useEffect(() => {
        console.log(formik.values)
    }, [formik.values])

    const handleUpInfo = (index: number) => {
        dispatch(
            quizActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(quizActions.moveUpInfo(index))
    }

    const handleDownInfo = (index: number) => {
        dispatch(
            quizActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(quizActions.moveDownInfo(index))
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование теста' : 'Создание теста'} handleClose={handleClose}>
            <Box
                mt={1}
                pt={1}
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
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
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Название"
                        name="name"
                        value={formik.values.name || ''}
                        error={!!formik.errors.name}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Описание теста"
                        name={'description'}
                        sx={{ mt: 2 }}
                        value={formik.values.description || ''}
                        onChange={formik.handleChange}
                        multiline
                        minRows={2}
                        maxRows={4}
                    />

                    <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            label="Минимальное количество ошибок"
                            name={'incorrect_count'}
                            value={formik.values.incorrect_count || 0}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            label="Ограничение времени на прохождение тестирования"
                            name={'max_min'}
                            value={formik.values.max_min || 0}
                            onChange={formik.handleChange}
                        />
                    </Box>

                    {formik.values.questions
                        .map((question, index) => ({ ...question, sort: index }))
                        .filter((question) => !question.delete)
                        .map((question, index) => (
                            <Box
                                key={question.uniq}
                                sx={{
                                    display: 'flex',
                                    mt: 2,
                                    alignItems: 'flex-start',
                                    width: '100%',
                                }}
                            >
                                <Accordion sx={{ flexGrow: 1 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Вопрос {index + 1}</Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {convertQuestionType(question.type)}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Вопрос"
                                            name={`questions.${question.sort}.text`}
                                            value={question.text || ''}
                                            onChange={formik.handleChange}
                                            multiline
                                            maxRows={4}
                                        />

                                        {question.type === EQuestionType.VARIANT && (
                                            <>
                                                <Divider sx={{ mt: 1, mb: 2 }} />

                                                <Typography mt={1} variant="body3">
                                                    Ответы
                                                </Typography>

                                                {question.variants
                                                    .map((variant, index) => ({ ...variant, sort: index }))
                                                    .filter((variant) => !variant.delete)
                                                    .map((variant, i) => (
                                                        <Box
                                                            key={variant.uniq}
                                                            sx={{
                                                                display: variant.delete ? 'none' : 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <Checkbox
                                                                checked={variant.isCorrect || false}
                                                                onChange={(
                                                                    event: React.ChangeEvent<HTMLInputElement>
                                                                ) => {
                                                                    formik.setFieldValue(
                                                                        `questions.${question.sort}.variants.${variant.sort}.isCorrect`,
                                                                        event.target.checked
                                                                    )
                                                                }}
                                                            />
                                                            <TextField
                                                                sx={{ mt: 1 }}
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                label={`Ответ ${i + 1}`}
                                                                name={`questions.${question.sort}.variants.${variant.sort}.text`}
                                                                value={variant.text || ''}
                                                                onChange={formik.handleChange}
                                                            />

                                                            <IconButton
                                                                color="error"
                                                                onClick={() =>
                                                                    handleRemoveVariant(
                                                                        question.uniq,
                                                                        variant.uniq,
                                                                        variant.id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                <ButtonGroup fullWidth size="small" sx={{ my: 5 }}>
                                                    <Button onClick={() => handleAddVariant(question.sort)}>
                                                        Добавить Ответ
                                                    </Button>
                                                </ButtonGroup>
                                            </>
                                        )}

                                        {question.type === EQuestionType.SORT && (
                                            <>
                                                <Divider sx={{ mt: 1, mb: 2 }} />

                                                <Typography mt={1} variant="body3">
                                                    Ответы
                                                </Typography>

                                                {question.variants
                                                    .map((variant, index) => ({ ...variant, sort: index }))
                                                    .filter((variant) => !variant.delete)
                                                    .map((variant, i) => (
                                                        <Box
                                                            key={variant.uniq}
                                                            sx={{
                                                                display: variant.delete ? 'none' : 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <TextField
                                                                sx={{ mt: 1 }}
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                label={`Ответ ${i + 1}`}
                                                                name={`questions.${question.sort}.variants.${variant.sort}.text`}
                                                                value={variant.text || ''}
                                                                onChange={formik.handleChange}
                                                            />

                                                            <TextField
                                                                sx={{ mt: 1 }}
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                label={`Ответ ${i + 1} часть 2`}
                                                                name={`questions.${question.sort}.variants.${variant.sort}.second_text`}
                                                                value={variant.second_text || ''}
                                                                onChange={formik.handleChange}
                                                            />

                                                            <IconButton
                                                                color="error"
                                                                onClick={() =>
                                                                    handleRemoveVariant(
                                                                        question.uniq,
                                                                        variant.uniq,
                                                                        variant.id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                <ButtonGroup fullWidth size="small" sx={{ my: 5 }}>
                                                    <Button onClick={() => handleAddVariant(question.sort)}>
                                                        Добавить Ответ
                                                    </Button>
                                                </ButtonGroup>
                                            </>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                <Box display={'flex'} flexDirection={'column'} sx={{ ml: 2 }}>
                                    <IconButton
                                        disabled={question.sort === 0}
                                        onClick={() => handleUpInfo(question.sort)}
                                    >
                                        <KeyboardArrowUpIcon />
                                    </IconButton>

                                    <IconButton
                                        disabled={
                                            formik.values.questions.filter((question) => !question.delete).length ===
                                            question.sort - 1
                                        }
                                        onClick={() => handleDownInfo(question.sort)}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveQuestion(question.uniq, question.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}

                    <ButtonGroup fullWidth size="small" sx={{ my: 5 }}>
                        <Button onClick={() => handleAddQuestion(EQuestionType.VARIANT)}>+ Обычный Вопрос</Button>
                        <Button onClick={() => handleAddQuestionText()}>+ Вариативный Вопрос</Button>
                        <Button onClick={() => handleAddQuestion(EQuestionType.SORT)}>+ Вопрос с соответствиями</Button>
                    </ButtonGroup>
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
                <Container>
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        fullWidth
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                    >
                        Сохранить
                    </LoadingButton>
                </Container>
            </Box>
        </Modal>
    )
}
