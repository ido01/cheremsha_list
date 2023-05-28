import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table, { TableEmptyRow } from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectLocation } from 'app/modules/Locations/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITable'
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
        <>
            <TitleBlock
                title={'Сотрудники'}
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
                        usersActions.setFilter({
                            ...filter,
                            query,
                        })
                    )
                }}
            />

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
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
            </Box>

            <UserModal />
        </>
    )
}
