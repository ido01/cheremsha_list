import Table from 'app/components/Table'
import { CategoryDateRow } from 'app/modules/Categories/components/CategoryDateRow'
import { CategoryNameRow } from 'app/modules/Categories/components/CategoryNameRow'
import { MobileCategoryView } from 'app/modules/Categories/components/MobileCategoryView'
import {
    selectCategories,
    selectOrder,
    selectSearchCategories,
    selectStatus as selectCategoryStatus,
} from 'app/modules/Categories/slice/selectors'
import { DocumentDateRow } from 'app/modules/Documents/components/DocumentDateRow'
import { DocumentNameRow } from 'app/modules/Documents/components/DocumentNameRow'
import { DocumentStatusRow } from 'app/modules/Documents/components/DocumentStatusRow'
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

export const CategoriesList: React.FC<CategoriesListProps> = ({ type, search }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams<{ id?: string }>()

    const status = useSelector(selectStatus)
    const categoryStatus = useSelector(selectCategoryStatus)
    const getCategories = useSelector(selectCategories)
    const searchCategories = useSelector(selectSearchCategories)
    const getDocuments = useSelector(selectDocuments)
    const searchDocuments = useSelector(selectSearchDocuments)
    const order = useSelector(selectOrder)

    const categories = !search ? getCategories(id || '0', type) : searchCategories(search, type)
    const documents = !search ? getDocuments(id || '0', type) : searchDocuments(search, type)

    const stateSort: EState[] = [EState.REJECTED, EState.PENDING, EState.INITIAL, EState.COMPLETED]
    const items = [...categories, ...documents].sort((a, b) => {
        if (order.row === 'status') {
            if (order.order === 'desc') {
                if (a.type === 'category' && b.type === 'document') return -1
                if (b.type === 'category' && a.type === 'document') return 1
                if (stateSort.indexOf(a.state.state) < stateSort.indexOf(b.state.state)) return -1
                return 1
            } else {
                if (a.type === 'category' && b.type === 'document') return 1
                if (b.type === 'category' && a.type === 'document') return -1
                if (stateSort.indexOf(a.state.state) > stateSort.indexOf(b.state.state)) return -1
                return 1
            }
        } else if (order.row === 'createdAt') {
            if (order.order === 'desc') {
                if (a.type === 'category' && b.type === 'document') return -1
                if (b.type === 'category' && a.type === 'document') return 1
                if (moment(a.createdAt).unix() > moment(b.createdAt).unix()) return -1
                return 1
            } else {
                if (a.type === 'category' && b.type === 'document') return 1
                if (b.type === 'category' && a.type === 'document') return -1
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
            element: (item: ICategory | IDocument) => (
                <>
                    {item.type === 'category' && <CategoryNameRow item={item} />}

                    {item.type === 'document' && <DocumentNameRow item={item} />}
                </>
            ),
        },
        {
            title: 'Дата создания',
            name: 'createdAt',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IDocument) => (
                <>
                    {item.type === 'document' && <DocumentDateRow item={item} />}

                    {item.type === 'category' && <CategoryDateRow item={item} />}
                </>
            ),
        },
        {
            title: 'Статус',
            name: 'status',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IDocument) => (
                <>{item.type === 'document' && <DocumentStatusRow item={item} />}</>
            ),
        },
    ]

    const mobileView = (item: ICategory | IDocument) => (
        <>
            {item.type === 'category' && <MobileCategoryView item={item} />}

            {item.type === 'document' && <MobileDocumentView item={item} />}
        </>
    )

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
