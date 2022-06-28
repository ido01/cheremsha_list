import { Layout } from 'app/modules/Layout/templates/Layout'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ERole } from 'types'

import { AuthPages } from './AuthPages'
import { FaqPages } from './FaqPages'
import { MainPage } from './MainPage'
import { MotivationPages } from './MotivationPages'
import { ProfilePages } from './ProfilePages'
import { QuizPages } from './QuizPages'
import { SchoolPages } from './SchoolPages'
import { UsersPages } from './UsersPages'

export const Pages: React.FC = () => {
    const profileRole = useSelector(selectProfileRole)

    return (
        <>
            <Switch>
                <Route exact path={['/auth', '/auth/*']} component={AuthPages} />
                <Route exact path={['/', '/*']}>
                    <Layout>
                        <Switch>
                            <Route exact path={['/', '/profile', '/profile/*']} component={ProfilePages} />
                            <Route exact path={['/faq', '/faq/*']} component={FaqPages} />
                            <Route exact path={['/school', '/school/*']} component={SchoolPages} />
                            <Route exact path={['/motivation', '/motivation/*']} component={MotivationPages} />
                            <Route exact path={['/quiz', '/quiz/*']} component={QuizPages} />
                            <Route exact path={['/users', '/users/*']} component={UsersPages} />

                            <Route exact path={['/*']} component={MainPage} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </>
    )
}
