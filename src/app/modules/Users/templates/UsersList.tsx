import { Box, Typography } from '@mui/material'
import Table, { TableEmptyRow } from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITable'
import { IUser } from 'types/IUser'
import { convertPlaceName } from 'utils/convertUtils'

import { usersActions } from '../slice'
import { selectOrder, selectPagination, selectStatus, selectTotalCount, selectUsers } from '../slice/selectors'
import { UserModal } from './UserModal'

export const UsersList: React.FC = () => {
    const dispatch = useDispatch()

    const status = useSelector(selectStatus)
    const users = useSelector(selectUsers)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPagination)
    const count = useSelector(selectTotalCount)

    const tableRows: TTableRowData[] = [
        {
            title: 'Имя',
            name: 'firstname',
            xs: 5,
            element: (user: IUser) => (
                <>
                    <AvatarImage name={user.name} image={user.avatar?.url} size={'36px'} />

                    <Box ml={2}>
                        <Typography variant="body2">{user.name}</Typography>
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
                            {convertPlaceName(user.place_id)}
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
                    {moment(user.createdAt).format('L')}
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
                        color: user.blocked
                            ? theme.palette.error.main
                            : !user.active
                            ? theme.palette.success.main
                            : theme.palette.warning.main,
                    })}
                >
                    {user.blocked ? 'Заблокирован' : !user.active ? 'Новый' : 'Действующий'}
                </Typography>
            ),
        },
    ]

    useEffect(() => {
        dispatch(usersActions.cleanUsers())
        dispatch(usersActions.loadUsers())
    }, [])

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
        <>
            <TitleBlock title={'Сотрудники'} count={count} />

            <Box mt={4} flex="1 0 100%">
                <Table
                    items={users}
                    rows={tableRows}
                    order={order}
                    pagination={pagination}
                    isLoading={status === EStatus.PENDING}
                    handleOrderChange={handleOrderChange}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                    handleClickRow={handleClickRow}
                />
            </Box>

            <UserModal />
        </>
    )
}
