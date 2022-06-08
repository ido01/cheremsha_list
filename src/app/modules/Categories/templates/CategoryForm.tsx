import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ModalForm } from 'app/components/ModalForm'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { categoriesActions } from '../slice'
import { selectCategories, selectCategoryById, selectForm } from '../slice/selectors'

export const CategoryForm: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)
    const getCategories = useSelector(selectCategories)
    const getCategory = useSelector(selectCategoryById)
    const parentCategory = getCategory(data.parentId)
    const categories = getCategories(parentCategory?.parentId || '0', data.path)

    const validationSchema = yup.object({
        name: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.id) {
                dispatch(categoriesActions.updateCategory(values))
            } else {
                dispatch(categoriesActions.createCategory(values))
            }
        },
    })

    const handleClose = () => {
        dispatch(categoriesActions.hideModal())
    }

    return (
        <ModalForm
            open={open}
            loadingSubmit={status === EStatus.PENDING}
            title={formik.values.id ? 'Редактировать категорию' : 'Добавить категорию'}
            handleClose={handleClose}
            handleSubmit={() => formik.handleSubmit()}
        >
            <Box
                mt={1}
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Название"
                            name="name"
                            autoFocus
                            value={formik.values.name || ''}
                            error={!!formik.errors.name}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" error={!!formik.errors?.parentId}>
                            <InputLabel>Родительская категория</InputLabel>

                            <Select
                                value={formik.values.parentId || ''}
                                label="Родительская категория"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('parentId', value)
                                }}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </ModalForm>
    )
}
