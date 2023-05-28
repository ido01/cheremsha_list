import { ActionsList } from 'app/modules/Actions/templates/ActionsList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const ActionsPages: React.FC = () => (
    <Switch>
        <Route exact path={['/actions', '/actions/:id']} component={ActionsList} />
    </Switch>
)
