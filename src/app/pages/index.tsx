import { DocumentsList } from 'app/modules/Documents/templates/DocumentsList'
import { Layout } from 'app/modules/Layout/templates/Layout'
import { Quiz } from 'app/modules/Layout/templates/Quiz'
import { QuizView } from 'app/modules/Quiz/templates/QuizView'
import { PeoplesList } from 'app/modules/Users/templates/PeoplesList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ActionsPages } from './ActionsPages'
import { AuthPages } from './AuthPages'
import { ContactsPage } from './ContactsPage'
import { EventsPages } from './EventsPage'
import { FaqPages } from './FaqPages'
import { MainPage } from './MainPage'
import { MotivationPages } from './MotivationPages'
import { ProfilePages } from './ProfilePages'
import { QuizPages } from './QuizPages'
import { SchoolPages } from './SchoolPages'
import { UsersPages } from './UsersPages'

export const Pages: React.FC = () => (
    <Switch>
        <Route exact path={['/auth', '/auth/*']} component={AuthPages} />
        <Route exact path={['/test']}>
            <Quiz>
                <Switch>
                    <Route exact path={'/test'} component={QuizView} />
                </Switch>
            </Quiz>
        </Route>
        <Route exact path={['/', '/*']}>
            <Layout>
                <Switch>
                    <Route exact path={['/', '/profile', '/profile/*']} component={ProfilePages} />
                    <Route exact path={['/faq', '/faq/*']} component={FaqPages} />
                    <Route exact path={['/school', '/school/*']} component={SchoolPages} />
                    <Route exact path={['/motivation', '/motivation/*']} component={MotivationPages} />
                    <Route exact path={['/quiz', '/quiz/*']} component={QuizPages} />
                    <Route exact path={['/actions', '/actions/*']} component={ActionsPages} />
                    <Route exact path={['/contacts']} component={ContactsPage} />
                    <Route exact path={['/users', '/users/*']} component={UsersPages} />
                    <Route exact path={['/events', '/events/*']} component={EventsPages} />
                    <Route exact path={['/doc']} component={DocumentsList} />
                    <Route exact path={['/peoples']} component={PeoplesList} />

                    <Route exact path={['/*']} component={MainPage} />
                </Switch>
            </Layout>
        </Route>
    </Switch>
)
