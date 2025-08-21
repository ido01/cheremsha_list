import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EStatus } from 'types'
import { IPosition } from 'types/IPosition'
import { TTableRowData } from 'types/ITableDisplay'

import { DeleteModal } from '../components/DeleteModal'
import { FormModal } from '../components/FormModal'
import { MobileView } from '../components/MobileView'
import { positionsActions } from '../slice'
import { selectPositions, selectStatus } from '../slice/selectors'
import { Settings } from './Settings'

export const PositionsList: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const status = useSelector(selectStatus)
    const positions = useSelector(selectPositions)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteOpen = (position: IPosition) => {
        dispatch(positionsActions.showDeleteModal(position))
    }

    const handleUpdateOpen = (position: IPosition) => {
        dispatch(positionsActions.openEditModal(position))
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Кто',
            name: 'name',
            xs: 9,
            element: (position: IPosition) => (
                <Box>
                    <Typography variant="body2">{position.label}</Typography>
                </Box>
            ),
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (position: IPosition) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <IconButton color="info" aria-haspopup="true" onClick={() => handleUpdateOpen(position)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(position)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const mobileView = (position: IPosition) => <MobileView position={position} />

    return (
        <>
            <TitleBlock
                title={'Должности'}
                count={positions.length}
                searchDisabled
                endNode={
                    profileRole === ERole.ADMIN ? (
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
            />

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <Table
                    items={positions}
                    rows={tableRows}
                    isLoading={status === EStatus.PENDING}
                    mobileView={mobileView}
                    // handleClickRow={handleClickRow}
                />
            </Box>

            {profileRole === ERole.ADMIN && (
                <>
                    <Settings open={open} handleClose={handleClose} />
                    <DeleteModal />
                    <FormModal />
                </>
            )}
        </>
    )
}
