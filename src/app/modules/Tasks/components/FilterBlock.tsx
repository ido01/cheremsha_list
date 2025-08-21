import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import { selectLocations } from 'app/modules/Locations/slice/selectors'
import { selectUsers } from 'app/modules/Users/slice/tiny/selectors'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { EStatus } from 'types'

export const FilterBlock: React.FC = () => {
    const locations = useSelector(selectLocations)
    const users = useSelector(selectUsers)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    return (
        <Box mb={4} px={4} display={'flex'} justifyContent={'flex-end'}>
            <Stack direction={'row'} spacing={2}>
                <Autocomplete
                    options={[
                        ...[
                            {
                                label: 'Все',
                                id: '',
                            },
                        ],
                        ...users,
                    ]}
                    size="small"
                    getOptionLabel={(option) => option.label}
                    filterSelectedOptions
                    onChange={(event, val) => {
                        event
                        val
                        // formik.setFieldValue(
                        //     'points',
                        //     val.map((point) => ({
                        //         id: '',
                        //         place_id: point.id,
                        //         document_id: formik.values.id,
                        //         status: EStatus.INITIAL,
                        //         endAt: '',
                        //     }))
                        // )
                    }}
                    renderInput={(params) => <TextField {...params} label="Сотрудник" placeholder="Сотрудник" />}
                    sx={{ width: '200px' }}
                />

                <Autocomplete
                    options={[
                        ...[
                            {
                                label: 'Все',
                                value: '',
                            },
                        ],
                        ...places,
                    ]}
                    size="small"
                    getOptionLabel={(option) => option.label}
                    filterSelectedOptions
                    onChange={(event, val) => {
                        event
                        val
                        // formik.setFieldValue(
                        //     'points',
                        //     val.map((point) => ({
                        //         id: '',
                        //         place_id: point.id,
                        //         document_id: formik.values.id,
                        //         status: EStatus.INITIAL,
                        //         endAt: '',
                        //     }))
                        // )
                    }}
                    renderInput={(params) => <TextField {...params} label="Точка" placeholder="Точка" />}
                    sx={{ width: '200px' }}
                />

                <Autocomplete
                    options={[
                        {
                            label: 'Все',
                            value: 'all',
                        },
                        {
                            label: 'Новые',
                            value: EStatus.INITIAL,
                        },
                        {
                            label: 'В работе',
                            value: EStatus.PENDING,
                        },
                        {
                            label: 'Выполнено',
                            value: EStatus.FINISHED,
                        },
                        {
                            label: 'Переоткрыт',
                            value: EStatus.ERROR,
                        },
                    ]}
                    getOptionLabel={(option) => option.label}
                    size="small"
                    filterSelectedOptions
                    onChange={(event, val) => {
                        event
                        val
                        // formik.setFieldValue(
                        //     'points',
                        //     val.map((point) => ({
                        //         id: '',
                        //         place_id: point.id,
                        //         document_id: formik.values.id,
                        //         status: EStatus.INITIAL,
                        //         endAt: '',
                        //     }))
                        // )
                    }}
                    renderInput={(params) => <TextField {...params} label="Статус" placeholder="Статус" />}
                    sx={{ width: '200px' }}
                />
            </Stack>
        </Box>
    )
}
