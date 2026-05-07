'use client';

import { useState } from 'react';

export default function OnlyDriveInvestorLanding() {
  const [showGate, setShowGate] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const investorPassword = 'OnlyDrive2026';

  const handleAccess = () => {
    if (password === investorPassword) {
      window.open(
        'https://drive.google.com/file/d/1GemvM3jO0yxBezc8OBVU1g2fGkmQMHeN/view?usp=sharing',
        '_blank'
      );
      setShowGate(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
           <img
  src="/logo.png"
  alt="OnlyDrive Logo"
  className="h-12 w-auto"
/>

            <div>
              <div className="font-black text-xl">OnlyDrive</div>
              <div className="text-zinc-500 text-sm">
                Drive Focused. Drive Safe.
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-zinc-400 font-medium">
            <a href="#problem" className="hover:text-yellow-400 transition">
              Problem
            </a>
            <a href="#solution" className="hover:text-yellow-400 transition">
              Solution
            </a>
            <a href="#market" className="hover:text-yellow-400 transition">
              Market
            </a>
            <a href="#team" className="hover:text-yellow-400 transition">
              Team
            </a>
          </div>

          <button
            onClick={() => setShowGate(true)}
            className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Investor Access
          </button>
        </div>
      </nav>

      <section className="min-h-screen flex items-center pt-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">
          <div>
            <div className="inline-flex border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 rounded-full px-5 py-2 text-sm mb-8">
              Pre-Seed InsureTech Startup
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] mb-10">
              The New
              <br />
              Standard For
              <br />
              <span className="text-yellow-400">
                Distraction-Free Driving
              </span>
            </h1>

            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mb-12">
              OnlyDrive combines hardware, algorithms, behavioral verification and insurance intelligence into one ecosystem designed to reduce distracted driving.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setShowGate(true)}
                className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20"
              >
                Request Investor Access
              </button>

              <a
                href="https://calendly.com/sbaider/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-10 py-5 rounded-2xl font-semibold hover:border-yellow-500 hover:text-yellow-300 transition text-lg inline-block"
              >
                Schedule Introduction
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative border border-yellow-500/20 rounded-[40px] bg-gradient-to-br from-zinc-950 to-black p-10 shadow-2xl shadow-yellow-500/10">
              <div className="aspect-square rounded-[32px] border border-white/10 bg-black flex flex-col items-center justify-center text-center p-10">
                <div className="text-8xl font-black text-yellow-400 mb-6">
                  OD
                </div>

                <div className="text-3xl font-bold mb-4">
                  Investor Preview Protected
                </div>

                <div className="text-zinc-500 max-w-sm leading-relaxed mb-8">
                  Product visuals and system architecture are available only through protected investor access.
                </div>

                <div className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 rounded-full px-6 py-3 text-sm">
                  Patent Pending Technology
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-6">
            The Problem
          </div>

          <h2 className="text-5xl font-black mb-16 max-w-4xl leading-tight">
            Smartphones became the most dangerous object inside modern vehicles.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-5xl font-black text-yellow-400 mb-4">94%</div>
              <div className="text-zinc-400 leading-relaxed">
                Of drivers admit using smartphones while driving.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-5xl font-black text-yellow-400 mb-4">$129B</div>
              <div className="text-zinc-400 leading-relaxed">
                Annual economic impact from distracted driving accidents.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-5xl font-black text-yellow-400 mb-4">Global</div>
              <div className="text-zinc-400 leading-relaxed">
                Regulatory pressure and insurer demand are accelerating adoption.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-6">
              The Solution
            </div>

            <h2 className="text-5xl font-black mb-10 leading-tight">
              Hardware + Software + Insurance Intelligence.
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                OnlyDrive creates a controlled driving environment designed to eliminate dangerous phone distraction.
              </p>

              <p>
                The platform combines physical interaction, verification systems and behavioral monitoring into one scalable mobility ecosystem.
              </p>

              <p>
                The long-term opportunity extends into insurance scoring, fleet management and mobility safety infrastructure.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-yellow-400 font-bold mb-3">Hardware Layer</div>
              <div className="text-zinc-400">
                Physical distraction prevention infrastructure.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-yellow-400 font-bold mb-3">Verification Engine</div>
              <div className="text-zinc-400">
                Behavioral monitoring and compliance validation.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-8 bg-zinc-950/50">
              <div className="text-yellow-400 font-bold mb-3">Insurance Integration</div>
              <div className="text-zinc-400">
                Future insurer partnerships and risk reduction opportunities.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="market" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-6">
            Market Opportunity
          </div>

          <h2 className="text-5xl font-black mb-10">
            Positioned at the intersection of Mobility, Safety and InsureTech.
          </h2>

          <p className="text-zinc-400 text-xl max-w-4xl mx-auto leading-relaxed mb-20">
            OnlyDrive targets consumers, insurers, fleets, regulators and mobility platforms seeking measurable reduction in distracted driving risk.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/10 rounded-3xl p-10 bg-zinc-950/50">
              <div className="text-6xl font-black text-yellow-400 mb-4">B2C</div>
              <div className="text-zinc-400">
                Consumer safety and driving accountability.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-10 bg-zinc-950/50">
              <div className="text-6xl font-black text-yellow-400 mb-4">B2B</div>
              <div className="text-zinc-400">
                Fleet management and enterprise mobility.
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl p-10 bg-zinc-950/50">
              <div className="text-6xl font-black text-yellow-400 mb-4">API</div>
              <div className="text-zinc-400">
                Insurance scoring and behavioral data infrastructure.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-6">
            Founder
          </div>

          <h2 className="text-5xl font-black mb-8">
            Built around communication, regulation and mobility insight.
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed max-w-3xl mx-auto mb-16">
            OnlyDrive is led by extensive experience in media, communications, public influence and strategic positioning around transportation and public safety.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button
              onClick={() => setShowGate(true)}
              className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
            >
              Investor Access
            </button>

            <a
              href="https://calendly.com/sbaider/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-10 py-5 rounded-2xl font-semibold hover:border-yellow-500 hover:text-yellow-300 transition text-lg inline-block"
            >
              Schedule Introduction
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500">
          <div>© 2026 OnlyDrive. All rights reserved.</div>
          <div>Patent Pending • Investor Materials Available Upon Request</div>
        </div>
      </footer>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6">
          <div className="w-full max-w-md bg-zinc-950 border border-yellow-500/20 rounded-[32px] p-10 shadow-2xl shadow-yellow-500/10 relative">
            <button
              onClick={() => {
                setShowGate(false);
                setError(false);
              }}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white text-2xl"
            >
              ×
            </button>

            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              Investor Access
            </div>

            <h3 className="text-3xl font-black text-center mb-4">
              Enter Access Code
            </h3>

            <p className="text-zinc-400 text-center mb-8 leading-relaxed">
              This presentation contains protected pre-seed investor materials.
            </p>

            <input
              type="password"
              placeholder="Investor access code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-500 mb-4"
            />

            {error && (
              <div className="text-red-400 text-sm mb-4">
                Incorrect access code.
              </div>
            )}

            <button
              onClick={handleAccess}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-300 text-black py-4 rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform"
            >
              Access Investor Deck
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
