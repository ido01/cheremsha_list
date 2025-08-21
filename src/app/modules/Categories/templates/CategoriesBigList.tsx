import { Box } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import Table from 'app/components/Table'
import { selectOrder, selectStatus as selectCategoryStatus } from 'app/modules/Categories/slice/selectors'
import { DocumentBigAuthorRow } from 'app/modules/Documents/components/DocumentBigAuthorRow'
import { DocumentBigNameRow } from 'app/modules/Documents/components/DocumentBigNameRow'
import { DocumentBigStatusRow } from 'app/modules/Documents/components/DocumentBigStatusRow'
import { DocumentTaskPointStatus } from 'app/modules/Documents/components/DocumentTaskPointStatus'
import { DocumentTaskUserStatus } from 'app/modules/Documents/components/DocumentTaskUserStatus'
import { MobileDocumentView } from 'app/modules/Documents/components/MobileDocumentView'
import { documentsActions } from 'app/modules/Documents/slice'
import { selectDocuments, selectSearchDocuments, selectStatus } from 'app/modules/Documents/slice/selectors'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { EState, EStatus, EType } from 'types'
import { ICategory } from 'types/ICategory'
import { IDocument } from 'types/IDocument'
import { TTableOrder, TTableRowData } from 'types/ITableDisplay'

import { categoriesActions } from '../slice'

interface CategoriesListProps {
    type: EType
    search?: string
}

export const CategoriesBigList: React.FC<CategoriesListProps> = ({ type, search }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams<{ id?: string }>()

    const status = useSelector(selectStatus)
    const categoryStatus = useSelector(selectCategoryStatus)
    const getDocuments = useSelector(selectDocuments)
    const searchDocuments = useSelector(selectSearchDocuments)
    const order = useSelector(selectOrder)

    const documents = !search ? getDocuments(id || '0', type) : searchDocuments(search, type)

    const stateSort: EState[] = [EState.REJECTED, EState.PENDING, EState.INITIAL, EState.COMPLETED]
    const items = [...documents].sort((a, b) => {
        if (order.row === 'status') {
            if (order.order === 'desc') {
                if (stateSort.indexOf(a.state.state) < stateSort.indexOf(b.state.state)) return -1
                return 1
            } else {
                if (stateSort.indexOf(a.state.state) > stateSort.indexOf(b.state.state)) return -1
                return 1
            }
        } else if (order.row === 'createdAt') {
            if (order.order === 'desc') {
                if (moment(a.createdAt).unix() > moment(b.createdAt).unix()) return -1
                return 1
            } else {
                if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) return -1
                return 1
            }
        }
        return 1
    })

    const tableRows: TTableRowData[] = [
        {
            title: 'Название',
            name: 'name',
            xs: 6,
            element: (item: IDocument) => <DocumentBigNameRow item={item} />,
        },
        {
            title: 'Автор',
            name: 'author',
            xs: 6,
            element: (item: IDocument) => <DocumentBigAuthorRow item={item} />,
        },
        {
            title: 'Deadtime',
            name: 'deadTime',
            xs: 12,
            element: (item: IDocument) => (
                <Box mt={1} sx={{ display: 'flex', gap: 4 }}>
                    <Box>
                        <LabelText label="Срок выполнения" text={`До ${item.deadTime}`} variant="body2" />
                    </Box>
                    <Box>
                        <LabelText label="Ваш статус" node={<DocumentTaskUserStatus item={item} />} />
                    </Box>
                    <Box>
                        <LabelText label="Статус вашей точки" node={<DocumentTaskPointStatus item={item} />} />
                    </Box>
                </Box>
            ),
        },
        {
            title: 'Статус',
            name: 'author',
            xs: 12,
            element: (item: IDocument) => <DocumentBigStatusRow status={item.task_status} />,
        },
    ]

    const mobileView = (item: IDocument) => <MobileDocumentView item={item} />

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(categoriesActions.setOrder(order))
    }

    // const handlePageChange = (page: number) => {
    //     dispatch(officesActions.setPage(page))
    //     dispatch(officesActions.loadOffices())
    // }

    // const handleLimitChange = (limit: TLimit) => {
    //     dispatch(officesActions.setLimit(limit))
    //     dispatch(officesActions.loadOffices())
    // }

    const handleClickRow = (item: ICategory | IDocument) => {
        item.type === 'category' && history.push(`/${type}/${item.id}`)

        if (item.type === 'document') {
            dispatch(documentsActions.setActiveId(item.id))
            dispatch(documentsActions.showModal())
        }
    }

    return (
        <Table
            fullBorder
            disableHeader
            items={items}
            rows={tableRows}
            order={order}
            isLoading={status === EStatus.PENDING || categoryStatus === EStatus.PENDING}
            handleOrderChange={handleOrderChange}
            // handleLimitChange={handleLimitChange}
            // handlePageChange={handlePageChange}
            mobileView={mobileView}
            handleClickRow={handleClickRow}
        />
    )
}
