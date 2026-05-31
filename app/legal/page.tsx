import Link from 'next/link';

const updated = 'May 31, 2026';

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white selection:bg-yellow-400 selection:text-black">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm font-bold text-yellow-300 transition hover:text-yellow-200" href="/">
          Back to OnlyDrive
        </Link>

        <p className="mt-12 text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Legal Notice / Terms
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {updated}</p>

        <div className="mt-12 space-y-10 text-base leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-black text-white">General Information Only</h2>
            <p className="mt-3">
              The content on this website is provided for general informational and
              investor communication purposes only. It does not constitute legal,
              financial, investment, insurance, regulatory, technical, or other
              professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">No Offer or Recommendation</h2>
            <p className="mt-3">
              Nothing on this website should be interpreted as an offer to sell, a
              solicitation to buy, or a recommendation regarding any securities,
              investment, insurance product, regulatory decision, or commercial
              transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Product and Business Statements</h2>
            <p className="mt-3">
              Statements about OnlyDrive Technologies, its platform, technology, roadmap,
              safety potential, insurance relevance, or commercial opportunities are
              preliminary and may change without notice. Any described solution is
              designed to support focused driving, intended to help reduce distraction,
              and may enable future business or safety workflows, subject to regulatory,
              commercial and technical validation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Third-Party Links</h2>
            <p className="mt-3">
              This website may link to third-party websites, documents, scheduling tools,
              cloud services, or other resources. OnlyDrive Technologies is not
              responsible for third-party content, practices, availability, or security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Changes</h2>
            <p className="mt-3">
              Website content, product descriptions, investor materials, legal notices,
              and terms may be changed, removed, or updated without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Rights Reserved</h2>
            <p className="mt-3">© OnlyDrive Technologies. All rights reserved.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
