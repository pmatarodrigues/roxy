import { Routes } from '@angular/router';

import { BlogPostPageComponent } from './pages/blog-post-page.component';
import { HomePageComponent } from './pages/home-page.component';

export const routes: Routes = [
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
  {
    path: '**',
    redirectTo: '',
  },
];
