import { MotivationList } from 'app/modules/Motivation/templates/MotivationList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const MotivationPages: React.FC = () => (
    <Switch>
        <Route exact path={['/motivation', '/motivation/:id']} component={MotivationList} />
    </Switch>
)
