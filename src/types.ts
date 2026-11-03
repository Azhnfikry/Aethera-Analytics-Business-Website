export type View = 'home' | 'about' | 'howItWorks' | 'contact' | 'sme' | 'blog' | 'privacy' | 'terms';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Methodology' | 'Regulation' | 'Product' | 'Insights';
  author: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  content: string[]; // paragraphs; lines starting with "## " render as subheadings
}
