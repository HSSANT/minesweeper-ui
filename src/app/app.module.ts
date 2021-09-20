import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './common/header/header.component';
import { AuthLayoutComponent } from './layouts/auth/auth.layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinesweeperLayoutComponent } from './layouts/minesweeper/minesweeper.layout.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AuthLayoutComponent,
		MinesweeperLayoutComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
