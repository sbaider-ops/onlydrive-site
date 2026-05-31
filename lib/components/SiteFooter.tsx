import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black px-6 py-10 text-sm text-zinc-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>© OnlyDrive Technologies. All rights reserved.</div>
        <nav
          aria-label="Legal and compliance links"
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <Link className="transition hover:text-yellow-300" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="transition hover:text-yellow-300" href="/accessibility">
            Accessibility Statement
          </Link>
          <Link className="transition hover:text-yellow-300" href="/legal">
            Legal Notice / Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
