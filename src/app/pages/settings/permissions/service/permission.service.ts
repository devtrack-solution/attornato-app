import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from 'src/app/core/services/basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BasicService {
  private apiUrl = `${environment.apiUrl}permissions`;


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
  getPermissions(limit: number, offset: number, isActive: boolean = true): Observable<any> {
    const params = { isActive, limit, offset };

    return this.httpClient.get(this.apiUrl + '/to/selects', this.getRequestOptions(params));
  }

  getSearchPermissions(limit: number, offset: number, isActive: boolean = true, search: any): Observable<any> {
    const params = { isActive, limit, offset, search : search };

    return this.httpClient.get(this.apiUrl + '/to/selects', this.getRequestOptions(params));
  }

  async savePermission(body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async ediPermission(id: any, body: any): Promise<void> {
    const response = await firstValueFrom(this.httpClient.patch(`${this.apiUrl}/${id}`, body, this.getRequestOptions()));
    console.log('resultado', response);
  }

  async deletePermission(id: any): Promise<void> {
    await firstValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`, this.getRequestOptions()));
  }

  setPermission(permission: any) {
    sessionStorage.setItem('currenPermission', JSON.stringify(permission));
  }

  getPermission() {
    const data = sessionStorage.getItem('currenPermission');
    return data ? JSON.parse(data) : null; // Retorna a máquina ou null se não houver
  }

  clearPermission() {
    sessionStorage.removeItem('currenPermission');
  }
}
