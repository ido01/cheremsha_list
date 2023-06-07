import { IUser } from './IUser'

export enum EGameState {
    INIT = 'init',
    GAME = 'game',
    RESULT = 'result',
}

export interface IGameResponse {
    data: IGame
}

export interface IGamesResponse {
    data: IGame[]
}

export interface IGame {
    id: string
    uid: string
    user?: IUser
    game: string
    best: number
    try: number
}
