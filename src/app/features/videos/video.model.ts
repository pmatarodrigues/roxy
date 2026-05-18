export type VideoLanguage = 'EN' | 'PT';

export type VideoTopic =
  | 'circulating-tumour-cells'
  | 'gastrointestinal-oncology'
  | 'microfluidics'
  | 'clinical-evidence'
  | 'science-outreach';

export type VideoPlatform = 'youtube' | 'vimeo';

export type PortfolioMediaType = 'video' | 'illustration';

interface BasePortfolioMedia {
  id: string;
  title: string;
  originalTitle?: string;
  summary: string;
  language: VideoLanguage;
  topic: VideoTopic;
  publishedAt: string;
}

export interface PortfolioVideo extends BasePortfolioMedia {
  mediaType: 'video';
  platform: VideoPlatform;
  embedId: string;
  durationMinutes: number;
}

export interface PortfolioIllustration extends BasePortfolioMedia {
  mediaType: 'illustration';
  imagePath: string;
  altText: string;
  credit?: string;
}

export type PortfolioMedia = PortfolioVideo | PortfolioIllustration;

export type VideoLanguageFilter = VideoLanguage | 'ALL';

export type VideoTopicFilter = VideoTopic | 'ALL';

export interface VideoFilterOptions {
  language?: VideoLanguageFilter;
  topic?: VideoTopicFilter;
  query?: string;
}
