import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const languageGuard: CanActivateFn = () => {
  const router = inject(Router);
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'pt') {
    return router.createUrlTree([stored]);
  }
  const lang = navigator.language.startsWith('pt') ? 'pt' : 'en';
  return router.createUrlTree([lang]);
};
