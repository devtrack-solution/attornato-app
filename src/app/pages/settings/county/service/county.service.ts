import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountysService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}process/counties`;

  constructor(private readonly http: HttpClient) { }

  /**
   * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
   * @param limit Limite de itens
   * @param offset Deslocamento para paginação
   * @param isActive
   * @returns Observable com a resposta da API
   */
  getCountys(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });

    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrl, { headers, params });
  }


  async saveCounty(body: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers }));
    console.log('resultado', response);
  }

  async ediCounty(id: any, body: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, { headers }));
    console.log('resultado', response);
  }

  async deleteCounty(id: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, { headers }));
  }

  private getAuthToken(): string {
    return localStorage.getItem('auth_token') || 'authkey';
  }
}
