import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProcessRoutingModule } from "./process-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ProcessRoutingModule,
      SharedModule
    ]
  })
  export class ProcessModule { }