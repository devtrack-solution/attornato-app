import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FreeField2RoutingModule } from "./free-field2-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      FreeField2RoutingModule,
      SharedModule
    ]
  })
  export class FreeField2Module { }