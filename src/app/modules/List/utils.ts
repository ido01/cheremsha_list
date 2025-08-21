import { ITime } from 'types/ITable'

export const convertTimeToText = (time: ITime) => {
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}`
}

export const curretnTime = (time: ITime, border = 10, delay = 0) => {
    const hour = time.hour - delay
    const timeHour = hour >= border ? hour : hour + 24
    return timeHour * 60 + time.minute
}
