import { IColorStatus, ISelect, ITime } from 'types/ITable'

export const Colors: IColorStatus = {
    init: '#00BCD4',
    late: '#009688',
    active: '#8BC34A',
    delay: '#FF9800',
    close: '#546E7A',
    delete: '#546E7A',
}

export const StatusText: IColorStatus = {
    init: 'Ожидаем',
    late: 'Опаздывает',
    active: 'Сидит',
    delay: 'Пересиживает',
    close: 'Ушли',
    delete: 'Удалили',
}

export const Reserv: ISelect[] = [
    {
        value: {
            hour: 1,
            minute: 0,
        },
        label: '1 час',
    },
    {
        value: {
            hour: 1,
            minute: 30,
        },
        label: '1.5 часа',
    },
    {
        value: {
            hour: 2,
            minute: 0,
        },
        label: '2 часа',
    },
    {
        value: {
            hour: 2,
            minute: 30,
        },
        label: '2.5 часа',
    },
    {
        value: {
            hour: 3,
            minute: 0,
        },
        label: '3 часа',
    },
    {
        value: {
            hour: 3,
            minute: 30,
        },
        label: '3.5 часа',
    },
]

export const TimesVariants: ITime[] = [
    {
        hour: 12,
        minute: 0,
    },
    {
        hour: 12,
        minute: 30,
    },
    {
        hour: 13,
        minute: 0,
    },
    {
        hour: 13,
        minute: 30,
    },
    {
        hour: 14,
        minute: 0,
    },
    {
        hour: 14,
        minute: 30,
    },
    {
        hour: 15,
        minute: 0,
    },
    {
        hour: 15,
        minute: 30,
    },
    {
        hour: 16,
        minute: 0,
    },
    {
        hour: 16,
        minute: 30,
    },
    {
        hour: 17,
        minute: 0,
    },
    {
        hour: 17,
        minute: 30,
    },
    {
        hour: 18,
        minute: 0,
    },
    {
        hour: 18,
        minute: 30,
    },
    {
        hour: 19,
        minute: 0,
    },
    {
        hour: 19,
        minute: 30,
    },
    {
        hour: 20,
        minute: 0,
    },
    {
        hour: 20,
        minute: 30,
    },
    {
        hour: 21,
        minute: 0,
    },
    {
        hour: 21,
        minute: 30,
    },
    {
        hour: 22,
        minute: 0,
    },
    {
        hour: 22,
        minute: 30,
    },
    {
        hour: 23,
        minute: 0,
    },
    {
        hour: 23,
        minute: 30,
    },
    {
        hour: 0,
        minute: 0,
    },
    {
        hour: 0,
        minute: 30,
    },
    {
        hour: 1,
        minute: 0,
    },
    {
        hour: 1,
        minute: 30,
    },
    {
        hour: 2,
        minute: 0,
    },
    {
        hour: 2,
        minute: 30,
    },
    {
        hour: 3,
        minute: 0,
    },
    {
        hour: 3,
        minute: 30,
    },
    {
        hour: 4,
        minute: 0,
    },
]
