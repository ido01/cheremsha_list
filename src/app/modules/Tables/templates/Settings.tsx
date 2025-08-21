import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import React from 'react'
import { useDispatch } from 'react-redux'

import { tablesActions } from '../slice'

interface SettingsProps {
    open: boolean
    handleClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const addPosition = () => {
        dispatch(
            tablesActions.openEditModal({
                id: '',
                name: '',
                short_name: '',
                full_name: '',
                places: 0,
                free: false,
                reservations: [],
            })
        )
    }

    return (
        <SettingsModal open={open} handleClose={handleClose}>
            <List>
                <ListItem disablePadding onClick={addPosition}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>

                        <ListItemText primary="Добавить стол" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </SettingsModal>
    )
}
