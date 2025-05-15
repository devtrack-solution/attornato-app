import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        AppConfigModule,
        ToastModule
    ]
})
export class LoginModule { }
