import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { SubjectsRoutingModule } from "./subjects-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      SubjectsRoutingModule,
      SharedModule
    ]
  })
  export class SubjectsModule { }