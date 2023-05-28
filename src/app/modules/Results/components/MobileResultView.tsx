import { Box, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import { selectLocation } from 'app/modules/Locations/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { useSelector } from 'react-redux'
import { EState } from 'types'
import { IUser } from 'types/IUser'

interface MobileUserViewProps {
    user: IUser
}

export const MobileResultView: React.FC<MobileUserViewProps> = ({ user }) => {
    const getLocation = useSelector(selectLocation)

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
                </Box>
            </Box>
        </Box>
    )
}
