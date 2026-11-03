import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Blog from './components/Blog';
import HowItWorksPage from './components/HowItWorksPage';
import ContactPage from './components/ContactPage';
import SmeCalculator from './components/SmeCalculator';
import LegalPage, { LEGAL_DOCS } from './components/LegalPage';
import { BLOG_POSTS } from './data';
import { PATHS, navigate, usePageMeta, useRoute } from './router';

const SITE = 'Aethera Analytics';
const DEFAULT_DESCRIPTION = 'Sustainability data infrastructure for Malaysian companies. Collect, validate and trace data from every source into an audit-ready foundation.';

const PAGE_META = {
  home: { title: `${SITE} | Sustainability data infrastructure for NSRF disclosure`, description: DEFAULT_DESCRIPTION },
  about: { title: `About Us | ${SITE}`, description: 'Aethera is building sustainability data infrastructure for Malaysian companies. Meet co-founders Azhan Fikri and Bryan Lai and learn about our mission.' },
  howItWorks: { title: `How It Works | ${SITE}`, description: 'How Aethera collects, validates and traces sustainability data from bills, ERPs and suppliers into an audit-ready foundation, with your team approving every change.' },
  contact: { title: `Contact Us | ${SITE}`, description: 'Contact Aethera Analytics about sustainability data, NSRF disclosure, pilots and partnerships.' },
  sme: { title: `Free Scope 1 & 2 Carbon Calculator for Malaysian SMEs | ${SITE}`, description: 'Free carbon calculator for Malaysian SMEs. Work out Scope 1 and 2 emissions with official grid factors, print a report, and see green financing and tax incentives to explore.' },
  blog: { title: `Blog | ${SITE}`, description: 'Methodology notes, regulatory updates and practical guidance for sustainability teams.' },
  privacy: { title: `Privacy Policy | ${SITE}`, description: 'How Aethera collects, uses and protects personal data under the Malaysian PDPA.' },
  terms: { title: `Terms of Service | ${SITE}`, description: 'Terms governing use of the aetheraanalytics.com website.' },
};

export default function App() {
  const route = useRoute();
  const post = route.postId ? BLOG_POSTS.find((p) => p.id === route.postId) : undefined;

  const meta = post
    ? { title: `${post.title} | ${SITE}`, description: post.excerpt, path: `/blog/${post.id}` }
    : { ...PAGE_META[route.view], path: PATHS[route.view] };
  usePageMeta(meta.title, meta.description, meta.path);

  const goHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-neutral-50 print:bg-white font-sans text-neutral-800 selection:bg-emerald-500/10 selection:text-emerald-700 relative overflow-hidden">

      {/* Aesthetic high-end thin border gridlines to anchor look */}
      <div className="print:hidden absolute inset-y-0 left-6 sm:left-12 lg:left-24 w-[1px] bg-neutral-200/50 pointer-events-none border-dashed z-0"></div>
      <div className="print:hidden absolute inset-y-0 right-6 sm:right-12 lg:right-24 w-[1px] bg-neutral-200/50 pointer-events-none border-dashed z-0"></div>

      {/* Corporate header navigation */}
      <Navbar currentView={route.view} />

      {route.view === 'home' && <Home />}
      {route.view === 'about' && <AboutUs onBack={goHome} />}
      {route.view === 'howItWorks' && <HowItWorksPage />}
      {route.view === 'contact' && <ContactPage />}
      {route.view === 'sme' && <SmeCalculator />}
      {route.view === 'blog' && <Blog onBack={goHome} post={post} />}
      {(route.view === 'privacy' || route.view === 'terms') && <LegalPage doc={LEGAL_DOCS[route.view]} />}

      {/* Compact footer Columns */}
      <Footer />

    </div>
  );
}
