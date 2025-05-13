import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { AUTH_USER_DATA, AUTH_TOKEN, AUTH_ROLE, LOGIN_SERVICE, AUTH_COMPANY, LOGIN_PAGE_ROUTE, ONBOARDING_ROUTE } from 'src/app/app.constant';
import API from 'src/app/shared/service/client-api.service';

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
  account: Account;
  token: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentAuthorizationSubject: BehaviorSubject<AuthCredential>;
  public currentAuthorization: Observable<AuthCredential>;
  public loggedIn: BehaviorSubject<boolean>;
  public fullName: BehaviorSubject<string>;
  public loggedUser: BehaviorSubject<Account>;
  public token: BehaviorSubject<string>;

  constructor(private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.fullName = new BehaviorSubject<string>('');
    this.token = new BehaviorSubject<string>('');
    this.loggedUser = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem(AUTH_USER_DATA) as string) as Account);
    this.currentAuthorizationSubject = new BehaviorSubject<AuthCredential>(
      JSON.parse(
        JSON.stringify({
          account: JSON.parse(localStorage.getItem(AUTH_USER_DATA) as string) as Account,
          token: localStorage.getItem(AUTH_TOKEN),
          role: localStorage.getItem(AUTH_ROLE)
        })
      )
    );

    this.currentAuthorization = this.currentAuthorizationSubject.asObservable();
  }

  public get currentAuthorizationValue(): Account {
    return this.loggedUser.value;
  }

  async signIn(username: string, password: string): Promise<AuthCredential> {
    try {
      const result = await API.post(LOGIN_SERVICE, { username, password });
      if (result.status === HttpStatusCode.Accepted) {
        const auth = {
          account: result.data.account,
          token: result.data.token,
          role: result.data.role
        };

        localStorage.setItem(AUTH_TOKEN, result.data.token);
        localStorage.setItem(AUTH_USER_DATA, JSON.stringify(auth.account));
        localStorage.setItem(AUTH_ROLE, result.data.role);

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
    localStorage.removeItem(AUTH_USER_DATA);
    localStorage.removeItem(AUTH_ROLE);
    localStorage.removeItem(AUTH_COMPANY);
    this.loggedIn.next(false);
    await this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
  }

  async changementCompany(): Promise<void> {
    localStorage.removeItem(AUTH_COMPANY);
    await this.router.navigateByUrl(ONBOARDING_ROUTE);
  }

  public async currentAuthenticatedUser(): Promise<AuthCredential> {
    return {
      account: JSON.parse(localStorage.getItem(AUTH_USER_DATA) as string) as Account,
      token: localStorage.getItem(AUTH_TOKEN),
      role: localStorage.getItem(AUTH_ROLE)
    } as AuthCredential;
  }

  hasRole(roles: string[]) {
    return (
      this.currentAuthorizationValue?.role?.name !== undefined &&
      this.currentAuthorizationValue?.role?.name !== null &&
      roles.includes(this.currentAuthorizationValue?.role?.name)
    );
  }

  getIdAccount() {
    return this.currentAuthorizationValue?.id;
  }

  async initializePermissions(): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
}
