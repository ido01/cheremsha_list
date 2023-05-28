import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table, { TableEmptyRow } from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectLocation } from 'app/modules/Locations/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { quizActions } from 'app/modules/Quiz/slice/'
import { selectQuizById } from 'app/modules/Quiz/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EState, EStatus } from 'types'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITable'
import { IUser } from 'types/IUser'
import { convertPositionName } from 'utils/convertUtils'

import { FilterBlock } from '../components/FilterBlock'
import { MobileResultView } from '../components/MobileResultView'
import { resultsActions } from '../slice'
import {
    selectFilter,
    selectOrder,
    selectPagination,
    selectResults,
    selectStatus,
    selectTotalCount,
} from '../slice/selectors'
import { ResultModal } from './ResultModal'

export const ResultList: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id: string }>()

    const [isFilterOpen, setFilterOpen] = useState<boolean>(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const results = useSelector(selectResults)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPagination)
    const count = useSelector(selectTotalCount)
    const filter = useSelector(selectFilter)
    const getLocation = useSelector(selectLocation)
    const getQuiz = useSelector(selectQuizById)
    const quiz = getQuiz(id)

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

    const tableRows: TTableRowData[] = [
        {
            title: 'Имя',
            name: 'name',
            xs: 5,
            element: (user: IUser) => (
                <>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.thumb} size={'36px'} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </>
            ),
        },
        {
            title: 'Точка',
            name: 'place_id',
            xs: 2,
            element: (user: IUser) => (
                <>
                    {!!user.place_id && (
                        <Typography variant="body2" color="grey.600">
                            {getLocation(user.place_id)}
                        </Typography>
                    )}

                    {!user.place_id && <TableEmptyRow />}
                </>
            ),
        },
        {
            title: 'Должность',
            name: 'position',
            isSort: true,
            xs: 2,
            element: (user: IUser) => (
                <Typography variant="body2" color="grey.600">
                    {convertPositionName(user.position)}
                </Typography>
            ),
        },
        {
            title: 'Результат',
            name: 's.status',
            xs: 3,
            element: (user: IUser) => (
                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        color:
                            !user.quiz || user.quiz.state === EState.INITIAL || user.quiz.state === EState.REJECTED
                                ? theme.palette.primary.main
                                : user.quiz.state === EState.PENDING
                                ? theme.palette.warning.main
                                : user.quiz.state === EState.COMPLETED
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                    })}
                >
                    {stateToText(user.quiz?.state || EState.INITIAL)}
                </Typography>
            ),
        },
    ]

    const mobileView = (item: IUser) => <MobileResultView user={item} />

    useEffect(() => {
        if (id) {
            dispatch(quizActions.loadQuizById(id))
        }
    }, [id])

    useEffect(() => {
        dispatch(resultsActions.cleanResults())
        dispatch(resultsActions.loadResults(id))
    }, [filter])

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(resultsActions.setOrder(order))
        dispatch(resultsActions.loadResults(id))
    }

    const handlePageChange = (page: number) => {
        dispatch(resultsActions.setPage(page))
        dispatch(resultsActions.loadResults(id))
    }

    const handleLimitChange = (limit: TLimit) => {
        dispatch(resultsActions.setLimit(limit))
        dispatch(resultsActions.loadResults(id))
    }

    const handleClickRow = (user: IUser) => {
        dispatch(resultsActions.setActiveId(user.id))
        dispatch(resultsActions.showModal())
    }

    return (
        <>
            <TitleBlock
                title={quiz?.name || ''}
                count={count}
                value={filter.query}
                endNode={
                    isMobile ? (
                        <Button variant="text" onClick={() => setFilterOpen(true)} sx={{ textTransform: 'uppercase' }}>
                            <FilterAltIcon />
                        </Button>
                    ) : (
                        <></>
                    )
                }
                onSearch={(query) => {
                    dispatch(
                        resultsActions.setFilter({
                            ...filter,
                            query,
                        })
                    )
                }}
            />

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <FilterBlock open={isFilterOpen} onClose={() => setFilterOpen(false)} />

                <Table
                    items={results}
                    rows={tableRows}
                    order={order}
                    pagination={pagination}
                    isLoading={status === EStatus.PENDING}
                    mobileView={mobileView}
                    handleOrderChange={handleOrderChange}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                    handleClickRow={handleClickRow}
                />
            </Box>

            <ResultModal />
        </>
    )
}
