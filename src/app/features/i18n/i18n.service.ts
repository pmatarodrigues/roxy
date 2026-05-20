import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  readonly lang = signal<'en' | 'pt'>('pt');
  private readonly translations = signal<Record<string, string>>({});

  load(lang: 'en' | 'pt'): Observable<void> {
    return this.http.get<Record<string, string>>(`/i18n/${lang}.json`).pipe(
      tap((data) => {
        this.translations.set(data);
        this.lang.set(lang);
        localStorage.setItem('lang', lang);
      }),
      map(() => void 0),
    );
  }

  t(key: string): string {
    return this.translations()[key] ?? key;
  }
}
