import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CountyRoutingModule } from "./county-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      CountyRoutingModule,
      SharedModule
    ]
  })
  export class CountyModule { }