import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { View } from './types';

export interface Route {
  view: View;
  postId?: string;
}

export const PATHS: Record<View, string> = {
  home: '/',
  about: '/about',
  blog: '/blog',
  privacy: '/privacy',
  terms: '/terms',
};

export function parsePath(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  const post = path.match(/^\/blog\/([\w-]+)$/);
  if (post) return { view: 'blog', postId: post[1] };
  const view = (Object.keys(PATHS) as View[]).find((v) => PATHS[v] === path);
  return { view: view ?? 'home' };
}

// Scroll to the #hash section once the new page has rendered, otherwise to the top
function scrollAfterNavigate(hash: string) {
  setTimeout(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80; // navbar height
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, 50);
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  if (url.pathname + url.hash !== window.location.pathname + window.location.hash) {
    window.history.pushState(null, '', url.pathname + url.hash);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  scrollAfterNavigate(url.hash);
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parsePath(window.location.pathname));
  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    // Deep links like /#how-it-works on first load
    if (window.location.hash) scrollAfterNavigate(window.location.hash);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return route;
}

// Keeps title, description and canonical URL in sync with the current page
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.aetheraanalytics.com${path}`);
  }, [title, description, path]);
}

interface LinkProps {
  to: string;
  className?: string;
  children?: ReactNode;
}

// A real <a href> (crawlable, opens in new tab) that navigates without a page reload
export function Link({ to, className, children }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handleClick} className={className}>{children}</a>;
}
