import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DetailsRoutingModule } from "./details-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      DetailsRoutingModule,
      SharedModule
    ]
  })
  export class DetailsModule { }