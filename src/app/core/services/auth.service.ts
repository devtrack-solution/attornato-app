import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { AUTH_TOKEN, AUTH_TOKEN_ONBOARDING } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}auth/login`;
  private apiUrlOnboarding = `${environment.apiUrl}auth/onboarding`;

  constructor(private readonly http: HttpClient) { }

 
  async onboarding(body: any): Promise<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthTokenLogin()}`,
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrlOnboarding, body, { headers }));
    return response
  }

  async login(body: any): Promise<any> {
    const idempotencyKey = uuidv4();

    const headers: HttpHeaders = new HttpHeaders({
      'x-idempotency-key': idempotencyKey,
      'Content-Type': 'application/json'
    });
    const response = await firstValueFrom(this.httpClient.post(this.apiUrl, body, { headers,  responseType: 'text' }));
    return response
  }


  private getAuthTokenLogin(): string {
    return localStorage.getItem(AUTH_TOKEN) || 'authkey';
  }
}
