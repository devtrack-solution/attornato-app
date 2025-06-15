import { inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from './basic-service.service';
import { AUTH_TOKEN } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BasicService {
  private apiUrl = `${environment.apiUrl}auth/login`;
  private apiUrlOnboarding = `${environment.apiUrl}auth/onboarding`;
  private apiUrlPadrao = `${environment.apiUrl}`;

  constructor() {
    super();
  }


  async onboarding(body: any): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthTokenLogin()}`,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrlOnboarding, body, { headers, responseType: 'text' }));
    return response
  }

  async login(body: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers, responseType: 'text' }));
    return response
  }

  async forgotPassword(url: any, body: any): Promise<any> {
    await firstValueFrom(this.httpClient.post(this.apiUrlPadrao + url, body, this.getRequestOptions()));
  }


  async newPassword(url: any, body: any, username: any, code: any): Promise<any> {
    const params = { username, code };
    await firstValueFrom(this.httpClient.patch(this.apiUrlPadrao + url, body, this.getRequestOptions(params)));
  }


  private getAuthTokenLogin(): string {
    return localStorage.getItem(AUTH_TOKEN) || 'authkey';
  }
}
