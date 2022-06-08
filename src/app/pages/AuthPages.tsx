import { ActiveToken } from 'app/modules/Auth/templates/ActiveToken'
import { SignIn } from 'app/modules/Auth/templates/SignIn'
import { Signup } from 'app/modules/Auth/templates/Signup'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const AuthPages: React.FC = () => (
    <Switch>
        <Route exact path={'/auth'} component={SignIn} />
        <Route exact path={'/auth/signup'} component={Signup} />
        <Route exact path={'/auth/active'} component={ActiveToken} />
    </Switch>
)
