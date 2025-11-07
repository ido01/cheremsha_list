import { ActiveToken } from 'app/modules/Auth/templates/ActiveToken'
import { ConfirmRecovery } from 'app/modules/Auth/templates/ConfirmRecovery'
import { Recovery } from 'app/modules/Auth/templates/Recovery'
import { SignIn } from 'app/modules/Auth/templates/SignIn'
import { Signup } from 'app/modules/Auth/templates/Signup'
import { Empty } from 'app/modules/Layout/templates/Empty'
import { Settings } from 'app/modules/Settings/templates/Settings'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainPage } from './MainPage'

export const AuthPages: React.FC = () => (
    <Settings>
        <Routes>
            <Route path={'/'} element={<SignIn />} />
            <Route path={'/active'} element={<ActiveToken />} />
            <Route path={'/recovery'} element={<Recovery />} />
            <Route path={'/confirm_recovery'} element={<ConfirmRecovery />} />
            <Route
                path={'/signup'}
                element={
                    <Empty>
                        <Signup />
                    </Empty>
                }
            />
            <Route path={'/*'} element={<MainPage />} />
        </Routes>
    </Settings>
)
