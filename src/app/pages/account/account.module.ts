import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountRoutingModule } from "./account-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      AccountRoutingModule,
      SharedModule
    ]
  })
  export class AccountModule { }