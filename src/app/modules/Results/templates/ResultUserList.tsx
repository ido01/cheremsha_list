import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { EState } from 'types'
import { IQuiz, IQuizResponse } from 'types/IQuiz'
import { EQuizState, IQuizState } from 'types/IQuizState'
import { TTableRowData } from 'types/ITable'
import { IUser } from 'types/IUser'
import { convertQuizState, convertResultState } from 'utils/convertUtils'
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
                            !item.state ||
                            item.state.state === EQuizState.INITIAL ||
                            item.state.state === EQuizState.REJECTED ||
                            item.state.state === EQuizState.PENDING
                                ? theme.palette.primary.main
                                : item.state.state === EQuizState.DONE
                                ? theme.palette.warning.main
                                : item.state.state === EQuizState.COMPLETED
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                    })}
                >
                    {convertResultState(item.state?.state || EQuizState.INITIAL)}
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
        dispatch(
            resultsActions.loadResult({
                id: quiz.id,
                uid: user.id,
            })
        )
        setActiveQuiz(quiz)
        setActiveUserQuiz({
            ...user,
            quiz: quiz.state,
        })
    }

    const handleHistoryBack = () => {
        setActiveQuiz(undefined)
        setActiveUserQuiz(undefined)
    }

    const handleQuizStateChange = (state: IQuizState) => {
        setItems((quiz) =>
            quiz.map((item) => {
                if (item.id === state.qid) {
                    return {
                        ...item,
                        state,
                    }
                }
                return item
            })
        )
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

                    <ResultModalContent
                        id={activeQuiz.id}
                        user={activeUserQuiz}
                        onQuizStateChange={handleQuizStateChange}
                    />
                </>
            )}
        </Box>
    )
}
