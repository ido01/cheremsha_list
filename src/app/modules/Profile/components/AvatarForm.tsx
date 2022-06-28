import { Close as CloseIcon, PhotoCameraOutlined as PhotoCameraOutlinedIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { fileActions } from 'app/modules/File/slice'
import { selectOpen } from 'app/modules/File/slice/selectors'
import { FileUploadForm } from 'app/modules/File/templates/FileUploadForm'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { profileActions } from '../slice'
import { selectProfile } from '../slice/selectors'
import { AvatarImage } from './AvatarImage'

export const AvatarForm: React.FC = () => {
    const dispatch = useDispatch()

    const profile = useSelector(selectProfile)
    const open = useSelector(selectOpen)

    const [isHover, setHover] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const imageSrc = profile?.avatar?.url || ''
    const userName = profile?.name

    const ref = useRef<HTMLInputElement>(null)

    const handleCapture = ({ target }: any) => {
        const fileReader = new FileReader()

        setImageName(target.files[0].name)
        fileReader.readAsDataURL(target.files[0])
        fileReader.onload = (e: any) => {
            setImage(e.target.result)
            dispatch(fileActions.openModal())
        }
    }

    const handleChangeImage = () => {
        ref?.current?.click?.()
    }

    const handleRemoveAvatar = () => {
        dispatch(profileActions.updateAvatar('0'))
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    width: 'fit-content',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        width: 'fit-content',
                        cursor: 'pointer',
                        borderRadius: '50%',
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleChangeImage}
                >
                    <AvatarImage name={userName} image={imageSrc} size={'70px'} />

                    {isHover && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            }}
                        >
                            <Typography variant="body2" color="white" sx={{ textAlign: 'center', lineHeight: '16px' }}>
                                {imageSrc ? 'Изменить фото' : 'Добавить фото'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                    }}
                >
                    {imageSrc ? (
                        <IconButton
                            size="small"
                            disableRipple
                            sx={{
                                backgroundColor: 'white',
                                width: '24px',
                                height: '24px',
                                color: 'grey.400',
                                '&:hover': {
                                    color: 'red',
                                },
                            }}
                            onClick={handleRemoveAvatar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <IconButton
                            size="small"
                            disableRipple
                            sx={{
                                backgroundColor: 'white',
                                width: '24px',
                                height: '24px',
                            }}
                        >
                            <PhotoCameraOutlinedIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <input ref={ref} accept="image/*" id="icon-button-photo" hidden onChange={handleCapture} type="file" />

            {open && <FileUploadForm image={image} fileName={imageName} />}
        </>
    )
}
