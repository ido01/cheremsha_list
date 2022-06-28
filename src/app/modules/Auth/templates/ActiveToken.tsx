import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { authActions } from '../slice'
import { Auth } from './Auth'

export const ActiveToken: React.FC = () => {
    const dispatch = useDispatch()

    const search = useLocation().search
    const id = new URLSearchParams(search).get('id') || ''
    const token = new URLSearchParams(search).get('token') || ''

    useEffect(() => {
        dispatch(authActions.activeLogin({ id, token }))
    }, [id, token])

    return <Auth>{}</Auth>
}
