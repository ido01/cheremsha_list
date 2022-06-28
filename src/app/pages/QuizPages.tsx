import { QuizList } from 'app/modules/Quiz/templates/QuizList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const QuizPages: React.FC = () => (
    <Switch>
        <Route exact path={['/quiz', '/quiz/:id']} component={QuizList} />
    </Switch>
)
