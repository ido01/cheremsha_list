import { Box, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { useSelector } from 'react-redux'
import { EQuizState } from 'types/IQuizState'
import { IUser } from 'types/IUser'
import { convertResultState } from 'utils/convertUtils'

interface MobileUserViewProps {
    user: IUser
}

export const MobileResultView: React.FC<MobileUserViewProps> = ({ user }) => {
    const getLocation = useSelector(selectLocation)

    return (
        <Box px={2} pt={2} width={'100%'}>
            <Box>
                <Box display={'flex'}>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.thumb} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Точка
                    </Typography>

                    <>
                        {!!user.place_id && (
                            <Typography variant="body2" color="grey.600">
                                {getLocation(user.place_id)}
                            </Typography>
                        )}

                        {!user.place_id && <TableEmptyRow />}
                    </>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Статус
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={(theme) => ({
                            color:
                                !user.quiz ||
                                user.quiz.state === EQuizState.INITIAL ||
                                user.quiz.state === EQuizState.REJECTED ||
                                user.quiz.state === EQuizState.PENDING
                                    ? theme.palette.primary.main
                                    : user.quiz.state === EQuizState.DONE
                                    ? theme.palette.warning.main
                                    : user.quiz.state === EQuizState.COMPLETED
                                    ? theme.palette.success.main
                                    : theme.palette.error.main,
                        })}
                    >
                        {convertResultState(user.quiz?.state || EQuizState.INITIAL)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
