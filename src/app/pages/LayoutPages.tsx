import { AchieveList } from 'app/modules/Achieve/templates/AchieveList'
import { AdminList } from 'app/modules/Admin/templates/AdminList'
import { DocumentsCategoriesList } from 'app/modules/Documents/templates/DocumentsCategoriesList'
import { DocumentsList } from 'app/modules/Documents/templates/DocumentsList'
import { GameList } from 'app/modules/Game/templates/GameList'
import { HomeList } from 'app/modules/Home/HomeList'
import { Layout } from 'app/modules/Layout/templates/Layout'
import { LocationsList } from 'app/modules/Locations/templates/LocationsList'
import { PositionsList } from 'app/modules/Positions/templates/PositionsList'
import { ReviewsList } from 'app/modules/Reviews/templates/ReviewsList'
import { TablesList } from 'app/modules/Tables/templates/TablesList'
import { PeoplesList } from 'app/modules/Users/templates/PeoplesList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ContactsPage } from './ContactsPage'
import { EventsPages } from './EventsPage'
import { MainPage } from './MainPage'
import { ProfilePages } from './ProfilePages'
import { QuizPages } from './QuizPages'
import { TasksPages } from './TasksPages'
import { UsersPages } from './UsersPages'

export const LayoutPages: React.FC = () => (
    <Layout>
        <Routes>
            <Route path={'/'} element={<HomeList />} />
            <Route path={'/profile/*'} element={<ProfilePages />} />
            <Route path={'/admin'} element={<AdminList />} />
            <Route path={'/positions'} element={<PositionsList />} />
            <Route path={'/reviews'} element={<ReviewsList />} />
            <Route path={'/locations'} element={<LocationsList />} />
            <Route path={'/achieve'} element={<AchieveList />} />
            <Route path={'/tables'} element={<TablesList />} />
            <Route path={'/tasks/*'} element={<TasksPages />} />
            <Route path={'/quiz/*'} element={<QuizPages />} />
            <Route path={'/contacts/*'} element={<ContactsPage />} />
            <Route path={'/users/*'} element={<UsersPages />} />
            <Route path={'/events/*'} element={<EventsPages />} />
            <Route path={'/doc'} element={<DocumentsList />} />
            <Route path={'/doc/:id'} element={<DocumentsCategoriesList />} />
            <Route path={'/peoples'} element={<PeoplesList />} />
            <Route path={'/games'} element={<GameList />} />

            <Route path={'/*'} element={<MainPage />} />
        </Routes>
    </Layout>
)
