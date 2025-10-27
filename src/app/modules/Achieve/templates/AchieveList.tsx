import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IAchieve } from 'types/IAchieve'
import { TTableRowData } from 'types/ITableDisplay'
import { checkSudoAccess } from 'utils/roles'

import { DeleteModal } from '../components/DeleteModal'
import { FormModal } from '../components/FormModal'
import { MobileView } from '../components/MobileView'
import { achieveActions } from '../slice'
import { selectAchieve, selectStatus } from '../slice/selectors'
import { Settings } from './Settings'

export const AchieveList: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const status = useSelector(selectStatus)
    const achieves = useSelector(selectAchieve)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteOpen = (achive: IAchieve) => {
        dispatch(achieveActions.showDeleteModal(achive))
    }

    const handleUpdateOpen = (achive: IAchieve) => {
        dispatch(achieveActions.openEditModal(achive))
    }

    useEffect(() => {
        dispatch(achieveActions.loadAchieve())
    }, [])

    const tableRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 9,
            element: (achieve: IAchieve) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const Icon = Icons[achieve.icon]
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 8,
                                p: achieve.image ? 0 : 1,
                                display: 'flex',
                                color: '#fff',
                                overflow: 'hidden',
                                backgroundColor: achieve.color,
                            }}
                        >
                            {achieve.image && (
                                <img src={achieve.image.thumb} style={{ width: '44px', height: '44px' }} />
                            )}
                            {!achieve.image && Icon && <Icon />}
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                            {achieve.label}
                        </Typography>

                        <Typography variant="body3" color="grey.700">
                            {achieve.description}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (achieve: IAchieve) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    {checkSudoAccess(profileRole) && (
                        <>
                            <IconButton color="info" aria-haspopup="true" onClick={() => handleUpdateOpen(achieve)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(achieve)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            ),
        },
    ]

    const mobileView = (achieve: IAchieve) => <MobileView achieve={achieve} />

    return (
        <Main
            title={'Ачивки'}
            count={achieves.length}
            searchDisabled
            endNode={
                checkSudoAccess(profileRole) ? (
                    <IconButton
                        sx={{ ml: 2 }}
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleSettingOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
        >
            <Table
                items={achieves}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />

            {checkSudoAccess(profileRole) && (
                <>
                    <Settings open={open} handleClose={handleClose} />
                    <DeleteModal />
                    <FormModal />
                </>
            )}
        </Main>
    )
}
