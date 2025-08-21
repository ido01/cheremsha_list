import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Badge, Box, IconButton, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import Table, { TableEmptyRow } from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import { eventsActions } from 'app/modules/Events/slice/events'
import {
    selectEvents,
    selectEventsDay,
    selectStatus as selectEventsStatus,
} from 'app/modules/Events/slice/events/selectors'
import { birthdaysActions } from 'app/modules/Events/slice/users'
import { selectBirthdays, selectBirthdaysDay, selectStatus } from 'app/modules/Events/slice/users/selectors'
import { workdaysActions } from 'app/modules/Events/slice/workday'
import {
    selectStatus as selectWorkdayStatus,
    selectWorkdays,
    selectWorkdaysDay,
} from 'app/modules/Events/slice/workday/selectors'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { MobileUserView } from 'app/modules/Users/components/MobileUserView'
import { MobileWorkdayView } from 'app/modules/Users/components/MobileWorkdayView'
import { usersActions } from 'app/modules/Users/slice'
import { UserModal } from 'app/modules/Users/templates/UserModal'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EStatus } from 'types'
import { IEvent } from 'types/IEvent'
import { TTableRowData } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'
import { getNoun } from 'utils/getNoun'

import { AdminSettings } from '../components/AdminSettings'
import { MobileEventView } from '../components/MobileEventView'
import { EventModal } from './EventModal'

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[]; eventDays?: number[] }) {
    const { highlightedDays = [], eventDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) !== -1
    const isSelectedEvent = !props.outsideCurrentMonth && eventDays.indexOf(props.day.date()) !== -1

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={
                isSelectedEvent ? (
                    <Typography color="red" variant="h4">
                        •
                    </Typography>
                ) : undefined
            }
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                sx={{
                    backgroundColor: isSelected || isSelectedEvent ? orange[50] : 'transparent',
                }}
            />
        </Badge>
    )
}

