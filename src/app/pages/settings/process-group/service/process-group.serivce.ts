import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from 'src/app/core/services/basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessGroupService extends BasicService {
  private apiUrl = `${environment.apiUrl}process/group-process`;
   

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
  getProcessGroups(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params = { isActive, limit, offset };

    return this.httpClient.get(this.apiUrl, this.getRequestOptions(params));
  }

  getSearchProcessGroups(limit: number, offset: number, isActive: boolean = true, search: any): Observable<any> {
    const params = { isActive, limit, offset, search : search };

    return this.httpClient.get(this.apiUrl, this.getRequestOptions(params));
  }


  async saveProcessGroup(body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async ediProcessGroup(id: any, body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async deleteProcessGroup(id: any): Promise<void> {
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, this.getRequestOptions()));
  }
}
