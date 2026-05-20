import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TranslatePipe } from '../../features/i18n/translate.pipe';

import { PORTFOLIO_MEDIA } from '../../features/videos/video.data';
import { filterVideos } from '../../features/videos/video-filters';
import {
  PortfolioIllustration,
  PortfolioMedia,
  PortfolioMediaType,
  PortfolioVideo,
  VideoLanguageFilter,
  VideoTopic,
  VideoTopicFilter,
} from '../../features/videos/video.model';

interface FilterOption<TValue extends string> {
  readonly value: TValue;
  readonly label: string;
}

interface GalleryVideo extends PortfolioVideo {
  readonly safeEmbedUrl: SafeResourceUrl;
}

type GalleryMedia = GalleryVideo | PortfolioIllustration;

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID_PATTERN = /^\d{6,12}$/;

const LANGUAGE_OPTIONS: readonly FilterOption<VideoLanguageFilter>[] = [
  { value: 'ALL', label: 'Todos' },
  { value: 'EN', label: 'EN' },
  { value: 'PT', label: 'PT' },
];

const TOPIC_OPTIONS: readonly FilterOption<VideoTopicFilter>[] = [
  { value: 'ALL', label: 'Todos' },
  {
    value: 'circulating-tumour-cells',
    label: 'Circulating tumour cells / Células tumorais circulantes',
  },
  { value: 'gastrointestinal-oncology', label: 'GI oncology / Oncologia GI' },
  { value: 'microfluidics', label: 'Microfluidics' },
  { value: 'clinical-evidence', label: 'Clinical evidence / Evidência clínica' },
  { value: 'science-outreach', label: 'Science outreach / Divulgação científica' },
];

const TOPIC_LABELS: Readonly<Record<VideoTopic, string>> = {
  'circulating-tumour-cells': 'CTCs',
  'gastrointestinal-oncology': 'GI oncology',
  microfluidics: 'Microfluidics',
  'clinical-evidence': 'Clinical evidence',
  'science-outreach': 'Science outreach',
};

const MEDIA_TYPE_LABELS: Readonly<Record<PortfolioMediaType, string>> = {
  video: 'Video / Vídeo',
  illustration: 'Illustration / Ilustração',
};

const buildTrustedEmbedUrl = (video: PortfolioVideo): string | null => {
  if (video.platform === 'youtube') {
    return YOUTUBE_ID_PATTERN.test(video.embedId)
      ? `https://www.youtube.com/embed/${video.embedId}`
      : null;
  }

  return VIMEO_ID_PATTERN.test(video.embedId)
    ? `https://player.vimeo.com/video/${video.embedId}`
    : null;
};

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss',
})
export class VideoGalleryComponent {
  public readonly languageOptions = LANGUAGE_OPTIONS;
  public readonly topicOptions = TOPIC_OPTIONS;

  public readonly languageFilter = signal<VideoLanguageFilter>('ALL');
  public readonly topicFilter = signal<VideoTopicFilter>('ALL');
  public readonly searchQuery = signal('');

  private readonly mediaItems = PORTFOLIO_MEDIA;
  private readonly sanitizer = inject(DomSanitizer);
  private readonly dateFormatter = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  private readonly safeEmbedMap = new Map<string, SafeResourceUrl | null>(
    this.mediaItems
      .filter((item): item is PortfolioVideo => item.mediaType === 'video')
      .map((video) => [video.id, this.createSafeEmbedUrl(video)]),
  );

  public readonly visibleMedia = computed<readonly GalleryMedia[]>(() => {
    const filteredMedia = filterVideos(this.mediaItems, {
      language: this.languageFilter(),
      topic: this.topicFilter(),
      query: this.searchQuery(),
    });

    return filteredMedia
      .map((media) => {
        if (media.mediaType === 'illustration') {
          return media;
        }

        const safeEmbedUrl = this.safeEmbedMap.get(media.id) ?? null;
        if (!safeEmbedUrl) {
          return null;
        }

        return {
          ...media,
          safeEmbedUrl,
        };
      })
      .filter((media): media is GalleryMedia => media !== null);
  });

  public setLanguage(nextLanguage: VideoLanguageFilter): void {
    this.languageFilter.set(nextLanguage);
  }

  public setTopic(nextTopic: string): void {
    this.topicFilter.set((nextTopic as VideoTopicFilter) ?? 'ALL');
  }

  public setSearchQuery(nextQuery: string): void {
    this.searchQuery.set(nextQuery);
  }

  public getTopicLabel(topic: VideoTopic): string {
    return TOPIC_LABELS[topic];
  }

  public getMediaTypeLabel(mediaType: PortfolioMediaType): string {
    return MEDIA_TYPE_LABELS[mediaType];
  }

  public formatPublicationDate(publicationDate: string): string {
    return this.dateFormatter.format(new Date(publicationDate));
  }

  public isVideo(media: GalleryMedia): media is GalleryVideo {
    return media.mediaType === 'video';
  }

  public isIllustration(media: GalleryMedia): media is PortfolioIllustration {
    return media.mediaType === 'illustration';
  }

  private createSafeEmbedUrl(video: PortfolioVideo): SafeResourceUrl | null {
    const trustedUrl = buildTrustedEmbedUrl(video);
    if (!trustedUrl) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(trustedUrl);
  }
}
