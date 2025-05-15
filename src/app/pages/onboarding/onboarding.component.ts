import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AUTH_TOKEN, AUTH_TOKEN_ONBOARDING, HOME_PAGE_ROUTE } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthTokenService } from 'src/app/shared/service/auth-token.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [FormsModule, ToastModule, SharedModule, CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent implements OnInit{

  getMe: any;
  viewAdmin: boolean = false;
  viewWorker: boolean = false;
  viewCompany: boolean = false;
  isLoadingClient = false;
  isLoadingWorker = false;
  isLoadingAdmin = false;
  rolesList: any = [];
  listTotal: any = [];
  filterName: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    protected router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private authToken: AuthTokenService
  ) {}

  async ngOnInit() {
    const token = localStorage.getItem(AUTH_TOKEN) ?? '';
    const responseDecode = await this.authToken.decodeToken<any>(token)
    this.rolesList = responseDecode.profile.roles
    this.viewCompany = true
  }

  async dashBoardRole(role: any) {
    this.isLoadingWorker = true; // Ativa o estado de carregamento
    this.messageService.add({ severity: 'info', summary: 'Aguarde', detail: 'Obtendo acesso!' });
    try {
      const responseToken = await this.authService.onboarding({roleId: role.id})
      localStorage.setItem(AUTH_TOKEN_ONBOARDING, responseToken);
      setTimeout(() => {
        this.router.navigateByUrl(HOME_PAGE_ROUTE);
      }, 1000);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao acessar empresa!' })
      console.error('Erro ao entrar no dashboard:', error);
    } finally {
      this.isLoadingWorker = false; // Desativa o estado de carregamento ao finalizar
    }
  }

  filterCompanies() {
    this.rolesList = [];
    if (this.filterName !== undefined && this.filterName != null && this.filterName != '') {
      for (const model of this.listTotal) {
        let resultName = false;
        let name: string = model.name;
        if (name == null) {
          name = '';
        }
        const nameLowerCase = name.toLowerCase();
        resultName = nameLowerCase.includes(this.filterName.toLowerCase());
        if (resultName) {
          this.rolesList.push(model);
        }
      }
    } else {
      this.rolesList = this.listTotal;
    }
  }

  async logout(): Promise<void> {
    await this.authenticationService.signOut();
  }
}
