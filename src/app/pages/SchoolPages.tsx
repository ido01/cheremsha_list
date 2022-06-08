import { SchoolCategoriesPage } from 'app/modules/School/templates/SchoolCategoriesPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const SchoolPages: React.FC = () => (
    <Switch>
        <Route exact path={['/school', '/school/:id']} component={SchoolCategoriesPage} />
    </Switch>
)
