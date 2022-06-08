import { DOCUMENT_STATE, GENDER_NAME, PLACE_NAME, POSITION_NAME, ROLE_NAME } from 'app/constants'
import { EGender, EPosition, ERole, EState } from 'types'

export const convertGenderName = (gender: EGender) => {
    return GENDER_NAME[gender as EGender]
}

export const convertPositionName = (position: EPosition) => {
    return POSITION_NAME[position as EPosition]
}

export const convertRoleName = (role: ERole) => {
    return ROLE_NAME[role as ERole]
}

export const convertDocumentState = (state: EState) => {
    return DOCUMENT_STATE[state as EState]
}

export const convertPlaceName = (placeId: string) => {
    return PLACE_NAME[placeId]
}
