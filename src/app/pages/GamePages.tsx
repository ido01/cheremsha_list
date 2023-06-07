import { FindColor } from 'app/modules/Game/templates/FindColor'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const GamePage: React.FC = () => (
    <Switch>
        <Route exact path={['/game/find_color']} component={FindColor} />
    </Switch>
)
