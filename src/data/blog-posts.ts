export interface BlogPost {
  slug: string;
  date: string;
  readTime: number;
  image?: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  tags: string[];
}

// TODO: Add real blog posts here. Each post needs title, excerpt, and content
// in all 3 languages. Content supports basic HTML.
export const blogPosts: BlogPost[] = [];
