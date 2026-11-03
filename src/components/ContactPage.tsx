import { FormEvent, useState } from 'react';
import { Mail, CalendarDays, Calculator, ArrowRight, Send } from 'lucide-react';
import { Link } from '../router';

const EMAIL = 'hello@aetheraanalytics.com';
const DEMO_URL = 'https://calendar.app.google/Vce1rhzMPGhr8cHS6';

const TOPICS = ['Book a demo', 'Pilot programme', 'Partnership or integration', 'Free SME calculator', 'Something else'];

const inputClass =
  'w-full bg-white border border-neutral-300 rounded-md px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15';
const labelClass = 'block font-mono text-[10px] font-bold text-neutral-600 tracking-wider uppercase mb-1.5';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', topic: TOPICS[0], message: '' });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // No backend: the form opens the visitor's email app with everything filled in
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `${form.topic} — ${form.company || form.name}`;
    const body = [form.message, '', `Name: ${form.name}`, `Company: ${form.company}`, `Email: ${form.email}`].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto w-full relative z-10">
      <div className="space-y-4 max-w-2xl mb-12">
        <span className="font-mono text-[9px] text-emerald-700 tracking-[0.2em] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full inline-block">
          CONTACT US
        </span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
          Let's talk about your sustainability data.
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed">
          Whether you're preparing for NSRF disclosure, answering a bank or buyer's data request, or exploring a pilot, we'd like to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="c-name">Your name</label>
              <input id="c-name" required className={inputClass} value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-company">Company</label>
              <input id="c-company" className={inputClass} value={form.company} onChange={set('company')} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-email">Work email</label>
              <input id="c-email" type="email" required className={inputClass} value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-topic">Topic</label>
              <select id="c-topic" className={inputClass} value={form.topic} onChange={set('topic')}>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="c-message">How can we help?</label>
            <textarea id="c-message" required rows={5} className={inputClass} value={form.message} onChange={set('message')} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="group bg-emerald-600 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase px-6 py-3 rounded transition-all duration-200 shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send message</span>
            </button>
            <span className="text-[11px] text-neutral-500">Opens your email app with your message ready to send.</span>
          </div>
        </form>

        <aside className="lg:col-span-5 space-y-4">
          {[
            { icon: Mail, title: 'Email us', text: EMAIL, href: `mailto:${EMAIL}`, external: false },
            { icon: CalendarDays, title: 'Book a demo', text: 'Pick a 30-minute slot that suits you', href: DEMO_URL, external: true },
          ].map(({ icon: Icon, title, text, href, external }) => (
            <a
              key={title}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-start gap-4 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors"
            >
              <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="block font-display font-bold text-sm text-neutral-900">{title}</span>
                <span className="block text-xs text-neutral-600 font-mono break-all">{text}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 mt-1" />
            </a>
          ))}
          <Link
            to="/sme-carbon-calculator"
            className="group flex items-start gap-4 bg-neutral-950 border border-neutral-800 rounded-xl p-5 shadow-xl"
          >
            <div className="w-9 h-9 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="block font-display font-bold text-sm text-white">Are you an SME?</span>
              <span className="block text-xs text-neutral-400">Work out your Scope 1 &amp; 2 footprint with our free calculator.</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 mt-1" />
          </Link>
          {/* TODO(content): business address and phone number, if you want them listed */}
        </aside>
      </div>
    </main>
  );
}
