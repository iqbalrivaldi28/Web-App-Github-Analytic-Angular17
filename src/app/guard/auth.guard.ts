import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuth = checkAuth();
  const router = inject(Router);

  if (!isAuth) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

function checkAuth() {
  const isLogin = localStorage.getItem('token') ? true : false;
  return isLogin;
}
