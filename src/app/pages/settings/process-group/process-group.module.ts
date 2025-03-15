import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProcessGroupRoutingModule } from "./process-group-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ProcessGroupRoutingModule,
      SharedModule
    ]
  })
  export class ProcessGroupModule { }