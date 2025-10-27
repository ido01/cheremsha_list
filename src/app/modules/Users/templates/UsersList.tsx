import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table, { TableEmptyRow } from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'

import { FilterBlock } from '../components/FilterBlock'
import { MobileUserView } from '../components/MobileUserView'
import { usersActions } from '../slice'
import {
    selectFilter,
    selectOrder,
    selectPagination,
    selectStatus,
    selectTotalCount,
    selectUsers,
} from '../slice/selectors'
import { UserModal } from './UserModal'

export const UsersList: React.FC = () => {
    const dispatch = useDispatch()

    const [isFilterOpen, setFilterOpen] = useState<boolean>(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const users = useSelector(selectUsers)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPagination)
    const count = useSelector(selectTotalCount)
    const filter = useSelector(selectFilter)
    const getLocation = useSelector(selectLocation)

    const tableRows: TTableRowData[] = [
        {
            title: 'Имя',
            name: 'name',
            xs: 5,
            element: (user: IUser) => (
                <>
                    <AvatarImage
                        name={`${user.last_name} ${user.name}`}
                        image={user.avatar?.thumb}
                        size={36}
                        achieve={user.achieve}
                    />

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
            title: 'Дата регистрации',
            name: 'createdAt',
            isSort: true,
            xs: 2,
            element: (user: IUser) => (
                <Typography variant="body2" color="grey.600">
                    {dayjs(user.createdAt).locale('ru').format('D MMM YYYY')}
                </Typography>
            ),
        },
        {
            title: 'Статус',
            name: 'offices',
            xs: 3,
            element: (user: IUser) => (
                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        color: user.ban
                            ? theme.palette.error.main
                            : !user.active
                            ? theme.palette.success.main
                            : theme.palette.warning.main,
                    })}
                >
                    {user.ban ? 'Заблокирован' : !user.active ? 'Новый' : 'Действующий'}
                </Typography>
            ),
        },
    ]

    const mobileView = (item: IUser) => <MobileUserView user={item} />

    // useEffect(() => {
    //     dispatch(usersActions.cleanUsers())
    //     dispatch(usersActions.loadUsers())
    // }, [])

    useEffect(() => {
        dispatch(usersActions.cleanUsers())
        dispatch(usersActions.loadUsers())
        dispatch(usersActions.hideModal())
    }, [filter])

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(usersActions.setOrder(order))
        dispatch(usersActions.loadUsers())
    }

    const handlePageChange = (page: number) => {
        dispatch(usersActions.setPage(page))
        dispatch(usersActions.loadUsers())
    }

    const handleLimitChange = (limit: TLimit) => {
        dispatch(usersActions.setLimit(limit))
        dispatch(usersActions.loadUsers())
    }

    const handleClickRow = (user: IUser) => {
        dispatch(usersActions.setActiveId(user.id))
        dispatch(usersActions.showModal())
    }

    return (
        <Main
            title={'Сотрудники'}
            count={count}
            value={filter.query}
            endNode={
                isMobile ? (
                    <IconButton onClick={() => setFilterOpen(true)} sx={{ bgcolor: '#FDFDFD90' }}>
                        <FilterAltIcon />
                    </IconButton>
                ) : (
                    <></>
                )
            }
            onSearch={(query) => {
                dispatch(
                    usersActions.setFilter({
                        ...filter,
                        query,
                    })
                )
            }}
        >
            <Box
                sx={{
                    pb: 8,
                }}
            >
                <FilterBlock open={isFilterOpen} onClose={() => setFilterOpen(false)} />

                <Table
                    items={users}
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

                <UserModal />
            </Box>
        </Main>
    )
}
