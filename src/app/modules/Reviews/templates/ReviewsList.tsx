import {
    AddCircleOutline as AddCircleOutlineIcon,
    ExpandMore as ExpandMoreIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import {
    AccordionDetails,
    AccordionSummary,
    Badge,
    Box,
    CircularProgress,
    FormControl,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Tab,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import { styled } from '@mui/material/styles'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfile, selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EState, EStatus } from 'types'
import { IReview } from 'types/IReview'
import { checkSudoAccess } from 'utils/roles'

import { Comment } from '../components/Comment'
import { CommentView } from '../components/CommentView'
import { Control } from '../components/Control'
import { FormModal } from '../components/FormModal'
import { MyControl } from '../components/MyControl'
import { getStatusLabel, ReviewHeader } from '../components/ReviewHeader'
import { reviewsActions } from '../slice'
import { selectFilter, selectPagination, selectReviews, selectStatus } from '../slice/selectors'

const Accordion = styled((props: AccordionProps) => <MuiAccordion square {...props} />)({
    borderRadius: 8,
    bgcolor: '#FDFDFD',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    },
})

export const ReviewsList: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)
    const propfile = useSelector(selectProfile)
    const status = useSelector(selectStatus)
    const reviews = useSelector(selectReviews)
    const filter = useSelector(selectFilter)
    const pagination = useSelector(selectPagination)

    const handleAdd = () => {
        dispatch(
            reviewsActions.openEditModal({
                id: '',
                anon: false,
                uid: '',
                type: 'revision',
                title: '',
                description: '',
                status: EState.INITIAL,
                createdAt: 0,
                created: '',
                updatedAt: 0,
                updated: '',
                parentId: '0',
                comment: [],
                likes: 0,
                like: false,
            })
        )
    }

    const handleLike = (review: IReview) => {
        dispatch(reviewsActions.likeReview(review.id))
    }

    useEffect(() => {
        dispatch(reviewsActions.cleanReviews())
        dispatch(reviewsActions.loadReviews())
    }, [filter])

    const handlePageChange = (page: number) => {
        dispatch(reviewsActions.setPage(page))
        dispatch(reviewsActions.loadReviews())
    }

    const handleChange = (event: React.SyntheticEvent, newValue: 'all' | 'my') => {
        dispatch(
            reviewsActions.setFilter({
                ...filter,
                author: newValue,
            })
        )
    }

    return (
        <Main
            title={'Отзывы и Предложения'}
            searchDisabled
            endNode={
                <IconButton color="success" onClick={handleAdd}>
                    <AddCircleOutlineIcon />
                </IconButton>
            }
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TabContext value={filter.author}>
                    <TabList onChange={handleChange}>
                        <Tab label="Все" value="all" sx={{ px: 3 }} />
                        <Tab label="Мои" value="my" sx={{ px: 3 }} />
                    </TabList>
                </TabContext>

                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <FormControl sx={{ width: '200px' }} variant="standard">
                            <Select
                                value={filter.status}
                                label="Статус"
                                onChange={(e) => {
                                    const { value } = e.target

                                    dispatch(
                                        reviewsActions.setFilter({
                                            ...filter,
                                            status: value as EStatus | 'all',
                                        })
                                    )
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: 'all',
                                    },
                                    {
                                        label: getStatusLabel(EState.INITIAL),
                                        value: EState.INITIAL,
                                    },
                                    {
                                        label: getStatusLabel(EState.OPEN),
                                        value: EState.OPEN,
                                    },
                                    {
                                        label: getStatusLabel(EState.PENDING),
                                        value: EState.PENDING,
                                    },
                                    {
                                        label: getStatusLabel(EState.COMPLETED),
                                        value: EState.COMPLETED,
                                    },
                                    {
                                        label: getStatusLabel(EState.CLOSED),
                                        value: EState.CLOSED,
                                    },
                                    {
                                        label: getStatusLabel(EState.REJECTED),
                                        value: EState.REJECTED,
                                    },
                                ].map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    pt: 2,
                }}
            >
                {status === EStatus.PENDING && (
                    <Box mt={4.25} display={'flex'} justifyContent={'center'}>
                        <CircularProgress />
                    </Box>
                )}
                {status !== EStatus.PENDING &&
                    reviews.map((review) => {
                        return (
                            <Accordion
                                key={review.id}
                                sx={{
                                    mb: 1,
                                    borderRadius: 8,
                                    bgcolor: '#FDFDFD',
                                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
                                    '&:hover': {
                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                                    },
                                    ':before': {
                                        display: 'none',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <ReviewHeader review={review} />
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        pt: 0,
                                        m: 0,
                                        position: 'relative',
                                        minHeight: '96px',
                                    }}
                                >
                                    {checkSudoAccess(profileRole) && <Control review={review} />}
                                    {!checkSudoAccess(profileRole) && review.uid === propfile.id && (
                                        <MyControl review={review} />
                                    )}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            ml: isMobile ? '54px' : '86px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 1,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography variant="caption">Описание</Typography>
                                                <Typography variant="body1">{review.description}</Typography>
                                            </Box>

                                            <IconButton
                                                color="error"
                                                sx={{
                                                    flexShrink: 0,
                                                    flexGrow: 0,
                                                    height: '44px',
                                                }}
                                                onClick={() => handleLike(review)}
                                            >
                                                {review.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                                <Badge
                                                    badgeContent={review.likes}
                                                    color="primary"
                                                    overlap="circular"
                                                    sx={{
                                                        top: '-10px',
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>

                                        {review.comment.length > 0 && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                }}
                                            >
                                                {review.comment.map((comment, index) => (
                                                    <CommentView key={`comment_${index}`} review={comment} />
                                                ))}
                                            </Box>
                                        )}

                                        {checkSudoAccess(profileRole) && (
                                            <Comment
                                                review={{
                                                    ...review,
                                                    id: '',
                                                    anon: false,
                                                    description: '',
                                                    parentId: review.id,
                                                }}
                                            />
                                        )}
                                        {!checkSudoAccess(profileRole) &&
                                            review.uid === propfile.id &&
                                            review.status !== EState.REJECTED &&
                                            review.status !== EState.COMPLETED &&
                                            review.status !== EState.CLOSED && (
                                                <Comment
                                                    review={{
                                                        ...review,
                                                        id: '',
                                                        anon: false,
                                                        description: '',
                                                        parentId: review.id,
                                                    }}
                                                />
                                            )}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}

                <Box
                    sx={{
                        pt: 2,
                        pb: 4,
                    }}
                >
                    {pagination.total_pages > 1 && (
                        <Pagination
                            count={pagination.total_pages}
                            page={pagination.page}
                            shape="rounded"
                            onChange={(_, value) => handlePageChange?.(value)}
                        />
                    )}
                </Box>
            </Box>

            <FormModal />
        </Main>
    )
}
