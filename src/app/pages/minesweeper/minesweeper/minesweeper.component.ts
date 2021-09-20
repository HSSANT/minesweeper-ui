import * as moment from 'moment'
import { Subscription, timer } from 'rxjs';
import { Cel } from "src/app/models/cel.model";
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AuthService } from 'src/app/services/auth.service';
import { Dimensions } from 'src/app/models/dimensions.model';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ScoreService } from 'src/app/services/score.service';
import { MinesweeperService } from "src/app/services/minesweeper.service";
import { SettingsComponent } from 'src/app/components/minesweeper/settings/settings.component';
import { GameType } from 'src/app/enums/game-type.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@AutoUnsubscribe()
@Component({
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit, OnDestroy {

    public user: User
    public game: Cel[][]
    public dateToShow: Date
    public time: moment.Moment
    public title = 'Minesweeper';

    public dimensions: Dimensions

    public winner: boolean = false
    public showTime: boolean = true
    public gameOver: boolean = false
    public flagging: boolean = false
    public gameStared: boolean = false

    private userSub: Subscription
    private clockSub: Subscription

    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private scoreService: ScoreService,
        private service: MinesweeperService,
        private http:HttpClient
    ) { 
        this.userSub = this.authService
            .currentUser
            .subscribe(cu => {
                this.user = cu
            })
    }

    ngOnInit() {
        this.resetDate()
        if(this.dimensions) {
            this.getGame()
        } else {
            this.openSettingsDialog()
        }
        this.clockSub = timer(
            0,
            1000
        ).subscribe(_ => {
            if(
                this.gameStared && 
                !this.gameOver && 
                !this.winner
            ) {
                this.dateToShow = null
                this.time.add(1, "seconds")
                this.dateToShow = this.time.toDate()
            }
        })
    }
    
    openSettingsDialog() {
        const dialogRef = this.dialog
            .open(
                SettingsComponent,
                {
                    data: null
                }
            )
        dialogRef
            .afterClosed()
            .subscribe(res => {
                if(res) {
                    this.dimensions = res
                    this.winner = false
                    this.gameOver = false
                    this.flagging = false
                    this.gameStared = false
                    this.resetDate()
                    this.getGame()
                }
            })
    }

    resetDate() {
        this.time = moment()
        this.time.set({
            hours: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })
        this.dateToShow = this.time.toDate()
    }

    getGame() {
        this.service
            .getGame(
                this.dimensions.width,
                this.dimensions.height
            )
            .then((res: any) => {
                console.log('res data');
                console.log(res);
                this.game = res.data
            })
        
        const httpLoginOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json', 
              'Accept':  'application/json',   
              'Response-Type': 'text' ,
              'Access-Control-Allow-Origin':'*'       
            })
          };
    
          
        const payload = {
            email: "deviget@deviget.com",
            password: "Challenge@2021"  
        }  
        this.http.post('https://devget-minesweeper-api.herokuapp.com/Users/login',payload, httpLoginOptions).toPromise().then(res=>{
            console.log('retorno do promisse res token');
            let login_token = res;
            const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': `Bearer ${login_token}`,
                  'Content-Type':  'application/json', 
                  'Accept':  'application/json',
                  'Response-Type': 'text'    
                })
              };
              const payloadCreateGame= {
                    id: this.generateNewGuid(),
                    name: this.dimensions.name,
                    "rows": this.dimensions.height,
                    "cols": this.dimensions.width,
                    "mines": this.dimensions.mines
            }  
              this.http.post('https://devget-minesweeper-api.herokuapp.com/Games',payloadCreateGame,httpOptions).toPromise().then(res=>{
                  console.log('retorno create game');
                  console.log(res);
              })
        });
    }

    generateNewGuid() : string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
      }

    enableFlagging() {
        if (this.gameStared) {
            this.flagging = !this.flagging
        }
    }

    clickOnCell(cel: Cel) {
        if (
            !this.gameStared &&
            !this.gameOver &&
            !cel.flag
        ) {
            this.service
                .fillWithMines(
                    this.game,
                    this.dimensions.mines,
                    cel
                )
                .then((res: any) => {
                    this.game = res.data
                    return this.service
                        .clickOnCel(
                            this.game,
                            cel
                        )
                })
                .then((res: any) => {
                    this.gameStared = true
                    this.game = res.data
                })
        } else if (
            this.flagging &&
            !this.gameOver &&
            !cel.flag
        ) {
            cel.flag = !cel.flag
        } else if (
            cel.mine &&
            !this.gameOver &&
            !cel.flag
        ) {
            this.gameOver = true
        } else if (!cel.open) {
            this.service
                .clickOnCel(
                    this.game,
                    cel
                )
                .then((res: any) => {
                    this.game = res.data
                    this.winner = res.winner
                    if(
                        this.winner && 
                        this.user && 
                        this.dimensions.gameType != GameType.CUSTOM
                    ) {
                        this.scoreService
                            .create({
                                time: this.time.format("HH:mm:ss"),
                                gameType: this.dimensions.gameType.toString(),
                            })
                    }
                })
        }
    }

    restart() {
        this.winner = false
        this.gameOver = false
        this.flagging = false
        this.gameStared = false
        this.getGame()
    }

    ngOnDestroy() {}
}