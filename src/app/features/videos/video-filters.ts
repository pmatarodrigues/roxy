import {
  PortfolioMedia,
  VideoFilterOptions,
  VideoLanguageFilter,
  VideoTopicFilter,
} from './video.model';

const normalizeQuery = (query: string): string => query.trim().toLowerCase();

const includesQuery = (media: PortfolioMedia, query: string): boolean => {
  if (!query) {
    return true;
  }

  const searchableFields = [
    media.title,
    media.originalTitle ?? '',
    media.summary,
    ...media.tags,
  ].map((field) => field.toLowerCase());

  return searchableFields.some((field) => field.includes(query));
};

const matchesLanguage = (media: PortfolioMedia, language: VideoLanguageFilter): boolean => {
  if (language === 'ALL') {
    return true;
  }

  return media.language === language;
};

const matchesTopic = (media: PortfolioMedia, topic: VideoTopicFilter): boolean => {
  if (topic === 'ALL') {
    return true;
  }

  return media.topic === topic;
};

export const filterVideos = (
  mediaItems: readonly PortfolioMedia[],
  options: VideoFilterOptions = {},
): readonly PortfolioMedia[] => {
  const language = options.language ?? 'ALL';
  const topic = options.topic ?? 'ALL';
  const query = normalizeQuery(options.query ?? '');

  return mediaItems.filter(
    (media) =>
      matchesLanguage(media, language) && matchesTopic(media, topic) && includesQuery(media, query),
  );
};

export const countVideosByLanguage = (
  mediaItems: readonly PortfolioMedia[],
): Readonly<Record<VideoLanguageFilter, number>> => {
  const initialCount: Record<VideoLanguageFilter, number> = {
    ALL: mediaItems.length,
    EN: 0,
    PT: 0,
  };

  return mediaItems.reduce<Record<VideoLanguageFilter, number>>((accumulator, media) => {
    const nextCount = accumulator[media.language] + 1;

    return {
      ...accumulator,
      [media.language]: nextCount,
    };
  }, initialCount);
};
