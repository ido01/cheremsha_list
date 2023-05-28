import { useMediaQuery, useTheme } from '@mui/material'
import { EventsList } from 'app/modules/Events/templates/EventsList'
import { EventsListMobile } from 'app/modules/Events/templates/EventsListMobile'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const EventsPages: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Switch>
            <Route exact path={['/events', '/events/:id']} component={isMobile ? EventsListMobile : EventsList} />
        </Switch>
    )
}
