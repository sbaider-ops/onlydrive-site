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
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-yellow-400 selection:text-black">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="OnlyDrive Logo"
              className="h-12 w-auto"
            />

            <div>
              <div className="font-black text-xl tracking-tight">
                OnlyDrive
              </div>

              <div className="text-zinc-500 text-sm">
                Drive Focused. Drive Safe.
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-zinc-400 font-medium text-sm">
            <a href="#problem" className="hover:text-yellow-400 transition">
              Problem
            </a>

            <a href="#vision" className="hover:text-yellow-400 transition">
              Vision
            </a>

            <a href="#opportunity" className="hover:text-yellow-400 transition">
              Opportunity
            </a>

            <a href="#contact" className="hover:text-yellow-400 transition">
              Contact
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

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 pt-32 relative">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">

          <div>

            <div className="inline-flex border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 rounded-full px-5 py-2 text-sm mb-10 tracking-wide">
              Pre-Seed Mobility Safety Startup
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1] tracking-tight mb-10">
              Phones became the most dangerous object inside modern vehicles.
            </h1>

            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mb-14">
              OnlyDrive is building a new safety layer designed to reduce distracted driving before accidents happen.
            </p>

            <div className="flex flex-wrap gap-5 mb-14">

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

            <div className="flex items-center gap-10 text-sm text-zinc-500 flex-wrap">
              <div>Patent Pending</div>
              <div>Insurance Infrastructure</div>
              <div>Behavioral Safety Platform</div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">

            <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative border border-white/10 bg-gradient-to-br from-zinc-950 to-black rounded-[40px] p-12 w-full max-w-[520px] shadow-2xl shadow-yellow-500/10">

              <div className="aspect-square rounded-[32px] border border-white/10 bg-black flex flex-col items-center justify-center text-center p-10">

                <img
                  src="/logo.png"
                  alt="OnlyDrive Logo"
                  className="h-40 w-auto mb-10"
                />

                <div className="text-3xl font-black mb-5 tracking-tight">
                  Investor Preview Protected
                </div>

                <p className="text-zinc-500 leading-relaxed max-w-sm mb-10">
                  Product architecture, demonstrations and strategic materials are available through protected investor access.
                </p>

                <div className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 rounded-full px-6 py-3 text-sm tracking-wide">
                  Confidential Pre-Seed Materials
                <<a
  href="https://drive.google.com/file/d/1zhWDwoKZyW9MymOCXVj2gCcSe5QLp6ed/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 rounded-full px-6 py-3 text-sm tracking-wide hover:bg-yellow-500 hover:text-black transition"
>
  Open Strategic Roadmap
</a>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          <div className="text-yellow-400 uppercase tracking-[0.25em] text-sm mb-6">
            The Problem
          </div>

          <h2 className="text-4xl lg:text-6xl font-black max-w-5xl leading-tight mb-20 tracking-tight">
            Software notifications failed.
            <br />
            Awareness campaigns failed.
            <br />
            Distracted driving keeps growing.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-5xl font-black text-yellow-400 mb-6">
                94%
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Of drivers admit using smartphones while driving.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-5xl font-black text-yellow-400 mb-6">
                Global
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Regulators and insurers are searching for measurable solutions.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-5xl font-black text-yellow-400 mb-6">
                New Era
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Mobility safety is becoming a behavioral technology category.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="py-32 px-6 border-t border-white/5">

        <div className="max-w-6xl mx-auto text-center">

          <div className="text-yellow-400 uppercase tracking-[0.25em] text-sm mb-6">
            The Vision
          </div>

          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-12">
            Build the safety layer between drivers and distraction.
          </h2>

          <p className="text-zinc-400 text-2xl leading-relaxed max-w-4xl mx-auto mb-24">
            OnlyDrive combines behavioral prevention, physical interaction and future insurance integration into one focused driving ecosystem.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl hover:border-yellow-500/30 transition">
              <div className="text-yellow-400 font-bold text-xl mb-5">
                Prevention
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Reduce distraction before risky behavior begins.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl hover:border-yellow-500/30 transition">
              <div className="text-yellow-400 font-bold text-xl mb-5">
                Verification
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Create measurable driving accountability.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-10 bg-zinc-950/40 backdrop-blur-xl hover:border-yellow-500/30 transition">
              <div className="text-yellow-400 font-bold text-xl mb-5">
                Insurance Intelligence
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                Enable future behavioral risk reduction models.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section id="opportunity" className="py-32 px-6 border-t border-white/5">

        <div className="max-w-7xl mx-auto">

          <div className="text-yellow-400 uppercase tracking-[0.25em] text-sm mb-6 text-center">
            Opportunity
          </div>

          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-20 text-center max-w-5xl mx-auto">
            Positioned between mobility, insurance and behavioral safety.
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="border border-white/10 rounded-[32px] p-12 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-6xl font-black text-yellow-400 mb-6">
                B2C
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Consumer adoption around safer driving behavior.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-12 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-6xl font-black text-yellow-400 mb-6">
                Fleet
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Enterprise mobility and driver accountability systems.
              </p>
            </div>

            <div className="border border-white/10 rounded-[32px] p-12 bg-zinc-950/40 backdrop-blur-xl">
              <div className="text-6xl font-black text-yellow-400 mb-6">
                UBI
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed">
                Future insurance scoring and behavioral risk infrastructure.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">

        <div className="max-w-5xl mx-auto text-center">

          <div className="text-yellow-400 uppercase tracking-[0.25em] text-sm mb-6">
            Investor Access
          </div>

          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-10">
            Building the next standard for focused driving.
          </h2>

          <p className="text-zinc-400 text-2xl leading-relaxed max-w-4xl mx-auto mb-16">
            Access the protected investor presentation or schedule a direct introduction.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

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
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-zinc-600 text-sm">

          <div>
            © 2026 OnlyDrive. All rights reserved.
          </div>

          <div>
            Confidential • Patent Pending • Investor Materials Protected
          </div>

        </div>
      </footer>

      {/* PASSWORD GATE */}
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

            <h3 className="text-3xl font-black text-center mb-4 tracking-tight">
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
