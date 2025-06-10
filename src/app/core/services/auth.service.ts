import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicService } from './basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BasicService{
  private apiUrl = `${environment.apiUrl}auth/login`;
  private apiUrlOnboarding = `${environment.apiUrl}auth/onboarding`;
  private apiUrlPadrao = `${environment.apiUrl}`;

  constructor() {
    super();
   }

 
  async onboarding(body: any): Promise<any> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrlOnboarding, body, { headers : this.headers,  responseType: 'text' }));
    return response
  }

  async login(body: any): Promise<any> {
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers : this.headers,  responseType: 'text' }));
    return response
  }

  async forgotPassword(url: any, body: any): Promise<any> {
    await firstValueFrom(this.httpClient.post(this.apiUrlPadrao + url, body, { headers : this.headers }));
  }


  async newPassword(url: any, body: any, username: any, code: any): Promise<any> {
    const params: HttpParams = new HttpParams().set('username', username).set('code', code);

    await firstValueFrom(this.httpClient.patch(this.apiUrlPadrao + url, body, { headers : this.headers, params }));
  }
}
