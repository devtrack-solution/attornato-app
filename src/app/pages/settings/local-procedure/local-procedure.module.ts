import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { LocalProcedureRoutingModule } from "./local-procedure-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      LocalProcedureRoutingModule,
      SharedModule
    ]
  })
  export class LocalProcedureModule { }