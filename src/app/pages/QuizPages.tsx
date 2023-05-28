import { QuizList } from 'app/modules/Quiz/templates/QuizList'
import { ResultList } from 'app/modules/Results/templates/ResultList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const QuizPages: React.FC = () => (
    <Switch>
        <Route exact path={['/quiz', '/quiz/:id']} component={QuizList} />
        <Route exact path="/quiz/result/:id" component={ResultList} />
    </Switch>
)
