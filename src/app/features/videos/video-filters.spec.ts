import { PORTFOLIO_MEDIA } from './video.data';
import { countVideosByLanguage, filterVideos } from './video-filters';

describe('video-filters', () => {
  it('filters by language only', () => {
    const result = filterVideos(PORTFOLIO_MEDIA, { language: 'PT' });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((media) => media.language === 'PT')).toBe(true);
  });

  it('combines language and topic filters deterministically', () => {
    const firstPass = filterVideos(PORTFOLIO_MEDIA, {
      language: 'EN',
      topic: 'microfluidics',
    });

    const secondPass = filterVideos(PORTFOLIO_MEDIA, {
      language: 'EN',
      topic: 'microfluidics',
    });

    expect(firstPass).toEqual(secondPass);
    expect(firstPass.every((media) => media.language === 'EN')).toBe(true);
    expect(firstPass.every((media) => media.topic === 'microfluidics')).toBe(true);
  });

  it('matches query against title, summary, and tags', () => {
    const result = filterVideos(PORTFOLIO_MEDIA, { query: 'children' });

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.every((media) => media.audience === 'children')).toBe(true);
  });

  it('includes illustration items in topic filtering', () => {
    const result = filterVideos(PORTFOLIO_MEDIA, { topic: 'science-outreach' });

    expect(result.some((media) => media.mediaType === 'illustration')).toBe(true);
  });

  it('returns language counters with all bucket', () => {
    const counts = countVideosByLanguage(PORTFOLIO_MEDIA);

    expect(counts.ALL).toBe(PORTFOLIO_MEDIA.length);
    expect(counts.EN + counts.PT).toBe(PORTFOLIO_MEDIA.length);
  });
});
