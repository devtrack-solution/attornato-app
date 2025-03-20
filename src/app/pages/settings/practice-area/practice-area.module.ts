import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PracticeAreaRoutingModule } from "./practice-area-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      PracticeAreaRoutingModule,
      SharedModule
    ]
  })
  export class PracticeAreaModule { }