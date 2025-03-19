import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { OriginRoutingModule } from "./origin-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      OriginRoutingModule,
      SharedModule
    ]
  })
  export class OriginModule { }