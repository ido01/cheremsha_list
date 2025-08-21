import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, Grid, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { convertGenderName } from 'utils/convertUtils'

import { selectProfile } from '../slice/selectors'

export const AccountData: React.FC = () => {
    const profile = useSelector(selectProfile)
    const getLocation = useSelector(selectLocation)

    return (
        <Box>
            <Box mb={1}>
                <Typography variant="h5" fontWeight={500}>
                    Санитарная книжка
                </Typography>
            </Box>

            <Box mb={4}>
                {!profile.doc_file && <Typography variant="body3">Не загружена</Typography>}
                {!!profile.doc_file && (
                    <Button
                        component="a"
                        target="_blank"
                        href={profile.doc_file.url}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<DownloadIcon />}
                    >
                        {profile.doc_file.name}
                    </Button>
                )}
            </Box>

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
                    <LabelText label="Должность" text={profile.job || ''} />
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
