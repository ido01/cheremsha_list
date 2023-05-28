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
import { MobileQuizView } from 'app/modules/Quiz/components/MobileQuizView'
import { QuizDateRow } from 'app/modules/Quiz/components/QuizDateRow'
import { QuizNameRow } from 'app/modules/Quiz/components/QuizNameRow'
import { QuizStatusRow } from 'app/modules/Quiz/components/QuizStatusRow'
import { quizActions } from 'app/modules/Quiz/slice'
import { selectQuiz, selectSearchQuiz, selectStatus } from 'app/modules/Quiz/slice/selectors'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { EState, EStatus, EType } from 'types'
import { ICategory } from 'types/ICategory'
import { IQuiz } from 'types/IQuiz'
import { TTableOrder, TTableRowData } from 'types/ITable'

import { categoriesActions } from '../slice'

interface CategoriesQuizListProps {
    type: EType
    search?: string
}

export const CategoriesQuizList: React.FC<CategoriesQuizListProps> = ({ type, search }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams<{ id?: string }>()

    const status = useSelector(selectStatus)
    const categoryStatus = useSelector(selectCategoryStatus)
    const getCategories = useSelector(selectCategories)
    const searchCategories = useSelector(selectSearchCategories)
    const getQuiz = useSelector(selectQuiz)
    const searchQuiz = useSelector(selectSearchQuiz)
    const order = useSelector(selectOrder)

    const categories = !search ? getCategories(id || '0', type) : searchCategories(search, type)
    const quiz = !search ? getQuiz(id || '0') : searchQuiz(search, type)

    const stateSort: EState[] = [EState.REJECTED, EState.PENDING, EState.INITIAL, EState.COMPLETED]
    const items = [...categories, ...quiz].sort((a, b) => {
        if (order.row === 'status') {
            if (order.order === 'desc') {
                if (a.type === 'category' && b.type === 'quiz') return -1
                if (b.type === 'category' && a.type === 'quiz') return 1
                if (stateSort.indexOf(a.state.state) < stateSort.indexOf(b.state.state)) return -1
                return 1
            } else {
                if (a.type === 'category' && b.type === 'quiz') return 1
                if (b.type === 'category' && a.type === 'quiz') return -1
                if (stateSort.indexOf(a.state.state) > stateSort.indexOf(b.state.state)) return -1
                return 1
            }
        } else if (order.row === 'createdAt') {
            if (order.order === 'desc') {
                if (a.type === 'category' && b.type === 'quiz') return -1
                if (b.type === 'category' && a.type === 'quiz') return 1
                if (moment(a.createdAt).unix() > moment(b.createdAt).unix()) return -1
                return 1
            } else {
                if (a.type === 'category' && b.type === 'quiz') return 1
                if (b.type === 'category' && a.type === 'quiz') return -1
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
            element: (item: ICategory | IQuiz) => (
                <>
                    {item.type === 'category' && <CategoryNameRow item={item} />}

                    {item.type === 'quiz' && <QuizNameRow item={item} />}
                </>
            ),
        },
        {
            title: 'Дата создания',
            name: 'createdAt',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IQuiz) => (
                <>
                    {item.type === 'quiz' && <QuizDateRow item={item} />}

                    {item.type === 'category' && <CategoryDateRow item={item} />}
                </>
            ),
        },
        {
            title: 'Статус',
            name: 'status',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IQuiz) => <>{item.type === 'quiz' && <QuizStatusRow item={item} />}</>,
        },
    ]

    const mobileView = (item: ICategory | IQuiz) => (
        <>
            {item.type === 'category' && <MobileCategoryView item={item} />}

            {item.type === 'quiz' && <MobileQuizView item={item} />}
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

    const handleClickRow = (item: ICategory | IQuiz) => {
        item.type === 'category' && history.push(`/${type}/${item.id}`)

        if (item.type === 'quiz') {
            dispatch(quizActions.setActiveId(item.id))
            dispatch(quizActions.showModal())
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
