export type BlogCategorySlug =
  | 'case-studies'
  | 'economics-roi'
  | 'web-development'
  | 'ai-automation'
  | 'business-strategy';

export type CoverArtKind = 'chat' | 'bars' | 'browser' | 'bot' | 'dots';

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  coverArt?: CoverArtKind;
  verified?: boolean;
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime?: string;
}
