import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { AUTH_TOKEN, AUTH_TOKEN_ONBOARDING } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}process`;
  private apiUrlPadrao = `${environment.apiUrl}`;

  constructor(private readonly http: HttpClient) { }

  /**
   * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
   * @param limit Limite de itens
   * @param offset Deslocamento para paginação
   * @param isActive
   * @returns Observable com a resposta da API
   */
  getProcesss(limit: number, offset: number, isActive: boolean = true, type: any): Observable<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });

    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(`${this.apiUrl}/${type}`, { headers, params });
  }

  async saveIdentifyCustomer(body: any, type: any): Promise<any> {
    try {
      const idempotencyKey = uuidv4();

      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${this.getAuthToken()}`,
        'x-idempotency-key': idempotencyKey,
        'Content-Type': 'application/json'
      });
      const response = await firstValueFrom(this.httpClient.post(this.apiUrlPadrao + type, body, { headers }));
      console.log('resultado', response)
      return response
    } catch (error) {
      throw error
    }
  }


  async saveProcess(body: any, type: string): Promise<void> {
    try {
      const idempotencyKey = uuidv4();

      const headers: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'x-idempotency-key': idempotencyKey,
        'Content-Type': 'application/json'
      });
      const response = await firstValueFrom(this.httpClient.post(this.apiUrl + '/' + type, body, { headers }));
      console.log('resultado', response);
    } catch (error) {
      throw error
    }
  }

  async ediProcess(id: any, body: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, { headers }));
    console.log('resultado', response);
  }

  async deleteProcess(id: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, { headers }));
  }

  private getAuthToken(): any {
    return localStorage.getItem(AUTH_TOKEN_ONBOARDING);
  }


  setProcess(process: any, type: any) {
    sessionStorage.setItem('currentProcess', process);
    sessionStorage.setItem('currentTypePeople', type);
  }

  getProcess() {
    const data = sessionStorage.getItem('currentProcess');
    return data ? JSON.parse(data) : null; // Retorna a máquina ou null se não houver
  }

  getTypeProcess(): string {
    const data = sessionStorage.getItem('currentTypeProcess');
    return data ? data : 'administrative';
  }

  clearProcess() {
    sessionStorage.removeItem('currentProcess');
    sessionStorage.removeItem('currentTypeProcess');
  }
}
