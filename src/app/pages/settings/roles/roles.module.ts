import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RolesRoutingModule } from "./roles-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RolesRoutingModule,
      SharedModule
    ]
  })
  export class RolesModule { }