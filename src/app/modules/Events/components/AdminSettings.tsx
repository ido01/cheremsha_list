import {
    AddBox as AddBoxIcon,
    AddCircle as AddCircleIcon,
    DeleteForever as DeleteForeverIcon,
    Edit as EditIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { categoriesActions } from 'app/modules/Categories/slice'
import { CategoryForm } from 'app/modules/Categories/templates/CategoryForm'
import { DocumentForm } from 'app/modules/Documents/templates/DocumentForm'
import { eventsActions } from 'app/modules/Events/slice/events'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EState, EType } from 'types'
import { ICategory } from 'types/ICategory'

import { EventForm } from '../templates/EventForm'

interface AdminSettingsProps {
    open: boolean
    handleClose: () => void
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

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
