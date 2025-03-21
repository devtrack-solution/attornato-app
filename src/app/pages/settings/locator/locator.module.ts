import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { LocatorRoutingModule } from "./locator-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      LocatorRoutingModule,
      SharedModule
    ]
  })
  export class LocatorModule { }