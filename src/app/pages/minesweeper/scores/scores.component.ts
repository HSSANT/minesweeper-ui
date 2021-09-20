import { Component, OnInit } from "@angular/core";
import { Score } from "src/app/models/score.model";
import { GameType } from "src/app/enums/game-type.enum";
import { ScoreService } from "src/app/services/score.service";

@Component({
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

    public scores: Score[]
    public GameType = GameType
    public selectedGameType: GameType = GameType.EASY

    constructor(
        private service: ScoreService
    ) {}

    ngOnInit() {
        this.changeSelectedGameType(GameType.EASY)
    }

    changeSelectedGameType(gameType: GameType) {
        this.selectedGameType = gameType
        this.getScores()
    }

    getScores() {
        this.service
            .getScores(this.selectedGameType)
            .then((response:any) => {
                this.scores = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }
}