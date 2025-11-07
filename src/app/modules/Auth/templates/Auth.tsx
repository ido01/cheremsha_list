import { profileActions } from 'app/modules/Profile/slice'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { EAuthStatus } from 'types'
import { EQuizState } from 'types/IQuizState'

import { selectAuthStatus } from '../slice/selectors'

interface AuthProps {
    children: React.ReactNode
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
    const dispatch = useDispatch()
    const { pathname: url } = useLocation()

    const authStatus = useSelector(selectAuthStatus)
    const profile = useSelector(selectProfile)

    useEffect(() => {
        if (
            authStatus === EAuthStatus.NOT_AUTHORIZED &&
            (url.indexOf('/auth') !== 0 || url === '/auth/questionnaire')
        ) {
            location.href = '/auth'
        } else if (authStatus === EAuthStatus.AUTHORIZED && url.indexOf('/auth') === 0) {
            location.href = '/'
        } else if (authStatus === EAuthStatus.NEW && url !== '/auth/questionnaire') {
            dispatch(profileActions.loadProfile())
            location.href = '/auth/questionnaire'
        }
        if (authStatus === EAuthStatus.AUTHORIZED) {
            dispatch(profileActions.loadProfile())
        }
    }, [authStatus])

    useEffect(() => {
        if (authStatus === EAuthStatus.AUTHORIZED) {
            if (profile.state?.state === EQuizState.PENDING && url !== '/test') {
                location.href = '/test'
            } else if (profile.state?.state !== EQuizState.PENDING && url === '/test') {
                location.href = '/'
            }
        }
    }, [profile])

    return <React.Fragment>{children}</React.Fragment>
}
