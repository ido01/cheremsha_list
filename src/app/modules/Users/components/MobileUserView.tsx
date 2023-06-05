import { Box, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import { selectLocation } from 'app/modules/Locations/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { useSelector } from 'react-redux'
import { IUser } from 'types/IUser'

interface MobileUserViewProps {
    user: IUser
}

export const MobileUserView: React.FC<MobileUserViewProps> = ({ user }) => {
    const getLocation = useSelector(selectLocation)
    return (
        <Box px={2} pt={2} width={'100%'}>
            <Box>
                <Box display={'flex'}>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.thumb} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>

                        <Typography variant="body3" color="grey.800">
                            <a href={`tel:${user.phone}`}>{user.phone}</a>
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Точка
                    </Typography>

                    <>
                        {!!user.place_id && (
                            <Typography variant="body2" color="grey.600" lineHeight="1.4">
                                {getLocation(user.place_id)}
                            </Typography>
                        )}

                        {!user.place_id && <TableEmptyRow />}
                    </>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Статус
                    </Typography>

                    <Typography
                        variant="body2"
                        lineHeight="1.4"
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
                </Box>
            </Box>
        </Box>
    )
}
