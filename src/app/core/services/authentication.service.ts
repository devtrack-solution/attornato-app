import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AUTH_TOKEN, LOGIN_PAGE_ROUTE, AUTH_TOKEN_ONBOARDING } from 'src/app/app.constant';
import { AuthService } from './auth.service';

export interface Account {
  id: string;
  name: string;
  username: string;
  role: any;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
export interface AuthCredential {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentAuthorizationSubject: BehaviorSubject<AuthCredential>;
  public currentAuthorization: Observable<AuthCredential>;
  public loggedIn: BehaviorSubject<boolean>;
  public fullName: BehaviorSubject<string>;
  public token: BehaviorSubject<string>;

  constructor(private router: Router, private auth: AuthService) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.fullName = new BehaviorSubject<string>('');
    this.token = new BehaviorSubject<string>('');
    this.currentAuthorizationSubject = new BehaviorSubject<AuthCredential>(
      JSON.parse(
        JSON.stringify({
          token: localStorage.getItem(AUTH_TOKEN),
        })
      )
    );

    this.currentAuthorization = this.currentAuthorizationSubject.asObservable();
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const result = await this.auth.login({ username, password})
      if (result !== undefined) {
        const auth = {
          token: result,
        };

        localStorage.setItem(AUTH_TOKEN, result);

        this.currentAuthorizationSubject.next(auth);
        return auth;
      } else {
        throw new Error();
      }
    } catch (e: any) {
      console.error('Error:', e.message);
      throw e;
    }
  }

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    const result = localStorage.getItem(AUTH_TOKEN);
    const autenticated = result !== null;
    this.loggedIn.next(autenticated);
    return of(autenticated);
  }

  /** signout */
  async signOut(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_TOKEN_ONBOARDING);
    this.loggedIn.next(false);
    await this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
  }

  public async currentAuthenticatedUser(): Promise<AuthCredential> {
    return {
      token: localStorage.getItem(AUTH_TOKEN),
      onboarding: localStorage.getItem(AUTH_TOKEN_ONBOARDING)
    } as AuthCredential;
  }


  async initializePermissions(): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
}
