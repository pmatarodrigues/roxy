import { Routes } from '@angular/router';

import { i18nResolver } from './features/i18n/i18n.resolver';
import { languageGuard } from './features/i18n/language.guard';
import { LangShellComponent } from './components/lang-shell/lang-shell.component';
import { BlogPostPageComponent } from './pages/blog-post-page.component';
import { HomePageComponent } from './pages/home-page.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [languageGuard],
    children: [],
  },
  {
    path: ':lang',
    component: LangShellComponent,
    resolve: { i18n: i18nResolver },
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'blog/:slug',
        component: BlogPostPageComponent,
      },
      {
        path: 'publications',
        loadComponent: () =>
          import('./pages/publications-page.component').then(
            (m) => m.PublicationsPageComponent,
          ),
        title: 'Publicações Científicas',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/pt',
  },
];
