import { Box, Grid, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { selectLocation } from 'app/modules/Locations/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { convertGenderName, convertPositionName } from 'utils/convertUtils'

import { selectProfile } from '../slice/selectors'

export const AccountData: React.FC = () => {
    const profile = useSelector(selectProfile)
    const getLocation = useSelector(selectLocation)

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h5" fontWeight={500}>
                    Личные данные
                </Typography>
            </Box>

            <Grid container rowSpacing={4} columnSpacing={2}>
                <Grid item xs={12} md={4}>
                    <LabelText label="Фамилия" text={profile.last_name} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Имя" text={profile.name} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Номер телефона" text={profile.phone} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Email" text={profile.email} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Пол" text={convertGenderName(profile.gender)} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Дата рождения" text={profile.birthday} />
                </Grid>

                <Grid item xs={12} md={4} />

                <Grid item xs={12} md={4}>
                    <LabelText label="Адрес проживания" text={profile.address} variant="body2" />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Место учебы" text={profile.university} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Хобби" text={profile.hobby} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="О себе" text={profile.about} variant="body2" />
                </Grid>
            </Grid>

            <Box mt={4} mb={4}>
                <Typography variant="h5" fontWeight={500}>
                    Рабочие данные
                </Typography>
            </Box>

            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={4}>
                    <LabelText label="О себе" text={convertPositionName(profile.position)} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Место работы" text={getLocation(profile.place_id)} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <LabelText label="Первый день работы" text={profile.first_date} />
                </Grid>
            </Grid>
        </Box>
    )
}
