import Link from 'next/link';

const updated = 'May 31, 2026';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white selection:bg-yellow-400 selection:text-black">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm font-bold text-yellow-300 transition hover:text-yellow-200" href="/">
          Back to OnlyDrive
        </Link>

        <p className="mt-12 text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {updated}</p>

        <div className="mt-12 space-y-10 text-base leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-black text-white">Overview</h2>
            <p className="mt-3">
              This Privacy Policy explains how OnlyDrive Technologies may collect, use,
              store, and share information through this website and related investor
              communication channels. This policy is intended to provide general
              transparency and may be updated from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Information We May Collect</h2>
            <p className="mt-3">
              We may collect personal details that you choose to submit through contact
              forms or other communications, including name, email address, company,
              role, phone number if provided, and message content.
            </p>
            <p className="mt-3">
              We may also collect technical data such as IP address, browser type,
              device information, operating system, cookies, analytics data, pages
              visited, referring URLs, and other website usage information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">How We Use Information</h2>
            <p className="mt-3">
              Information may be used to respond to inquiries, manage investor and
              business communications, send relevant business information, improve the
              website, maintain security, prevent misuse, and keep legal or business
              records where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Cookies and Analytics</h2>
            <p className="mt-3">
              The website may use cookies, analytics, pixels, or similar technologies.
              Non-essential analytics or tracking tools are only loaded after you provide
              consent through the cookie banner. You may reject non-essential cookies
              through the banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Service Providers</h2>
            <p className="mt-3">
              Information may be processed by third-party service providers that support
              website hosting, analytics, email, CRM, cloud infrastructure, security,
              communications, and other business tools. These providers may process data
              on our behalf and subject to their own applicable terms and safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Data Retention</h2>
            <p className="mt-3">
              We retain information for as long as reasonably needed for the purposes
              described in this policy, including business communication, security,
              legal, accounting, and record-keeping needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of personal data
              associated with you, subject to applicable law and legitimate business or
              legal retention needs.
            </p>
            <p className="mt-3">
              To make a privacy request, contact us at{' '}
              <a className="font-bold text-yellow-300 underline underline-offset-4" href="mailto:privacy@onlydrive.tech">
                privacy@onlydrive.tech
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
