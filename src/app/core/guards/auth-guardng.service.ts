import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOGIN_PAGE_ROUTE } from 'src/app/app.constant';

export const canActivateGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.isAuthenticated().pipe(
    tap(async (loggedIn) => {
      if (!loggedIn) {
        await router.navigateByUrl(LOGIN_PAGE_ROUTE);
      }
    })
  );
};
