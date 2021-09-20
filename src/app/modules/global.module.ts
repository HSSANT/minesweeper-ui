import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
	],
	declarations: [
	],
	exports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
	],
	providers: [],
	entryComponents: [],
})
export class GlobalModule { }
