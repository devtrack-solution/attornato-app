import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from 'src/app/core/services/basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class FreeField2Service extends BasicService {
  private apiUrl = `${environment.apiUrl}clients/person/contact-person/free-fields`;
  private apiUrlpadrao = `${environment.apiUrl}`;

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
  getClientFreeField2s(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrl, { headers : this.headers, params });
  }

  getProcessFreeField2s(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrlpadrao + 'process/process-detail/free-field-2', { headers : this.headers, params });
  }

  getProcessFreeField1s(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrlpadrao + 'process/process-detail/free-field-1', { headers : this.headers, params });
  }

  getProcessFreeField6s(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params: HttpParams = new HttpParams().set('isActive', isActive).set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(this.apiUrlpadrao + 'process/process-detail/free-field-6', { headers : this.headers, params });
  }


  async saveFreeField2(body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers : this.headers }));
    console.log('resultado', response);
  }

  async ediFreeField2(id: any, body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, { headers : this.headers }));
  }

  async deleteFreeField2(id: any): Promise<void> {
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, { headers : this.headers }));
  }
}
