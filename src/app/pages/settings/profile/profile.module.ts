import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ProfileRoutingModule,
      SharedModule
    ]
  })
  export class ProfileModule { }