import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CustomerRoutingModule } from "./customer-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      CustomerRoutingModule,
      SharedModule
    ]
  })
  export class CustomerModule { }