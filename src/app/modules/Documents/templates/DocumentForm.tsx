import 'dayjs/locale/ru'

import {
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, ButtonGroup, Container, IconButton, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Modal } from 'app/components/Modal'
import { ImageUploadForm } from 'app/modules/File/templates/ImageUploadForm'
import { tinyUsersActions } from 'app/modules/Users/slice/tiny'
import { selectStatus } from 'app/modules/Users/slice/tiny/selectors'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TDocumentInfoType } from 'types/IDocumentInfo'
import * as yup from 'yup'

import { TextAreaEdit } from '../components/TextAreaEdit'
import { documentsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const DocumentForm: React.FC = () => {
    dayjs.locale('ru')
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)
    // const locations = useSelector(selectLocationsFilter)
    const statusUsers = useSelector(selectStatus)
    // const users = useSelector(selectUsers)

    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(data.end_date.split('.').reverse().join('-')))
    const [deadTime, setDeadTime] = useState<Dayjs | null>(dayjs(data.deadTime.split('.').reverse().join('-')))
    setDeadTime

    // const places = useMemo(() => {
    //     return locations.map((location) => ({
    //         id: '',
    //         place_id: location.id,
    //         document_id: data.id,
    //         status: EStatus.INITIAL,
    //         endAt: '',
    //         name: location.name,
    //     }))
    // }, [locations])

    // const usersList = useMemo<IDocumentTaskUser[]>(() => {
    //     return users.map((user) => ({
    //         id: '',
    //         user_id: user.id,
    //         document_id: data.id,
    //         status: EStatus.INITIAL,
    //         endAt: '',
    //         name: user.label,
    //     }))
    // }, [users])

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
                        end_date: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format()).format('yyyy-MM-DD')
                            : '',
                        end_date_unix: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                        deadTime: deadTime?.isValid() ? `${deadTime.add(1, 'd').unix()}` : '0',
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
                        end_date: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format()).format('yyyy-MM-DD')
                            : '',
                        end_date_unix: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                        deadTime: deadTime?.isValid() ? `${deadTime.add(1, 'd').unix()}` : '0',
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

    useEffect(() => {
        if (statusUsers === EStatus.INITIAL) {
            dispatch(tinyUsersActions.loadUsers())
        }
    }, [])

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

                    {/* {formik.values.path === 'task' && (
                        <>
                            <Box mt={2}>
                                <DatePicker
                                    label="Срок выполнения задачи"
                                    // inputFormat="dd.MM.yyyy"
                                    // mask="__.__.____"
                                    value={deadTime}
                                    onChange={(val) => {
                                        setDeadTime(dayjs(val))
                                    }}
                                    // renderInput={(params) => <TextField fullWidth variant="outlined" {...params} />}
                                />
                            </Box>

                            <Box mt={2}>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={places}
                                    getOptionLabel={(option) => option.name}
                                    value={formik.values.points}
                                    filterSelectedOptions
                                    onChange={(event, val) => {
                                        formik.setFieldValue('points', val)
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                label={option.name}
                                                {...getTagProps({ index })}
                                                disabled={!!option.id}
                                                key={option.place_id}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="На какие точки назначена задача"
                                            placeholder="Точки"
                                        />
                                    )}
                                />
                            </Box>

                            <Box mt={2}>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={usersList}
                                    value={formik.values.users}
                                    getOptionLabel={(option) => option.name || option.user_id}
                                    filterSelectedOptions
                                    onChange={(event, val) => {
                                        formik.setFieldValue('users', val)
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                label={option.name}
                                                {...getTagProps({ index })}
                                                disabled={!!option.id}
                                                key={option.user_id}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Назначить выполнение задачи сотруднику"
                                            placeholder="Сотрудники"
                                        />
                                    )}
                                />
                            </Box>
                        </>
                    )} */}

                    <Box mt={2}>
                        <DatePicker
                            label={'Дата удаления документа'}
                            // inputFormat="dd.MM.yyyy"
                            // mask="__.__.____"
                            value={endDate}
                            onChange={(val) => {
                                setEndDate(val)
                            }}
                            // renderInput={(params) => <TextField fullWidth variant="outlined" {...params} />}
                        />
                    </Box>

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
                                            index + 1
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