export const EventsListMobile: React.FC = () => {
    dayjs.locale('ru')
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)
    const [selectDate, setSelectDay] = useState(dayjs())
    const [selectMonth, setSelectMonth] = useState(dayjs())
    const [highlightedDays, setHighlightedDays] = useState<number[]>([])
    const [eventDays, setEventDays] = useState<number[]>([])

    const birthdaysDay = useSelector(selectBirthdaysDay)(selectDate.month(), selectDate.date())
    const workdaysDay = useSelector(selectWorkdaysDay)(selectDate.month(), selectDate.date())
    const eventsDay = useSelector(selectEventsDay)(selectDate.year(), selectDate.month(), selectDate.date())
    const profileRole = useSelector(selectProfileRole)
    const birthdays = useSelector(selectBirthdays)
    const workdays = useSelector(selectWorkdays)
    const events = useSelector(selectEvents)
    const status = useSelector(selectStatus)
    const statusEvents = useSelector(selectEventsStatus)
    const statusWorkdays = useSelector(selectWorkdayStatus)
    const getLocation = useSelector(selectLocation)

    const tableEventsRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 10,
            element: (event: IEvent) => (
                <>
                    <Box>
                        <Typography variant="body2">{event.name}</Typography>
                    </Box>
                </>
            ),
        },
        {
            title: '',
            name: 'position',
            xs: 2,
            element: (event: IEvent) => (
                <>
                    {event.prioritet === 'hight' && (
                        <Typography variant="body2" color="red">
                            Важно
                        </Typography>
                    )}
                </>
            ),
        },
    ]

    const tableRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 8,
            element: (user: IUser) => (
                <>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.url} size={'36px'} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </>
            ),
        },
        {
            title: '',
            name: 'place_id',
            xs: 2,
            element: (user: IUser) => (
                <>
                    {!!user.place_id && (
                        <Typography variant="body2" color="grey.600">
                            {getLocation(user.place_id)}
                        </Typography>
                    )}

                    {!user.place_id && <TableEmptyRow />}
                </>
            ),
        },
        {
            title: '',
            name: 'position',
            xs: 2,
            element: (user: IUser) => (
                <>
                    {!!user.job && (
                        <Typography variant="body2" color="grey.600">
                            {user.job || ''}
                        </Typography>
                    )}

                    {!user.place_id && <TableEmptyRow />}
                </>
            ),
        },
    ]

    const tableWorkdayRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 8,
            element: (user: IUser) => (
                <>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.url} size={'36px'} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </>
            ),
        },
        {
            title: '',
            name: 'first_date',
            xs: 4,
            element: (user: IUser) => (
                <Typography variant="body2" color="grey.600">
                    {selectMonth.year() - user.workyear}
                    {getNoun(selectMonth.year() - user.workyear, ' год в чернике', ' года в чернике', ' лет в чернике')}
                </Typography>
            ),
        },
    ]

    const mobileView = (item: IUser) => <MobileUserView user={item} />
    const mobileWorkdayView = (item: IUser) => <MobileWorkdayView user={item} />
    const mobileEventView = (item: IEvent) => <MobileEventView event={item} />

    useEffect(() => {
        dispatch(workdaysActions.setCurrentMonth(selectMonth.month()))
        dispatch(workdaysActions.setCurrentYear(selectMonth.year()))
        dispatch(workdaysActions.loadWorkdays({ month: selectMonth.month() + 1, year: selectMonth.year() }))
        dispatch(birthdaysActions.setCurrentMonth(selectMonth.month()))
        dispatch(birthdaysActions.loadBirthdays(selectMonth.month() + 1))
        dispatch(eventsActions.setCurrentMonth(selectMonth.month()))
        dispatch(eventsActions.setCurrentYear(selectMonth.year()))
        dispatch(eventsActions.loadEvents({ month: selectMonth.month() + 1, year: selectMonth.year() }))
    }, [selectMonth])

    useEffect(() => {
        setHighlightedDays([...birthdays.map((user) => user.day), ...workdays.map((event) => event.workday)])
    }, [birthdays, workdays])

    useEffect(() => {
        setEventDays(events.map((event) => event.day))
    }, [events])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickRow = (user: IUser) => {
        dispatch(usersActions.userLoaded(user))
        dispatch(usersActions.setActiveId(user.id))
        dispatch(usersActions.showModal())
    }

    const handleClickRowEvent = (event: IEvent) => {
        dispatch(eventsActions.setActiveId(event.id))
        dispatch(eventsActions.showModal())
    }

    return (
        <>
            <TitleBlock
                title={'Календарь'}
                endNode={
                    profileRole === ERole.ADMIN ? (
                        <IconButton
                            sx={{ ml: 2 }}
                            aria-label="more"
                            id="long-button"
                            aria-haspopup="true"
                            onClick={handleSettingOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    ) : undefined
                }
                searchDisabled
            />

            <Box px={1} flex="1 0 100%">
                <MobileDatePicker
                    sx={{ width: '100%', backgroundColor: 'white' }}
                    value={selectDate}
                    onMonthChange={setSelectMonth}
                    format="YYYY-MM-DD"
                    onChange={(day) => {
                        if (day) {
                            setSelectDay(day)
                        }
                    }}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                            eventDays,
                        } as any,
                    }}
                />
            </Box>

            <Box pt={4} flex="1 0 100%" sx={{ overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <Typography pt={1} px={{ xs: 1, md: 4 }} variant="h5">
                    События {selectDate.format('DD MMM')}
                </Typography>
                {eventsDay.length === 0 && (
                    <Typography px={{ xs: 1, md: 4 }} variant="body3" color="grey.600">
                        Нет событий
                    </Typography>
                )}
                <Table
                    items={eventsDay}
                    rows={tableEventsRows}
                    isLoading={statusEvents === EStatus.PENDING}
                    mobileView={mobileEventView}
                    handleClickRow={handleClickRowEvent}
                />

                <Typography pt={1} px={{ xs: 1, md: 4 }} variant="h5">
                    Работа в Чернике {selectDate.format('DD MMM')}
                </Typography>
                {workdaysDay.length === 0 && (
                    <Typography px={{ xs: 1, md: 4 }} variant="body3" color="grey.600">
                        Нет событий
                    </Typography>
                )}
                <Table
                    items={workdaysDay}
                    rows={tableWorkdayRows}
                    isLoading={statusWorkdays === EStatus.PENDING}
                    mobileView={mobileWorkdayView}
                    handleClickRow={handleClickRow}
                />

                <Typography pt={1} px={{ xs: 1, md: 4 }} variant="h5">
                    Дни рождения {selectDate.format('DD MMM')}
                </Typography>
                {birthdaysDay.length === 0 && (
                    <Typography px={{ xs: 1, md: 4 }} variant="body3" color="grey.600">
                        Нет праздников
                    </Typography>
                )}
                <Table
                    items={birthdaysDay}
                    rows={tableRows}
                    isLoading={status === EStatus.PENDING}
                    mobileView={mobileView}
                    handleClickRow={handleClickRow}
                />

                <UserModal />
                <EventModal />
            </Box>

            {profileRole === ERole.ADMIN && <AdminSettings open={open} handleClose={handleClose} />}
        </>
    )
}
