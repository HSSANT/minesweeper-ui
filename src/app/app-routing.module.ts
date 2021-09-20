import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth/auth.layout.component'
import { MinesweeperLayoutComponent } from 'src/app/layouts/minesweeper/minesweeper.layout.component'

const routes: Routes = [
	{
		path: '',
		redirectTo: 'minesweeper',
		pathMatch: 'full',
	},
	{
		path: 'minesweeper',
		component: MinesweeperLayoutComponent,
		children: [{
			path: '',
			loadChildren: () =>
				import('./modules/minesweeper.module').then(m => m.MinesweeperModule)
		}],
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [{
			path: '',
			loadChildren: () =>
				import('./modules/auth.module').then(m => m.AuthModule)
		}],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
