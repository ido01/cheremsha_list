import 'react-toastify/dist/ReactToastify.min.css'

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PROJECT_NAME } from './constants'
import { Pages } from './pages'

export const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Helmet titleTemplate={`%s - ${PROJECT_NAME}`} defaultTitle={PROJECT_NAME} />

                <Pages />
            </BrowserRouter>

            <ToastContainer />
        </>
    )
}
