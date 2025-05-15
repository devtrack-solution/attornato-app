// auth-token.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  decodeToken<T>(token: string): T | null {
    try {
      return jwtDecode<T>(token);
    } catch (err) {
      console.error('Erro ao decodificar o token:', err);
      return null;
    }
  }
}
