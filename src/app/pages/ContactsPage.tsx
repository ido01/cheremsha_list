import { ContactsList } from 'app/modules/Users/templates/ContactsList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const ContactsPage: React.FC = () => (
    <Switch>
        <Route exact path={['/contacts']} component={ContactsList} />
    </Switch>
)
