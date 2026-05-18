import { Component } from '@angular/core';
import { BlogSectionComponent } from '../sections/blog/blog-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { RoleFitSectionComponent } from '../sections/role-fit/role-fit-section.component';
import { SideProjectsSectionComponent } from '../sections/side-projects/side-projects-section.component';
import { TransitionSectionComponent } from '../sections/transition/transition-section.component';
import { VideoGalleryComponent } from '../sections/videos/video-gallery.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    VideoGalleryComponent,
    SideProjectsSectionComponent,
    BlogSectionComponent,
    TransitionSectionComponent,
    RoleFitSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero-section></app-hero-section>
    <app-blog-section></app-blog-section>
    <app-side-projects-section></app-side-projects-section>
    <app-video-gallery></app-video-gallery>
    <!-- <app-transition-section></app-transition-section>
    // <app-role-fit-section></app-role-fit-section> -->
    <app-contact-section></app-contact-section>
  `,
})
export class HomePageComponent {}
