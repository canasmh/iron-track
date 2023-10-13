import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(() => true),
    catchError((error) => {
      console.error(error);
      authService.deleteHeader('Authorization');
      localStorage.removeItem('token');
      router.navigate(['/login']);

      return of(false);
    })
  );
};

