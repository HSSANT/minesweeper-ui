import { User } from "./user.model"

export class Score {
    _id?: string
    time: string
    gameType: string
    user?: User
}