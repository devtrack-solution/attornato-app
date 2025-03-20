import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProceduralStatusRoutingModule } from "./procedural-status-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ProceduralStatusRoutingModule,
      SharedModule
    ]
  })
  export class ProceduralStatusModule { }