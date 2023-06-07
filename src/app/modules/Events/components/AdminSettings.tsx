import { AddBox as AddBoxIcon } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { eventsActions } from 'app/modules/Events/slice/events'
import React from 'react'
import { useDispatch } from 'react-redux'

import { EventForm } from '../templates/EventForm'

interface AdminSettingsProps {
    open: boolean
    handleClose: () => void
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const handleAddEvent = () => {
        dispatch(
            eventsActions.openEditModal({
                id: '',
                name: '',
                eventDate: '',
                day: 0,
                month: 0,
                year: 0,
                prioritet: 'normal',
                info: [],
                createdAt: '',
            })
        )
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={handleAddEvent}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить событие'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SettingsModal>

            <EventForm />
        </>
    )
}
