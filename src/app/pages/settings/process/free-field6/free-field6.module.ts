import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FreeField6RoutingModule } from "./free-field6-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      FreeField6RoutingModule,
      SharedModule
    ]
  })
  export class FreeField6Module { }