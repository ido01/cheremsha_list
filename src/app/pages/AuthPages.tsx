import { ActiveToken } from 'app/modules/Auth/templates/ActiveToken'
import { ConfirmRecovery } from 'app/modules/Auth/templates/ConfirmRecovery'
import { Recovery } from 'app/modules/Auth/templates/Recovery'
import { SignIn } from 'app/modules/Auth/templates/SignIn'
import { Signup } from 'app/modules/Auth/templates/Signup'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { MainPage } from './MainPage'

export const AuthPages: React.FC = () => (
    <Switch>
        <Route exact path={'/auth'} component={SignIn} />
        <Route exact path={'/auth/signup'} component={Signup} />
        <Route exact path={'/auth/active'} component={ActiveToken} />
        <Route exact path={'/auth/recovery'} component={Recovery} />
        <Route exact path={'/auth/confirm_recovery'} component={ConfirmRecovery} />
        <Route exact path={['/*']} component={MainPage} />
    </Switch>
)
