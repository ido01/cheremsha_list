import { ProfileView } from 'app/modules/Profile/templates/ProfileView'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const ProfilePages: React.FC = () => (
    <Switch>
        <Route exact path={['/', '/profile']} component={ProfileView} />
    </Switch>
)
