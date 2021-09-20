import { Routes } from '@angular/router'
import { ScoresComponent } from '../pages/minesweeper/scores/scores.component'
import { MinesweeperComponent } from '../pages/minesweeper/minesweeper/minesweeper.component'

export const MinesweeperRoutes: Routes = [
	{
		path: '',
		component: MinesweeperComponent,
	},
	{
		path: 'scores',
		component: ScoresComponent,
	},
]