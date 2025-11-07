import 'dayjs/locale/ru'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PROJECT_NAME } from './constants'
import { Pages } from './pages'

export const App: React.FC = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <BrowserRouter>
                <Helmet titleTemplate={`%s - ${PROJECT_NAME}`} defaultTitle={PROJECT_NAME} />

                <Pages />
            </BrowserRouter>

            <ToastContainer />
        </LocalizationProvider>
    )
}
