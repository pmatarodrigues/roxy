import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { App } from './app';
import { routes } from './app.routes';
import { BlogService } from './features/blog/blog.service';

const BLOG_SERVICE_STUB: Pick<BlogService, 'getLatestPosts'> = {
  getLatestPosts: () => of([]),
};

const createAppOnHomeRoute = async () => {
  const fixture = TestBed.createComponent(App);
  const router = TestBed.inject(Router);
  await router.navigateByUrl('/');
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), { provide: BlogService, useValue: BLOG_SERVICE_STUB }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render primary hero heading', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#hero h1')?.textContent).toContain('Adriana Carneiro');
  });

  it('should render six section links in navigation', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.site-nav__anchor').length).toBe(6);
  });

  it('should render writing-first navigation labels', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = Array.from(compiled.querySelectorAll('.site-nav__anchor')).map(
      (el) => (el.textContent ?? '').trim(),
    );

    expect(labels).toEqual([
      'Introduction',
      'Writing',
      'Interests',
      'Media',
      'Journey',
      'Contact',
    ]);
  });

  it('should render newsletter signup link in writing section', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('#blog .blog__newsletter-link');

    expect(link?.textContent?.toLowerCase()).toContain('subscribe');
    expect(link?.getAttribute('href')).toContain('mailto:');
  });

  it('should place writing section before media section', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionIds = Array.from(compiled.querySelectorAll('main section[id]')).map((el) =>
      el.getAttribute('id'),
    );

    expect(sectionIds.indexOf('blog')).toBeLessThan(sectionIds.indexOf('videos'));
  });

  it('should show broad conversation CTA in hero and contact', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('#hero .hero-action--primary')?.textContent?.toLowerCase(),
    ).toContain('open to conversations');
    expect(
      compiled.querySelector('#contact .contact-action--primary')?.textContent?.toLowerCase(),
    ).toContain('open to conversations');
  });

  it('should keep adhesive motif limited to hero and writing sections', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    const tapedNodes = compiled.querySelectorAll('main section .scrapbook-tape');

    expect(tapedNodes.length).toBeGreaterThan(0);
    expect(tapedNodes.length).toBeLessThanOrEqual(4);
    expect(compiled.querySelector('#hero .scrapbook-tape')).toBeTruthy();
    expect(compiled.querySelector('#blog .scrapbook-tape')).toBeTruthy();
  });

  it('should render video gallery section anchor target', async () => {
    const fixture = await createAppOnHomeRoute();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#videos')).toBeTruthy();
  });
});
