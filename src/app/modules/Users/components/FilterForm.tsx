import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EPosition } from 'types'

import { usersActions } from '../slice'
import { selectFilter } from '../slice/selectors'
import { TUserStatus } from '../slice/types'

export const FilterForm: React.FC = () => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)

    return (
        <Box mb={1} px={4} display={'flex'} justifyContent={'flex-end'}>
            <Stack direction={'row'} spacing={2}>
                <FormControl sx={{ width: '200px' }} variant="standard">
                    <InputLabel>Должность</InputLabel>
                    <Select
                        value={filter.position}
                        label="Должность"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                usersActions.setFilter({
                                    ...filter,
                                    position: value as EPosition,
                                })
                            )
                        }}
                    >
                        {[
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
                                usersActions.setFilter({
                                    ...filter,
                                    place_id: value,
                                })
                            )
                        }}
                    >
                        {[
                            {
                                value: '1',
                                label: 'Академ',
                            },
                            {
                                value: '3',
                                label: 'Виктория',
                            },
                            {
                                value: '4',
                                label: 'Миасс',
                            },
                            {
                                value: '5',
                                label: 'Новотроицк',
                            },
                            {
                                value: '7',
                                label: 'Парковый',
                            },
                            {
                                value: '9',
                                label: 'Советский',
                            },
                            {
                                value: '10',
                                label: 'Теплотех',
                            },
                            {
                                value: '11',
                                label: 'Тополинка',
                            },
                            {
                                value: '13',
                                label: 'Центр',
                            },
                            {
                                value: '16',
                                label: 'Чмз',
                            },
                            {
                                value: '19',
                                label: 'Ленинский',
                            },
                            {
                                value: '20',
                                label: 'Чтз',
                            },
                            {
                                value: '21',
                                label: 'ТОРГОВЫЙ',
                            },
                            {
                                value: '22',
                                label: 'Александровский',
                            },
                            {
                                value: '26',
                                label: 'Пушкина',
                            },
                            {
                                value: '27',
                                label: 'Екат Академ',
                            },
                            {
                                value: '28',
                                label: 'Академический',
                            },
                            {
                                value: '30',
                                label: 'Ньютон',
                            },
                            {
                                value: '31',
                                label: 'Миасс Старый',
                            },
                            {
                                value: '32',
                                label: 'Миасс Новый',
                            },
                            {
                                value: '38',
                                label: 'Кашириных',
                            },
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
                        value={filter.status}
                        label="Статус"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                usersActions.setFilter({
                                    ...filter,
                                    status: value as TUserStatus,
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
                                label: 'Новые',
                                value: 'new',
                            },
                            {
                                label: 'Действующие',
                                value: 'active',
                            },
                            {
                                label: 'Заблокированные',
                                value: 'blocked',
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
