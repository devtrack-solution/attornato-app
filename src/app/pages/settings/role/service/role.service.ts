import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { AUTH_TOKEN, AUTH_TOKEN_ONBOARDING } from 'src/app/app.constant';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private httpClient = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}roles`;


    constructor(private readonly http: HttpClient) { }

    /**
     * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
     * @param limit Limite de itens
     * @param offset Deslocamento para paginação
     * @param isActive
     * @returns Observable com a resposta da API
     */
    getRoles(limit: number, offset: number, isActive: boolean = true): Observable<any> {
        const idempotencyKey = uuidv4();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.getAuthToken()}`,
            'x-idempotency-key': idempotencyKey,
            'Content-Type': 'application/json'
        });

        const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

        return this.httpClient.get(this.apiUrl + '/to/selects', { headers, params });
    }


    async saveRole(body: any): Promise<void> {
        const idempotencyKey = uuidv4();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.getAuthToken()}`,
            'x-idempotency-key': idempotencyKey,
            'Content-Type': 'application/json'
        });
        const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers }));
        console.log('resultado', response);
    }

    async ediRole(id: any, body: any): Promise<void> {
        const idempotencyKey = uuidv4();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.getAuthToken()}`,
            'x-idempotency-key': idempotencyKey,
            'Content-Type': 'application/json'
        });
        const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, { headers }));
        console.log('resultado', response);
    }

    async deleteRole(id: any): Promise<void> {
        const idempotencyKey = uuidv4();

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.getAuthToken()}`,
            'x-idempotency-key': idempotencyKey,
            'Content-Type': 'application/json'
        });
        await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, { headers }));
    }

    private getAuthToken(): string {
        return localStorage.getItem(AUTH_TOKEN_ONBOARDING) || 'authkey';
    }

    setRole(role: any) {
        sessionStorage.setItem('currenRole', JSON.stringify(role));
    }

    getRole() {
        const data = sessionStorage.getItem('currenRole');
        return data ? JSON.parse(data) : null; // Retorna a máquina ou null se não houver
    }

    clearRole() {
        sessionStorage.removeItem('currenRole');
    }
}
