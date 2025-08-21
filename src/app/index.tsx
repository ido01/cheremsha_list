import 'dayjs/locale/ru'
import 'react-toastify/dist/ReactToastify.min.css'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { locationsActions } from 'app/modules/Locations/slice'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PROJECT_NAME } from './constants'
import { Pages } from './pages'

export const App: React.FC = () => {
    const dispatch = useDispatch()
    const settings = useSelector(selectSettings)

    useEffect(() => {
        if (settings.project) {
            dispatch(locationsActions.loadLocations(settings.project))
        }
    }, [settings])

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
