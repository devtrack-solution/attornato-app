import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { AUTH_TOKEN, AUTH_TOKEN_ONBOARDING } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}clients`;

  constructor(private readonly http: HttpClient) { }

  /**
   * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
   * @param limit Limite de itens
   * @param offset Deslocamento para paginação
   * @param isActive
   * @returns Observable com a resposta da API
   */
  getCustomers(limit: number, offset: number, isActive: boolean = true, type: any): Observable<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });

    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(`${this.apiUrl}/${type}`, { headers, params });
  }


  async saveCustomer(body: any, type: string): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl + '/' + type, body, { headers }));
    console.log('resultado', response);
  }


  async saveIdentifyCustomer(body: any, type: any): Promise<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl + '/' + type, body, { headers }));
    console.log('resultado', response)
    return response
  }

  async ediCustomer(id: any, body: any, type: string): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
        const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${type}/${id}`, body, { headers }));
    console.log('resultado', response);
  }

  async deleteCustomer(id: any, type: string): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${type}/${id}`, { headers }));
  }

  private getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_ONBOARDING) || 'authkey';
  }


    setCustomer(customer: any, type: string) {
        sessionStorage.setItem('currenCustomer', JSON.stringify(customer));
        sessionStorage.setItem('currentTypePeople', type);
    }

    getCustomer() {
        const data = sessionStorage.getItem('currenCustomer');
        return data ? JSON.parse(data) : null; // Retorna a máquina ou null se não houver
    }

    getTypePeople(): string {
        const data = sessionStorage.getItem('currentTypePeople');
        return data ? data : 'fisica';
    }

    clearCustomer() {
        sessionStorage.removeItem('currenCustomer');
        sessionStorage.removeItem('currentTypePeople');
    }
}
