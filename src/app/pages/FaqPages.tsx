import { FaqCategoriesPage } from 'app/modules/Faq/templates/FaqCategoriesPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const FaqPages: React.FC = () => (
    <Switch>
        <Route exact path={['/faq', '/faq/:id']} component={FaqCategoriesPage} />
    </Switch>
)
