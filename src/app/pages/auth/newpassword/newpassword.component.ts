import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, BehaviorSubject } from 'rxjs';
import { LOGIN_PAGE_ROUTE } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
	templateUrl: './newpassword.component.html'
})
export class NewPasswordComponent {

	rememberMe: boolean = false;

	private subjectErrorMessage = new Subject<void>();
	protected errorMessage$ = new BehaviorSubject<string>('');
	username: string = ''
	code: string = ''
	message: string = ''

	constructor(private readonly route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService) {

	}

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.username = params['username']
			this.code = params['code']
		});
	}

	async change(password: string, repeatPassword: string): Promise<void> {
		try {
			if (password !== repeatPassword) {
				this.message = 'As senhas informadas são divergentes!'
				this.messageService.add({ severity: 'error', summary: 'Aviso', detail: 'As senhas informadas são divergentes!' });
			} else if (password.length < 6) {
				this.message = 'A senha deve ter no mínimo 6 caracteres!'
				this.messageService.add({ severity: 'error', summary: 'Aviso', detail: 'A senha deve ter no mínimo 6 caracteres!' });
			} else {
				await this.authService.newPassword('auth/guest/reset-password', { password: password, passwordConfirm: repeatPassword }, this.username, this.code);
				this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha atualizada com sucesso!' });
				setTimeout(() => {
					this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
				}, 1000)
			}
			this.errorMessage$.next(this.message)
		} catch (e: any) {
			this.message = 'Erro ao processar as informações, tente novamente!'
			this.errorMessage$.next(this.message)
			this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possivel efetuar a requisição!' });
		}
	}
}
