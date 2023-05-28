import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { IEvent, IEventResponse, IEventsResponse } from 'types/IEvent'
import { request } from 'utils/request'

import { eventsActions, IEventRequest } from '.'

export function* loadEvents(action: PayloadAction<IEventRequest>) {
    try {
        const response: IEventsResponse = yield call(request, 'events', {
            params: { month: action.payload.month, year: action.payload.year },
        })

        yield put(eventsActions.eventsLoaded(response))
    } catch (error: any) {
        yield put(eventsActions.statusError())
    }
}

export function* createEvent(action: PayloadAction<IEvent>) {
    try {
        const response: IEventResponse = yield call(request, `events`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(eventsActions.eventSave(response.data))
    } catch (error: any) {
        yield put(eventsActions.statusError())
    }
}

export function* updateEvent(action: PayloadAction<IEvent>) {
    try {
        const response: IEventResponse = yield call(request, `events/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(eventsActions.eventSave(response.data))
    } catch (error: any) {
        yield put(eventsActions.statusError())
    }
}

export function* deleteEvent(action: PayloadAction<string>) {
    try {
        yield call(request, `events/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(eventsActions.eventDeleted(action.payload))
    } catch (error: any) {
        yield put(eventsActions.statusError())
    }
}

export function* eventsWatcher() {
    yield takeLatest(eventsActions.loadEvents.type, loadEvents)
    yield takeLeading(eventsActions.createEvent.type, createEvent)
    yield takeLeading(eventsActions.updateEvent.type, updateEvent)
    yield takeLeading(eventsActions.deleteEvent.type, deleteEvent)
}
