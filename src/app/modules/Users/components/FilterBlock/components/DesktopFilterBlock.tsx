import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { selectLocations } from 'app/modules/Locations/slice/selectors'
import { selectPositions } from 'app/modules/Positions/slice/selectors'
import { usersActions } from 'app/modules/Users/slice'
import { selectFilter } from 'app/modules/Users/slice/selectors'
import { TUserStatus } from 'app/modules/Users/slice/types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const DesktopFilterBlock: React.FC = () => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)
    const locations = useSelector(selectLocations)
    const positions = useSelector(selectPositions)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    return (
        <Box mb={4} px={4} display={'flex'} justifyContent={'flex-end'}>
            <Stack direction={'row'} spacing={2}>
                <FormControl sx={{ width: '200px' }} variant="standard">
                    <InputLabel>Должность</InputLabel>
                    <Select
                        value={filter.position_id}
                        label="Должность"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                usersActions.setFilter({
                                    ...filter,
                                    position_id: value,
                                })
                            )
                        }}
                    >
                        {[
                            {
                                id: '',
                                label: 'Все',
                            },
                            ...positions,
                        ].map((gender, index) => (
                            <MenuItem key={index} value={gender.id}>
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
