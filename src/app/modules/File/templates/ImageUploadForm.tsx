import { Edit as EditIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fileActions } from '../slice'

interface ImageUploadFormProps {
    index: number
    isEdit?: boolean
}

export const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ index, isEdit }) => {
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState<boolean>(false)

    const ref = useRef<HTMLInputElement>(null)

    const handleCapture = ({ target }: any) => {
        setLoading(true)
        dispatch(
            fileActions.createImage({
                file: target.files[0],
                index,
            })
        )
    }

    const handleChangeImage = () => {
        ref?.current?.click?.()
    }

    useEffect(() => {
        if (!isEdit) {
            window.addEventListener('paste', pasteHandler)

            return () => {
                window.removeEventListener('paste', pasteHandler)
            }
        }
    }, [])

    function pasteHandler(e: any) {
        if (e.clipboardData) {
            const items = e.clipboardData.items

            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        const blob = items[i].getAsFile()

                        setLoading(true)

                        dispatch(
                            fileActions.createImage({
                                file: blob,
                                index,
                            })
                        )
                    }
                }
            }
        }
    }

    return (
        <>
            {!isEdit && (
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    endIcon={<PhotoCameraIcon />}
                    onClick={handleChangeImage}
                >
                    Загрузить изображение
                </LoadingButton>
            )}
            {isEdit && (
                <IconButton color="success" onClick={handleChangeImage}>
                    <EditIcon />
                </IconButton>
            )}
            <input ref={ref} accept="image/*" id="icon-button-photo" hidden onChange={handleCapture} type="file" />
        </>
    )
}
