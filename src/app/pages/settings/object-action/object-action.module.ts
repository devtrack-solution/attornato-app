import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ObjectActionRoutingModule } from "./object-action-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      ObjectActionRoutingModule,
      SharedModule
    ]
  })
  export class ObjectActionModule { }