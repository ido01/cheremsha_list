import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { EState } from 'types'
import { IQuiz, IQuizResponse } from 'types/IQuiz'
import { TTableRowData } from 'types/ITable'
import { IUser } from 'types/IUser'
import { request } from 'utils/request'

import { ResultModalContent } from '../components/ResultModalContent'
import { resultsActions } from '../slice'

interface ResultUserListProps {
    user: IUser
}

export const ResultUserList: React.FC<ResultUserListProps> = ({ user }) => {
    const dispatch = useDispatch()

    const [items, setItems] = useState<IQuiz[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [activeUserQuiz, setActiveUserQuiz] = useState<IUser>()
    const [activeQuiz, setActiveQuiz] = useState<IQuiz>()

    const stateToText = (state: EState) => {
        switch (state) {
            case EState.INITIAL:
                return 'Не пройден'
            case EState.PENDING:
                return 'В процессе'
            case EState.COMPLETED:
                return 'Выполнен'
            case EState.CLOSED:
                return 'Провален'
            case EState.REJECTED:
                return 'Отменен'
        }
    }

    const loadQuiz = () => {
        request(`results/list/${user.id}`).then((response: IQuizResponse) => {
            setItems(response.data)
            setLoading(false)
        })
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Тест',
            name: 'name',
            xs: 8,
            element: (item: IQuiz) => <Typography variant="body2">{item.name}</Typography>,
        },
        {
            title: 'Результат',
            name: 'old_value',
            xs: 4,
            element: (item: IQuiz) => (
                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        color:
                            !item.state || item.state.state === EState.INITIAL || item.state.state === EState.REJECTED
                                ? theme.palette.primary.main
                                : item.state.state === EState.PENDING
                                ? theme.palette.warning.main
                                : item.state.state === EState.COMPLETED
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                    })}
                >
                    {stateToText(item.state?.state || EState.INITIAL)}
                </Typography>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true)
        setItems([])
        loadQuiz()
    }, [user.id])

    const handleClick = (quiz: IQuiz) => {
        setActiveQuiz(quiz)
        setActiveUserQuiz({
            ...user,
            quiz: quiz.state,
        })
        dispatch(resultsActions.loadResult({ id: quiz.id, uid: user.id }))
    }

    const handleHistoryBack = () => {
        setActiveQuiz(undefined)
        setActiveUserQuiz(undefined)
    }

    return (
        <Box pt={4}>
            {(!activeUserQuiz || !activeQuiz) && (
                <Table
                    disablePadding
                    items={items}
                    rows={tableRows}
                    isLoading={isLoading}
                    handleClickRow={handleClick}
                />
            )}
            {activeUserQuiz && activeQuiz && (
                <>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton color="primary" onClick={handleHistoryBack}>
                            <ArrowBackIcon />
                        </IconButton>

                        <Typography variant="h4">{activeQuiz.name}</Typography>
                    </Box>

                    <ResultModalContent id={activeQuiz.id} user={activeUserQuiz} />
                </>
            )}
        </Box>
    )
}
