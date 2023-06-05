import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectLocations } from 'app/modules/Locations/selectors'
import { resultsActions } from 'app/modules/Results/slice'
import { selectFilter } from 'app/modules/Results/slice/selectors'
import { useFormik } from 'formik'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface MobileFilterBlockProps {
    open: boolean
    onClose: () => void
}

export const MobileFilterBlock: React.FC<MobileFilterBlockProps> = ({ open, onClose }) => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)
    const locations = useSelector(selectLocations)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    const formik = useFormik({
        initialValues: filter,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(resultsActions.setFilter(values))
            onClose()
        },
    })

    return (
        <Modal open={open} title={'Фильтр'} handleClose={onClose}>
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
                    <Stack spacing={5}>
                        <FormControl variant="standard">
                            <InputLabel>Должность</InputLabel>
                            <Select
                                value={formik.values.position}
                                label="Должность"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('position', value)
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: '',
                                    },
                                    {
                                        label: 'Продавец',
                                        value: 'seller',
                                    },
                                    {
                                        label: 'Кальянщик',
                                        value: 'hookah',
                                    },
                                    {
                                        label: 'Управляющий',
                                        value: 'manager',
                                    },
                                    {
                                        label: 'Сотрудник офиса',
                                        value: 'office',
                                    },
                                    {
                                        label: 'Сотрудник склада',
                                        value: 'sklad',
                                    },
                                    {
                                        label: 'Менеджер и Управляющий',
                                        value: 'managerControl',
                                    },
                                    {
                                        label: 'Бухгалтер',
                                        value: 'accountant',
                                    },
                                    {
                                        label: 'Кладовщик',
                                        value: 'storekeeper',
                                    },
                                    {
                                        label: 'Техник',
                                        value: 'technician',
                                    },
                                    {
                                        label: 'Оптовый менеджер',
                                        value: 'opt',
                                    },
                                    {
                                        label: 'Владелец',
                                        value: 'owner',
                                    },
                                    {
                                        label: 'Создатель',
                                        value: 'creator',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Точка</InputLabel>
                            <Select
                                value={formik.values.place_id}
                                label="Точка"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('place_id', value)
                                }}
                            >
                                {[
                                    ...[
                                        {
                                            label: 'Все',
                                            value: '',
                                        },
                                    ],
                                    ...places,
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={filter.state}
                                label="Статус"
                                onChange={(e) => {
                                    const { value } = e.target

                                    dispatch(
                                        resultsActions.setFilter({
                                            ...filter,
                                            state: value,
                                        })
                                    )
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: 'all',
                                    },
                                    {
                                        label: 'На проверке',
                                        value: 'done',
                                    },
                                    {
                                        label: 'Не пройден',
                                        value: 'initial',
                                    },
                                    {
                                        label: 'В процессе',
                                        value: 'pending',
                                    },
                                    {
                                        label: 'Выполнен',
                                        value: 'completed',
                                    },
                                    {
                                        label: 'Провален',
                                        value: 'closed',
                                    },
                                    {
                                        label: 'Разрешено пройти повторно',
                                        value: 'rejected',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
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
                    <Button fullWidth color="success" variant="contained" onClick={() => formik.handleSubmit()}>
                        Применить фильтр
                    </Button>
                </Container>
            </Box>
        </Modal>
    )
}
