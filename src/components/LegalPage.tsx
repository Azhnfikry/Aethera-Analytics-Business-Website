import { ArrowLeft } from 'lucide-react';
import { Link } from '../router';

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = 'Aethera Analytica Solution (CA0421550-V)';
const EMAIL = 'hello@aetheraanalytics.com';

export const LEGAL_DOCS: Record<'privacy' | 'terms', LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: '27 October 2026',
    intro: `This Privacy Policy explains how ${COMPANY} ("Aethera", "we", "us") collects, uses and protects personal data when you visit aetheraanalytics.com or contact us, in line with Malaysia's Personal Data Protection Act 2010 (PDPA).`,
    sections: [
      {
        heading: 'Personal data we collect',
        body: [
          'Information you give us: your name, email address, company, job title and any message you send when you email us, book a demo, or take part in a pilot programme.',
          'Usage information: aggregated, anonymous statistics about how the website is used, such as pages viewed and the type of device, collected through Vercel Web Analytics. This does not use cookies and does not identify you personally.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'To respond to your enquiries, arrange and hold demos, and run pilot programmes.',
          'To send you information about Aethera that you have asked for. You can opt out at any time.',
          'To understand how the website is used and improve it.',
        ],
      },
      {
        heading: 'Third parties',
        body: [
          'We do not sell your personal data. We share it only with service providers that help us operate, such as Google (email and demo scheduling) and Vercel (website hosting and analytics), and only as needed for those services.',
          'These providers may process data on servers outside Malaysia. Where this happens, we rely on providers that apply appropriate safeguards to protect your data.',
          'We may disclose personal data where required by law.',
        ],
      },
      {
        heading: 'Retention and security',
        body: [
          'We keep personal data only as long as needed for the purposes above or as required by law, then delete it.',
          'We take reasonable technical and organisational measures to protect personal data against loss, misuse and unauthorised access.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Under the PDPA you may request access to, or correction of, the personal data we hold about you, and you may withdraw your consent or limit how we process it. Email ${EMAIL} and we will respond within the time required by law.`,
        ],
      },
      {
        heading: 'Changes and contact',
        body: [
          'We may update this policy from time to time; the date above shows when it last changed.',
          `For any question about this policy or your personal data, contact us at ${EMAIL}.`,
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: '27 October 2026',
    intro: `These terms govern your use of the aetheraanalytics.com website, operated by ${COMPANY}. By using the website you agree to them. Use of the Aethera product itself, including pilot programmes, is governed by a separate agreement.`,
    sections: [
      {
        heading: 'Use of the website',
        body: [
          'You may use this website for lawful purposes only. You must not attempt to disrupt it, gain unauthorised access to it, or use it to transmit harmful material.',
        ],
      },
      {
        heading: 'Content',
        body: [
          'Content on this website, including articles and descriptions of our product, is provided for general information. It is not professional, legal or regulatory advice, and you should not rely on it as such.',
          'We aim to keep information accurate and up to date but make no warranty that it is complete or current.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The Aethera name, logo, text and design of this website belong to Aethera. Third-party names and logos belong to their respective owners. You may not copy or reuse our content for commercial purposes without our written permission.',
        ],
      },
      {
        heading: 'Links to other websites',
        body: [
          'This website links to third-party services, such as Google Calendar for booking demos. We are not responsible for their content or practices.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'To the extent permitted by law, Aethera is not liable for any loss arising from your use of, or reliance on, this website.',
        ],
      },
      {
        heading: 'Governing law and contact',
        body: [
          'These terms are governed by the laws of Malaysia. We may update them from time to time; the date above shows when they last changed.',
          `Questions? Contact us at ${EMAIL}.`,
        ],
      },
    ],
  },
};

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="pt-28 pb-20 px-6 max-w-3xl mx-auto w-full relative z-10 animate-fade-in">
      <Link
        to="/"
        className="group mb-8 flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-neutral-500 hover:text-emerald-700 transition-colors cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK TO HOME</span>
      </Link>

      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <h1 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight">{doc.title}</h1>
        <p className="text-[11px] font-mono text-neutral-500">LAST UPDATED: {doc.updated.toUpperCase()}</p>
        <p className="text-sm text-neutral-700 font-sans leading-relaxed">{doc.intro}</p>
      </div>

      <div className="pt-8 space-y-8">
        {doc.sections.map((s) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="font-display font-semibold text-lg text-neutral-900">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sm text-neutral-700 font-sans leading-relaxed">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
