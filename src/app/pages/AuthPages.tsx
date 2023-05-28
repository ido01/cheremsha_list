import { ActiveToken } from 'app/modules/Auth/templates/ActiveToken'
import { ConfirmRecovery } from 'app/modules/Auth/templates/ConfirmRecovery'
import { Questionnaire } from 'app/modules/Auth/templates/Questionnaire'
import { Recovery } from 'app/modules/Auth/templates/Recovery'
import { SignIn } from 'app/modules/Auth/templates/SignIn'
import { Signup } from 'app/modules/Auth/templates/Signup'
import { Empty } from 'app/modules/Layout/templates/Empty'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { MainPage } from './MainPage'

export const AuthPages: React.FC = () => (
    <Switch>
        <Route exact path={'/auth'} component={SignIn} />
        <Route exact path={'/auth/active'} component={ActiveToken} />
        <Route exact path={'/auth/recovery'} component={Recovery} />
        <Route exact path={'/auth/confirm_recovery'} component={ConfirmRecovery} />
        <Empty>
            <Route exact path={'/auth/signup'} component={Signup} />
            <Route exact path={'/auth/questionnaire'} component={Questionnaire} />
        </Empty>
        <Route exact path={['/*']} component={MainPage} />
    </Switch>
)
