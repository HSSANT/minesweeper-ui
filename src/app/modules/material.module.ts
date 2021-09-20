import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@NgModule({
    imports: [MatDialogModule, MatButtonToggleModule],
    exports: [MatDialogModule, MatButtonToggleModule]
})
export class MaterialModule { }