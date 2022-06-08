import { UserChange } from 'app/modules/Users/templates/UserChange'
import { UsersList } from 'app/modules/Users/templates/UsersList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const UsersPages: React.FC = () => (
    <Switch>
        <Route exact path={['/users']} component={UsersList} />
        <Route exact path={['/users/:id']} component={UserChange} />
    </Switch>
)
