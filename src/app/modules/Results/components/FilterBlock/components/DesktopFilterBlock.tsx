import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { selectLocations } from 'app/modules/Locations/selectors'
import { resultsActions } from 'app/modules/Results/slice'
import { selectFilter } from 'app/modules/Results/slice/selectors'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EPosition } from 'types'

export const DesktopFilterBlock: React.FC = () => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)
    const locations = useSelector(selectLocations)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    return (
        <Box mb={4} px={4} display={'flex'} justifyContent={'flex-end'}>
            <Stack direction={'row'} spacing={2}>
                <FormControl sx={{ width: '200px' }} variant="standard">
                    <InputLabel>Должность</InputLabel>
                    <Select
                        value={filter.position}
                        label="Должность"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                resultsActions.setFilter({
                                    ...filter,
                                    position: value as EPosition,
                                })
                            )
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

                <FormControl sx={{ width: '200px' }} variant="standard">
                    <InputLabel>Точка</InputLabel>
                    <Select
                        value={filter.place_id}
                        label="Точка"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                resultsActions.setFilter({
                                    ...filter,
                                    place_id: value,
                                })
                            )
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

                <FormControl sx={{ width: '200px' }} variant="standard">
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
        </Box>
    )
}
