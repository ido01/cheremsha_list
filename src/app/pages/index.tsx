import { Game } from 'app/modules/Layout/templates/Game'
import { List } from 'app/modules/List/templates/List'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthPages } from './AuthPages'

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
    </Routes>
)
