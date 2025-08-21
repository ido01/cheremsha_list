import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { selectLocations } from 'app/modules/Locations/slice/selectors'
import { selectPositions } from 'app/modules/Positions/slice/selectors'
import { resultsActions } from 'app/modules/Results/slice'
import { selectFilter } from 'app/modules/Results/slice/selectors'
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
                                resultsActions.setFilter({
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
        </Box>
    )
}
