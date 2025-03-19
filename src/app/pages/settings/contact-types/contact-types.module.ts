import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ContactTypesRoutingModule } from "./contact-types-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ContactTypesRoutingModule,
      SharedModule
    ]
  })
  export class ContactTypesModule { }