import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LOGIN_PAGE_ROUTE } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    templateUrl: './forgotpassword.component.html'
})
export class ForgotPasswordComponent { 

    constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthService, private messageService: MessageService) {}

    async send(email: string): Promise<void> {
    try {
      await this.authService.forgotPassword('auth/forgot/password', { username: email});
      await this.snackBar.open('Enviamos para o seu e-mail as orientações para alteração de senha!', 'Fechar', {
        duration: 3000, // Tempo que o balão vai ficar visível (ms)
        verticalPosition: 'top', // Posição do balão (topo ou bottom)
        horizontalPosition: 'center', // Posição do balão (start, center, end, left, right)
      }).afterDismissed().subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Enviamos para seu e-mail as orientações para alteração de senha!' });
        setTimeout(() => {
          this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
        }, 2000)
      });
    } catch (e: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possivel efetuar a requisição!' });
      console.error('Error:', e)
    }
  }
}
