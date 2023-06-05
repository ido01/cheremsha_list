import { EGender, EPosition, ERole, EState } from 'types'
import { EQuestionType } from 'types/IQuestion'
import { EQuizState } from 'types/IQuizState'

export const PROJECT_NAME = process.env.REACT_APP_NAME

export const GENDER_NAME: { [key in EGender]: string } = {
    male: 'Прекрасный мужчина',
    female: 'Прекрасная девушка',
}

export const ROLE_NAME: { [key in ERole]: string } = {
    guest: 'Гость',
    user: 'Пользователь',
    moder: 'Модератор',
    admin: 'Администратор',
}

export const POSITION_NAME: { [key in EPosition]: string } = {
    seller: 'Продавец',
    hookah: 'Кальянщик',
    manager: 'Менеджер',
    owner: 'Управляющий',
    creator: 'Создатель',
    managerControl: 'Менеджер и Управляющий',
    accountant: 'Бухгалтер',
    storekeeper: 'Кладовщик',
    technician: 'Техник',
    opt: 'Оптовый менеджер',
    office: 'Сотрудник офиса',
    sklad: 'Сотрудник склада',
}

export const DOCUMENT_STATE: { [key in EState]: string } = {
    initial: 'Новый',
    pending: 'В процессе',
    rejected: 'Отклонён',
    completed: 'Изучено',
    closed: 'Провален',
}

export const QUIZ_STATE: { [key in EQuizState]: string } = {
    initial: 'Новый',
    pending: 'В процессе',
    rejected: 'Требует пересдачи',
    completed: 'Сдан',
    closed: 'Провален',
    done: 'На проверке',
}

export const RESULT_STATE: { [key in EQuizState]: string } = {
    initial: 'Не пройден',
    pending: 'В процессе',
    rejected: 'Требует пересдачи',
    completed: 'Сдан',
    closed: 'Провален',
    done: 'Нужна проверка',
}

export const QUESTION_TYPE: { [key in EQuestionType]: string } = {
    variant: 'Обычный',
    text: 'Вариативный',
    sort: 'Соответствие',
}

export const PLACE_NAME: { [key in string]: string } = {
    '1': 'Академ',
    '3': 'Виктория',
    '4': 'Миасс',
    '5': 'Новотроицк',
    '7': 'Парковый',
    '9': 'Советский',
    '10': 'Теплотех',
    '11': 'Тополинка',
    '13': 'Центр',
    '16': 'Чмз',
    '19': 'Ленинский',
    '20': 'Чтз',
    '21': 'ТОРГОВЫЙ',
    '22': 'Александровский',
    '26': 'Пушкина',
    '27': 'Екат Академ',
    '28': 'Академический',
    '30': 'Ньютон',
    '31': 'Миасс Старый',
    '32': 'Миасс Новый',
    '38': 'Кашириных',
}
