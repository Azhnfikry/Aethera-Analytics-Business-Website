import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

interface BlogProps {
  onBack: () => void;
}

const CATEGORIES = ['All', 'Methodology', 'Regulation', 'Product', 'Insights'] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Blog({ onBack }: BlogProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((p) => activeCategory === 'All' || p.category === activeCategory);
  // Only show filters for categories that have posts
  const categories = CATEGORIES.filter((c) => c === 'All' || BLOG_POSTS.some((p) => p.category === c));

  const openArticle = (post: BlogPost | null) => {
    setOpenPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (openPost) {
    return (
      <article className="pt-28 pb-20 px-6 max-w-3xl mx-auto w-full relative z-10 animate-fade-in">
        <button
          onClick={() => openArticle(null)}
          className="group mb-8 flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-neutral-500 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL ARTICLES</span>
        </button>

        <div className="space-y-4 pb-8 border-b border-neutral-200">
          <span className="font-mono text-[9px] text-emerald-700 tracking-[0.2em] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full w-fit inline-block">
            {openPost.category}
          </span>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
            {openPost.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-neutral-500">
            <span className="font-bold text-neutral-800">{openPost.author}</span>
            <span>{formatDate(openPost.publishedAt)}</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{openPost.readMinutes} MIN READ</span>
            </span>
          </div>
        </div>

        <div className="pt-8 text-sm sm:text-base text-neutral-900 font-sans leading-relaxed space-y-5">
          {openPost.content.map((block, i) =>
            block.startsWith('## ') ? (
              <h2 key={i} className="font-display font-semibold text-xl text-neutral-900 pt-4">
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i}>{block}</p>
            )
          )}
        </div>

        <div className="mt-12 p-5 bg-emerald-50/40 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-emerald-950 font-sans font-medium">
            See how Aethera puts this into practice for your organization.
          </p>
          <a
            href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase px-5 py-3 rounded transition-all duration-200 shadow-md flex items-center space-x-2 w-fit shrink-0"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </article>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto w-full relative z-10 animate-fade-in">
      <button
        onClick={onBack}
        className="group mb-8 flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-neutral-500 hover:text-emerald-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK TO HOME & WORKSPACE</span>
      </button>

      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 text-emerald-700 font-mono text-[10px] uppercase tracking-[0.25em] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>AETHERA INSIGHTS</span>
        </div>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
          Blog
        </h1>
        <p className="max-w-xl text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed">
          Methodology notes, regulatory updates and practical guidance for sustainability teams.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`font-mono text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded border transition-colors cursor-pointer ${
              activeCategory === c
                ? 'bg-neutral-900 border-neutral-900 text-white'
                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post, idx) => (
          <button
            key={post.id}
            onClick={() => openArticle(post)}
            className={`group text-left bg-white border border-neutral-200 rounded-xl p-6 space-y-3 hover:border-emerald-300 shadow-xs transition-all duration-300 cursor-pointer flex flex-col ${
              idx === 0 && activeCategory === 'All' ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-emerald-700 font-bold tracking-wider uppercase">{post.category}</span>
              <span className="text-neutral-400">{formatDate(post.publishedAt)}</span>
            </div>
            <h2 className="font-display font-semibold text-lg text-neutral-900 leading-snug group-hover:text-emerald-700 transition-colors">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-neutral-500">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readMinutes} MIN READ</span>
              </span>
              <span className="flex items-center space-x-1 font-bold text-emerald-700">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 text-sm text-neutral-500 flex flex-col items-center space-y-2">
          <BookOpen className="w-5 h-5 text-neutral-400" />
          <span>No articles in this category yet.</span>
        </div>
      )}
    </div>
  );
}
