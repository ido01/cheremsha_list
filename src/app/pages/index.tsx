import { AdminList } from 'app/modules/Admin/templates/AdminList'
import { DocumentsList } from 'app/modules/Documents/templates/DocumentsList'
import { GameList } from 'app/modules/Game/templates/GameList'
import { HomeList } from 'app/modules/Home/HomeList'
import { Game } from 'app/modules/Layout/templates/Game'
import { Layout } from 'app/modules/Layout/templates/Layout'
import { Quiz } from 'app/modules/Layout/templates/Quiz'
import { List } from 'app/modules/List/templates/List'
import { PositionsList } from 'app/modules/Positions/templates/PositionsList'
import { QuizView } from 'app/modules/Quiz/templates/QuizView'
import { TablesList } from 'app/modules/Tables/templates/TablesList'
import { PeoplesList } from 'app/modules/Users/templates/PeoplesList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ActionsPages } from './ActionsPages'
import { AuthPages } from './AuthPages'
import { ContactsPage } from './ContactsPage'
import { EventsPages } from './EventsPage'
import { FaqPages } from './FaqPages'
import { GamePage } from './GamePages'
import { MainPage } from './MainPage'
import { MotivationPages } from './MotivationPages'
import { PollsPages } from './PollsPages'
import { ProfilePages } from './ProfilePages'
import { QuizPages } from './QuizPages'
import { SchoolPages } from './SchoolPages'
import { TasksPages } from './TasksPages'
import { UsersPages } from './UsersPages'

export const Pages: React.FC = () => (
    <Switch>
        <Route exact path={['/auth', '/auth/*']} component={AuthPages} />
        <Route exact path={['/game/*', '/list']}>
            <Game>
                <Switch>
                    <Route exact path={['/game/*']} component={GamePage} />
                    <Route exact path={['/list']} component={List} />
                </Switch>
            </Game>
        </Route>

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
                    <Route exact path={['/']} component={HomeList} />
                    <Route exact path={['/', '/profile', '/profile/*']} component={ProfilePages} />
                    <Route exact path={['/admin']} component={AdminList} />
                    <Route exact path={['/positions']} component={PositionsList} />
                    <Route exact path={['/tables']} component={TablesList} />
                    <Route exact path={['/faq', '/faq/*']} component={FaqPages} />
                    <Route exact path={['/tasks', '/tasks/*']} component={TasksPages} />
                    <Route exact path={['/school', '/school/*']} component={SchoolPages} />
                    <Route exact path={['/motivation', '/motivation/*']} component={MotivationPages} />
                    <Route exact path={['/quiz', '/quiz/*']} component={QuizPages} />
                    <Route exact path={['/actions', '/actions/*']} component={ActionsPages} />
                    <Route exact path={['/contacts']} component={ContactsPage} />
                    <Route exact path={['/users', '/users/*']} component={UsersPages} />
                    <Route exact path={['/events', '/events/*']} component={EventsPages} />
                    <Route exact path={['/polls', '/polls/*']} component={PollsPages} />
                    <Route exact path={['/doc']} component={DocumentsList} />
                    <Route exact path={['/peoples']} component={PeoplesList} />
                    <Route exact path={['/game']} component={GameList} />

                    <Route exact path={['/*']} component={MainPage} />
                </Switch>
            </Layout>
        </Route>
    </Switch>
)
