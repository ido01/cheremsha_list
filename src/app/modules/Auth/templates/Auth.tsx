import { profileActions } from 'app/modules/Profile/slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { EAuthStatus } from 'types'

import { selectAuthStatus } from '../slice/selectors'

interface AuthProps {
    children: React.ReactNode
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { url } = useRouteMatch()

    const authStatus = useSelector(selectAuthStatus)

    useEffect(() => {
        if (authStatus === EAuthStatus.NOT_AUTHORIZED && url !== '/auth' && url !== '/auth/signup') {
            history.push('/auth')
        } else if (authStatus === EAuthStatus.AUTHORIZED && (url === '/auth' || url === '/auth/active')) {
            history.push('/')
        }
        if (authStatus === EAuthStatus.AUTHORIZED) {
            dispatch(profileActions.loadProfile())
        }
    }, [authStatus])

    return <React.Fragment>{children}</React.Fragment>
}
