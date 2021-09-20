import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Cel } from "../models/cel.model";

@Injectable({
    providedIn: 'root'
})
export class MinesweeperService {

    constructor(private http: HttpClient) { }

    // getGame
    // @param width: number - the width of the game
    // @param height: number - the height of the game
    // @returns a promise
    getGame = (
        width: number,
        height: number
    ) => this.http
        .post(
            `${environment.apiUrl}/minesweeper/`,
            {
                width: width,
                height: height
            }
        ).toPromise()

    // fillWithMines
    // @param game: any[][] - matrix of cels
    // @param mines: number - number of mines
    // @param cel: any - cel
    // @returns a promise
    fillWithMines = (
        game: Cel[][],
        mines: number,
        cel: Cel
    ) => this.http
        .put(
            `${environment.apiUrl}/minesweeper/fill/`,
            {
                game: game,
                mines: mines,
                cel: cel
            }
        ).toPromise()

    // clickOnCel
    // @param game: any[][]
    // @param cel: any
    // @returns a promise
    clickOnCel = (
        game: any[][],
        cel: any
    ) => this.http
        .put(
            `${environment.apiUrl}/minesweeper/cel/`,
            {
                game: game,
                cel: cel
            }
        ).toPromise()
}