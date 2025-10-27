import { Game } from 'app/modules/Layout/templates/Game'
import { Quiz } from 'app/modules/Layout/templates/Quiz'
import { List } from 'app/modules/List/templates/List'
import { QuizView } from 'app/modules/Quiz/templates/QuizView'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthPages } from './AuthPages'
import { LayoutPages } from './LayoutPages'

export const Pages: React.FC = () => (
    <Routes>
        <Route path="/auth/*" element={<AuthPages />} />

        <Route
            path={'/list'}
            element={
                <Game>
                    <List />
                </Game>
            }
        />

        <Route
            path={'/test'}
            element={
                <Quiz>
                    <QuizView />
                </Quiz>
            }
        />

        <Route path={'/*'} element={<LayoutPages />} />
    </Routes>
)
