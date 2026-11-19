import { BlogPost, BlogCategorySlug, CoverArtKind } from '@/types/blog';

export interface CategoryDefinition {
  slug: BlogCategorySlug;
  i18nKey: string;
  defaultCoverArt: CoverArtKind;
  matchedNames: string[];
}

export const BLOG_CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'case-studies',
    i18nKey: 'blog.cat.case-studies',
    defaultCoverArt: 'chat',
    matchedNames: ['case studies', 'case study', 'case-studies'],
  },
  {
    slug: 'economics-roi',
    i18nKey: 'blog.cat.economics-roi',
    defaultCoverArt: 'bars',
    matchedNames: ['economics & roi', 'economics and roi', 'roi', 'economics-roi'],
  },
  {
    slug: 'web-development',
    i18nKey: 'blog.cat.web-development',
    defaultCoverArt: 'browser',
    matchedNames: ['web development', 'web-development', 'websites'],
  },
  {
    slug: 'ai-automation',
    i18nKey: 'blog.cat.ai-automation',
    defaultCoverArt: 'bot',
    matchedNames: ['ai & automation', 'ai and automation', 'ai automation', 'ai-automation', 'ai & business'],
  },
  {
    slug: 'business-strategy',
    i18nKey: 'blog.cat.business-strategy',
    defaultCoverArt: 'dots',
    matchedNames: ['business strategy', 'business-strategy', 'strategy'],
  },
];

export function getCategorySlug(categoryName: string): BlogCategorySlug {
  const normalized = categoryName.trim().toLowerCase();
  for (const cat of BLOG_CATEGORIES) {
    if (cat.matchedNames.some((name) => normalized === name || normalized.includes(name))) {
      return cat.slug;
    }
  }
  return 'web-development';
}

export function getCategoryDefinition(slug: BlogCategorySlug): CategoryDefinition {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) || BLOG_CATEGORIES[0];
}

export function getCoverArtForPost(post: BlogPost): CoverArtKind {
  if (post.frontmatter.coverArt) {
    return post.frontmatter.coverArt;
  }
  const slug = getCategorySlug(post.frontmatter.category);
  const def = getCategoryDefinition(slug);
  return def.defaultCoverArt;
}

export function formatBlogDate(dateStr: string, lang: string = 'en'): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const localeMap: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN-u-nu-latn',
    mr: 'mr-IN-u-nu-latn',
  };
  const locale = localeMap[lang] || 'en-IN';
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function formatReadTime(readTimeStr: string, t: (key: string, vars?: any) => string): string {
  const match = readTimeStr.match(/\d+/);
  const minutes = match ? match[0] : '5';
  return t('blog.min_read', { n: minutes });
}

export interface SanitizedPostData {
  title: string;
  excerpt: string;
  isUnverified: boolean;
  categorySlug: BlogCategorySlug;
  coverArt: CoverArtKind;
}

export function sanitizePostClaims(post: BlogPost): SanitizedPostData {
  const { title, excerpt } = post.frontmatter;
  const categorySlug = getCategorySlug(post.frontmatter.category);
  const coverArt = getCoverArtForPost(post);

  return {
    title,
    excerpt,
    isUnverified: false,
    categorySlug,
    coverArt,
  };
}
