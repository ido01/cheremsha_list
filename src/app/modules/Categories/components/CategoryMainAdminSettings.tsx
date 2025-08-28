import { AddBox as AddBoxIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { categoriesActions } from 'app/modules/Categories/slice'
import { CategoryForm } from 'app/modules/Categories/templates/CategoryForm'
import React from 'react'
import { useDispatch } from 'react-redux'

interface CategoryMainAdminSettingsProps {
    open: boolean
    handleClose: () => void
}

export const CategoryMainAdminSettings: React.FC<CategoryMainAdminSettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const handleAddCategory = () => {
        dispatch(
            categoriesActions.openModal({
                id: '',
                type: 'category',
                name: '',
                parentId: '0',
                createdAt: '',
                icon: '',
            })
        )
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={handleAddCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить главную категорию'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
            </SettingsModal>

            <CategoryForm />
        </>
    )
}
