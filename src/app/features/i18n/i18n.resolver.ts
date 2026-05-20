import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { of } from 'rxjs';

import { I18nService } from './i18n.service';

export const i18nResolver: ResolveFn<void> = (route) => {
  const i18n = inject(I18nService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');
  if (lang !== 'en' && lang !== 'pt') {
    router.navigate(['/en']);
    return of(void 0);
  }
  return i18n.load(lang);
};
