import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthCredential, AuthenticationService } from '../services/authentication.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authenticationService.currentAuthenticatedUser()).pipe(
      switchMap((auth: AuthCredential) => {
        return next.handle(
          request.clone({
            setHeaders: {
              Authorization: `Bearer ${auth.token}`
            }
          })
        );
      }),
      catchError((err) => {
        console.log('Error:', err);
        return next.handle(request);
      })
    );
  }
}
