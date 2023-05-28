import 'dayjs/locale/ru'
import 'react-toastify/dist/ReactToastify.min.css'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { locationsActions } from 'app/modules/Locations'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PROJECT_NAME } from './constants'
import { Pages } from './pages'

export const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(locationsActions.loadLocations())
    }, [])

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
