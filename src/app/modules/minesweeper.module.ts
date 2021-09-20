import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GlobalModule } from "./global.module";
import { MaterialModule } from "./material.module";
import { MinesweeperRoutes } from '../routes/minesweeper.routes';
import { ScoresComponent } from "../pages/minesweeper/scores/scores.component";
import { SettingsComponent } from "../components/minesweeper/settings/settings.component";
import { MinesweeperComponent } from "../pages/minesweeper/minesweeper/minesweeper.component";

@NgModule({
    declarations: [
        ScoresComponent,
        SettingsComponent,
        MinesweeperComponent,
    ],
    imports: [
        GlobalModule,
        MaterialModule,
        RouterModule.forChild(MinesweeperRoutes)
    ],
    providers: [
    ],
    entryComponents: [
        SettingsComponent
    ]
})
export class MinesweeperModule { }