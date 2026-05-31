import Link from 'next/link';

const updated = 'May 31, 2026';

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white selection:bg-yellow-400 selection:text-black">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm font-bold text-yellow-300 transition hover:text-yellow-200" href="/">
          Back to OnlyDrive
        </Link>

        <p className="mt-12 text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
          Accessibility
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Accessibility Statement
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {updated}</p>

        <div className="mt-12 space-y-10 text-base leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-black text-white">Our Commitment</h2>
            <p className="mt-3">
              OnlyDrive Technologies aims to make this website accessible to people with
              disabilities and to provide a usable experience for as many visitors as
              possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Accessibility Standards</h2>
            <p className="mt-3">
              We aim to follow WCAG 2.0 AA and Israeli Standard 5568 where applicable,
              subject to the nature of the website, third-party services, and ongoing
              technical validation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Ongoing Improvements</h2>
            <p className="mt-3">
              We review the website to support keyboard navigation, visible focus
              states, alt text for meaningful images, sufficient contrast, mobile
              accessibility, reduced-motion preferences, and clear names for links,
              buttons, and form fields.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Report an Accessibility Issue</h2>
            <p className="mt-3">
              If you experience an accessibility issue or need information in an
              alternative format, please contact us and describe the page, issue, browser
              or assistive technology used, and your preferred contact details.
            </p>
            <p className="mt-3">
              Accessibility contact:{' '}
              <a className="font-bold text-yellow-300 underline underline-offset-4" href="mailto:accessibility@onlydrive.tech">
                accessibility@onlydrive.tech
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
