import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CustomersGroupRoutingModule } from "./customers-group-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      CustomersGroupRoutingModule,
      SharedModule
    ]
  })
  export class CustomersGroupModule { }