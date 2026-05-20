import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(I18nService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('starts with pt as default lang', () => {
    expect(service.lang()).toBe('pt');
  });

  it('returns the key when translations not loaded', () => {
    expect(service.t('hero.title')).toBe('hero.title');
  });

  it('loads translations and exposes them via t()', fakeAsync(() => {
    const translations = { 'hero.title': 'Science With Its Own Voice' };
    service.load('en').subscribe();
    httpTesting.expectOne('/i18n/en.json').flush(translations);
    tick();
    expect(service.lang()).toBe('en');
    expect(service.t('hero.title')).toBe('Science With Its Own Voice');
  }));

  it('persists lang to localStorage on load', fakeAsync(() => {
    service.load('en').subscribe();
    httpTesting.expectOne('/i18n/en.json').flush({});
    tick();
    expect(localStorage.getItem('lang')).toBe('en');
  }));
});
