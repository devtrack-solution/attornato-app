import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessGroupService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}group-process`;
  private machineData: any

  constructor(private readonly http: HttpClient) { }

  /**
   * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
   * @param limit Limite de itens
   * @param offset Deslocamento para paginação
   * @param isActive
   * @returns Observable com a resposta da API
   */
  getProcessGroups(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });

    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrl, { headers, params });
  }


  async saveProcessGroup(body: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers }));
    console.log('resultado', response);
  }

  async ediProcessGroup(id: any, body: any): Promise<void> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, { headers }));
    console.log('resultado', response);
  }

  async deleteProcessGroup(id: any): Promise<void> {
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



  // Define a máquina atual e salva no sessionStorage
  setMachine(machine: any) {
    console.log('Setando máquina:', machine);
    sessionStorage.setItem('currentMachine', JSON.stringify(machine)); // Salva a máquina
  }

  // Pega a máquina atual
  getMachine() {
    const data = sessionStorage.getItem('currentMachine');
    return data ? JSON.parse(data) : null; // Retorna a máquina ou null se não houver
  }

  // Apaga a máquina após a edição
  clearMachine() {
    sessionStorage.removeItem('currentMachine'); // Remove a máquina do sessionStorage
  }
}
