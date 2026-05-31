'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const consentKey = 'onlydrive-cookie-consent';

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  window.dataLayer.push({ event: 'cookie_consent_granted' });

  loadScript(
    'onlydrive-google-tag-manager',
    'https://www.googletagmanager.com/gtm.js?id=GTM-WWSMFTDZ',
  );
  loadScript(
    'onlydrive-google-analytics',
    'https://www.googletagmanager.com/gtag/js?id=G-Z6LH6QGHKT',
  );

  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  window.gtag('js', new Date());
  window.gtag('config', 'G-Z6LH6QGHKT');
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(consentKey);
    if (storedConsent === 'accepted') {
      loadAnalytics();
      return;
    }
    if (!storedConsent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(consentKey, 'accepted');
    loadAnalytics();
    setVisible(false);
  };

  const reject = () => {
    window.localStorage.setItem(consentKey, 'rejected');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-[28px] border border-yellow-400/20 bg-zinc-950/95 p-5 text-white shadow-2xl shadow-black/50 backdrop-blur-xl"
      role="dialog"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
          OnlyDrive Technologies may use cookies and analytics tools to understand website
          usage and improve the investor website. You can accept or reject non-essential
          cookies. Read our{' '}
          <Link className="font-bold text-yellow-300 underline underline-offset-4" href="/privacy-policy">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-yellow-400/50 hover:text-yellow-300"
            onClick={reject}
            type="button"
          >
            Reject non-essential cookies
          </button>
          <button
            className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
            onClick={accept}
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
