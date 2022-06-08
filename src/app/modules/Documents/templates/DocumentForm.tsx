import {
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, ButtonGroup, Container, IconButton, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { ImageUploadForm } from 'app/modules/File/templates/ImageUploadForm'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TDocumentInfoType } from 'types/IDocumentInfo'
import * as yup from 'yup'

import { TextAreaEdit } from '../components/TextAreaEdit'
import { documentsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const DocumentForm: React.FC = () => {
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
                    documentsActions.updateDocument({
                        ...values,
                        info: values.info.map((info, index) => ({
                            ...info,
                            sort: index,
                        })),
                    })
                )
            } else {
                dispatch(
                    documentsActions.createDocument({
                        ...values,
                        info: values.info.map((info, index) => ({
                            ...info,
                            sort: index,
                        })),
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(documentsActions.hideEditModal())
    }

    const handleAddInfo = (type: TDocumentInfoType) => {
        dispatch(
            documentsActions.openEditModal({
                ...formik.values,
                info: [
                    ...formik.values.info,
                    {
                        id: '',
                        type,
                        parentId: '0',
                        text: '',
                        fid: '',
                        sort: formik.values.info.length,
                        createdAt: '',
                    },
                ],
            })
        )
    }

    const handleRemoveInfo = (index: number, id: string) => {
        if (!id) {
            dispatch(
                documentsActions.openEditModal({
                    ...formik.values,
                    info: [...formik.values.info.filter((_, i) => index !== i)],
                })
            )
        } else {
            dispatch(
                documentsActions.openEditModal({
                    ...formik.values,
                    info: formik.values.info.map((info, i) => {
                        if (i !== index) return info
                        return {
                            ...info,
                            type: 'delete',
                        }
                    }),
                })
            )
        }
    }

    const handleUpInfo = (index: number) => {
        dispatch(
            documentsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(documentsActions.moveUpInfo(index))
    }

    const handleDownInfo = (index: number) => {
        dispatch(
            documentsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(documentsActions.moveDownInfo(index))
    }

    return (
        <Modal
            open={open}
            title={data.id ? 'Редактирование документа' : 'Создание документа'}
            handleClose={handleClose}
        >
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

                    {formik.values.info
                        .filter((info) => info.type !== 'delete')
                        .map((info, index) => (
                            <Box key={index} display={'flex'} mt={2} alignItems={'flex-start'}>
                                {info.type === 'title' && (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Подзаголовок"
                                        name={`info.${index}.text`}
                                        value={formik.values.info[index].text || ''}
                                        onChange={formik.handleChange}
                                    />
                                )}

                                {info.type === 'text' && (
                                    <TextAreaEdit
                                        value={data.info[index]?.text || ''}
                                        onChange={(value: string) => {
                                            formik.setFieldValue(`info.${index}.text`, value)
                                        }}
                                    />
                                )}

                                {info.type === 'image' && (
                                    <Box flex="1 0 0%">
                                        {!info.image ? (
                                            <ImageUploadForm index={index} />
                                        ) : (
                                            <Box component={'img'} src={info.image.url} maxWidth="100%" />
                                        )}
                                    </Box>
                                )}

                                <Box display={'flex'} flexDirection={'column'} sx={{ ml: 2 }}>
                                    <IconButton disabled={index === 0} onClick={() => handleUpInfo(index)}>
                                        <KeyboardArrowUpIcon />
                                    </IconButton>

                                    <IconButton
                                        disabled={
                                            formik.values.info.filter((info) => info.type !== 'delete').length ===
                                            index - 1
                                        }
                                        onClick={() => handleDownInfo(index)}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    {info.type === 'image' && <ImageUploadForm isEdit index={index} />}
                                    <IconButton color="error" onClick={() => handleRemoveInfo(index, info.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}

                    <ButtonGroup fullWidth size="small" sx={{ my: 5 }}>
                        <Button onClick={() => handleAddInfo('title')}>Добавить Заголовок</Button>
                        <Button onClick={() => handleAddInfo('text')}>Добавить текст</Button>
                        <Button
                            disabled={
                                formik.values.info.filter((item) => item.type === 'image' && item.fid === '').length > 0
                            }
                            onClick={() => handleAddInfo('image')}
                        >
                            Добавить картинку
                        </Button>
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
