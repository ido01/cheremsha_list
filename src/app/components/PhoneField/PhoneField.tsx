import { TextField, TextFieldProps } from '@mui/material'
import { toString } from 'lodash'
import React from 'react'
import { default as InputMask } from 'react-input-mask'

import { getListOfMasks } from './utils/get-list-of-masks'
import { getMatchedMask } from './utils/get-matched-mask'

export const PhoneField: React.FC<TextFieldProps> = ({
    sx,
    name,
    value,
    label,
    error,
    variant = 'standard',
    placeholder,
    InputProps,
    disabled,
    onChange,
    onBlur,
}) => {
    const masks = getListOfMasks()
    const matchedMask = getMatchedMask(toString(value), masks)

    return (
        <InputMask
            mask={matchedMask || '+99999999999999999999'}
            maskPlaceholder=""
            name={name}
            disabled={disabled}
            value={toString(value)}
            onChange={onChange}
            onBlur={onBlur}
        >
            <TextField
                sx={sx}
                fullWidth
                variant={variant}
                label={label}
                placeholder={placeholder}
                error={error}
                InputProps={InputProps}
            />
        </InputMask>
    )
}
