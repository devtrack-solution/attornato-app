import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PartnerRoutingModule } from "./partner-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      PartnerRoutingModule,
      SharedModule
    ]
  })
  export class PartnerModule { }