import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FreeField1RoutingModule } from "./free-field1-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      FreeField1RoutingModule,
      SharedModule
    ]
  })
  export class FreeField1Module { }