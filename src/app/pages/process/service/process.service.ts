import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from 'src/app/core/services/basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService extends BasicService {
  private apiUrl = `${environment.apiUrl}process`;
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

  getProcesss(limit: number, offset: number, isActive: boolean = true, type: any): Observable<any> {
    const params = { isActive, limit, offset };
    return this.httpClient.get(`${this.apiUrl}/${type}`, this.getRequestOptions(params));
  }

  getProcessSearch(limit: number, offset: number, isActive: boolean = true, type: any, search: any): Observable<any> {
    const params = { isActive, limit, offset, search: search };
    return this.httpClient.get(`${this.apiUrl}/${type}`, this.getRequestOptions(params));
  }


  async saveIdentifyCustomer(body: any, type: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.post(this.apiUrlPadrao + type, body, this.getRequestOptions()));
      console.log('resultado', response)
      return response
    } catch (error) {
      throw error
    }
  }


  async saveProcess(body: any, type: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.httpClient.post(`${this.apiUrl}/${type}`, body, this.getRequestOptions()));
      console.log('resultado', response);
    } catch (error) {
      throw error
    }
  }

  async ediProcess(id: any, body: any, type: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${type}/${id}`, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async deleteProcess(id: any): Promise<void> {
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, this.getRequestOptions()));
  }

  setProcess(process: any, type: any) {
    sessionStorage.setItem('currentProcess', JSON.stringify(process));
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
