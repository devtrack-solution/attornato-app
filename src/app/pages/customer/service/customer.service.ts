import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from 'src/app/core/services/basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BasicService {
  private apiUrl = `${environment.apiUrl}clients`;
  private apiUrlPadrao = `${environment.apiUrl}`;

  constructor() {
    super();
  }

  /**
   * Exemplo de método que faz uma requisição GET com um cabeçalho x-idempotency-key único
   * @param limit Limite de itens
   * @param offset Deslocamento para paginação
   * @param isActive
   * @returns Observable com a resposta da API
   */
  getCustomers(limit: number, offset: number, isActive: boolean = true, type: any): Observable<any> {
    const params = { isActive, limit, offset };
    return this.httpClient.get(`${this.apiUrl}/${type}`, this.getRequestOptions(params));
  }

  getCustomersAll(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params = { isActive, limit, offset };
    return this.httpClient.get(this.apiUrl, this.getRequestOptions(params));
  }

  getCustomersSearch(limit: number, offset: number, isActive: boolean = true, type: any, search : any): Observable<any> {
    const params = { isActive, limit, offset, search : search };
    return this.httpClient.get(`${this.apiUrl}/${type}`, this.getRequestOptions(params));
  }


  async saveCustomer(body: any, type: string): Promise<void> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl + '/' + type, body, this.getRequestOptions()));
    console.log('resultado', response);
  }


  async saveIdentifyCustomer(body: any, type: any): Promise<any> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrlPadrao + type, body, this.getRequestOptions()));
    console.log('resultado', response)
    return response
  }

  async ediCustomer(id: any, body: any, type: string): Promise<void> {
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${type}/${id}`, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async deleteCustomer(id: any, type: string): Promise<void> {
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${type}/${id}`, this.getRequestOptions()));
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
