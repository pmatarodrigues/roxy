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
    path: '**',
    redirectTo: '',
  },
];
