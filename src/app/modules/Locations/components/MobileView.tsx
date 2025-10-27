import { Box, Switch, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ILocation } from 'types/ILocation'
import { checkSudoAccess } from 'utils/roles'

import { locationsActions } from '../slice'

interface MobileViewProps {
    location: ILocation
}

export const MobileView: React.FC<MobileViewProps> = ({ location }) => {
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            locationsActions.changeLocation({
                ...location,
                visible: event.target.checked,
            })
        )
    }

    return (
        <Box px={2} width={'100%'} display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body1" fontWeight={600}>
                {location.name}
            </Typography>

            <Switch disabled={!checkSudoAccess(profileRole)} checked={location.visible} onChange={handleChange} />
        </Box>
    )
}
