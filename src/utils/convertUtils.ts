import {
    DOCUMENT_STATE,
    GENDER_NAME,
    PLACE_NAME,
    POSITION_NAME,
    QUESTION_TYPE,
    QUIZ_STATE,
    RESULT_STATE,
    ROLE_NAME,
} from 'app/constants'
import { EGender, EPosition, ERole, EState } from 'types'
import { EQuestionType } from 'types/IQuestion'
import { EQuizState } from 'types/IQuizState'

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

export const convertQuizState = (state: EQuizState) => {
    return QUIZ_STATE[state as EQuizState]
}

export const convertResultState = (state: EQuizState) => {
    return RESULT_STATE[state as EQuizState]
}

export const convertQuestionType = (state: EQuestionType) => {
    return QUESTION_TYPE[state as EQuestionType]
}

export const convertPlaceName = (placeId: string) => {
    return PLACE_NAME[placeId]
}
