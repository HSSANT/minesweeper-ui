import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Score } from "../models/score.model";
import { HttpClient } from "@angular/common/http";
import { GameType } from "../enums/game-type.enum";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    create = (
        score: Score
    ) => this.http
        .post(
            `${environment.apiUrl}/scores/`,
            score,
            { headers: this.authService.generateHeaders()}
        ).toPromise()

    getScores = (
        gameType: GameType
    ) => this.http
        .get(
            `${environment.apiUrl}/scores/?gameType=${gameType.toString()}`,
            { headers: this.authService.generateHeaders()}
        ).toPromise()
}