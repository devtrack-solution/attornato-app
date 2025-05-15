import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ONBOARDING_ROUTE } from 'src/app/app.constant';
import { AuthCredential, AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #673AB7;
            
            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent implements OnInit {
    error: string | any;
  message: string | any;

  constructor(
    protected router: Router,
    protected authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.authenticationService.currentAuthorization.subscribe((auth: AuthCredential) => {
      this.authenticationService.isAuthenticated();
    });

    this.authenticationService.loggedIn.subscribe((value: boolean) => {
      if (value) {
        setTimeout(() => {
          this.router.navigateByUrl(ONBOARDING_ROUTE);
        }, 1000);
      } else {
        this.message = 'Falha na autenticação, verifique se os dados estão corretos!';
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.messageService.add({ severity: 'info', summary: 'Aguarde', detail: 'Verificando acesso!' });
    try {
      await this.authenticationService.signIn(email, password);
      await this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Acesso liberado!' });
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Autenticação',
        detail: 'Falha na autenticação, verifique se os dados estão corretos!'
      });
    }
  }

  async ngOnInit(): Promise<void> {
    this.authenticationService.isAuthenticated();
  }
 }
