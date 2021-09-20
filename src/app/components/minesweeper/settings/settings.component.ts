import { GameType } from "src/app/enums/game-type.enum";
import { Dimensions } from "src/app/models/dimensions.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    templateUrl: './settings.component.html',
    styles: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    public form: FormGroup
    public GameType = GameType
    public dimensions: any
    public showCustom: boolean = true
    
    constructor(
        private formBuidler: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<SettingsComponent>
    ) { 
        this.dimensions = {};
        this.dimensions.name = '';
        this.dimensions.width = 20
        this.dimensions.height = 20
        this.dimensions.mines = 20
        this.form = this.formBuidler.group({
            name: [this.dimensions.name, Validators.required],
            width: [this.dimensions.width, Validators.required],
            height: [this.dimensions.height, Validators.required],
            mines: [this.dimensions.mines, Validators.required]
        })
    }

    ngOnInit() { }

    save() {
        if(this.form.valid) {
            this.dimensions.name = this.form.controls.name.value; 
            this.dimensions.width = this.form.controls.width.value; 
            this.dimensions.height = this.form.controls.height.value; 
            this.dimensions.mines = this.form.controls.mines.value ;
            this.dialogRef.close(this.dimensions);
        }
    }

    selectGame(gameType: GameType) {
        switch(gameType) {
            case GameType.EASY :
                this.dimensions.width = 9
                this.dimensions.height = 9
                this.dimensions.mines = 10
                break;
            case GameType.NORMAL :
                this.dimensions.width = 16
                this.dimensions.height = 16
                this.dimensions.mines = 40
                break;
            case GameType.HARD :
                this.dimensions.width = 30
                this.dimensions.height = 16
                this.dimensions.mines = 99
                break;
            case GameType.CUSTOM :
                this.showCustom = true
                break;
        }
        this.dimensions.gameType = gameType
        if(!this.showCustom) {
            this.dialogRef.close(this.dimensions)
        }
    }



    ngOnDestroy() { }
}