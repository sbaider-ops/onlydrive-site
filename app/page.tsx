export default function OnlyDriveInvestorLanding() {
  const stats = [
    { number: '800K+', label: 'Driving distraction violations in Israel over 5 years' },
    { number: '4X', label: 'Higher accident risk while using a phone' },
    { number: '25%', label: 'Estimated reduction potential in distraction events' },
  ];

  const pillars = [
    {
      title: 'Hardware Layer',
      text: 'A dedicated physical safety mechanism designed to reduce smartphone distraction while driving.',
    },
    {
      title: 'Verification System',
      text: 'Secure lock/unlock validation and activity verification designed for insurers and fleets.',
    },
    {
      title: 'Insurance Intelligence',
      text: 'Data-driven driver behavior scoring designed for the next generation of usage-based insurance.',
    },
  ];

  const roadmap = [
    'Physical prototype development',
    'POC application and verification flow',
    'Pilot with insurers and fleets',
    'Pre-Seed expansion and production readiness',
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500 rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-400 rounded-full blur-3xl opacity-10" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/70">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-300 flex items-center justify-center text-black font-bold">
              OD
            </div>
            <div>
              <div className="font-semibold tracking-wide">OnlyDrive</div>
              <div className="text-xs text-zinc-400">Drive Focused. Drive Safe.</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#problem" className="hover:text-yellow-400 transition">Problem</a>
            <a href="#solution" className="hover:text-yellow-400 transition">Solution</a>
            <a href="#market" className="hover:text-yellow-400 transition">Market</a>
            <a href="#team" className="hover:text-yellow-400 transition">Team</a>
          </div>

          <button className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition-transform">
            Investor Access
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 rounded-full text-sm text-yellow-300 mb-8">
              Pre-Seed InsureTech Startup
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              The New Standard For
              <span className="block bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">
                Distraction-Free Driving
              </span>
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              OnlyDrive combines hardware, algorithms, verification systems and insurance intelligence into one ecosystem designed to reduce distracted driving.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
                Request Investor Access
              </button>

              <button className="border border-white/20 px-8 py-4 rounded-2xl font-semibold hover:border-yellow-500 hover:text-yellow-300 transition">
                View Vision
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl rounded-full" />

            <div className="relative bg-zinc-950 border border-yellow-500/20 rounded-[32px] p-10 shadow-2xl shadow-yellow-500/10">
              <div className="aspect-square rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-black bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-4">
                    OD
                  </div>
                  <div className="text-zinc-400 text-lg">
                    Investor Preview Protected
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-2 rounded-full text-yellow-300 text-sm">
                    Patent Pending Technology
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="problem" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              The Problem
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Distracted Driving Is A Global Epidemic
            </h2>

            <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Software-only solutions failed to create real behavioral change. OnlyDrive is designed around a stronger physical and behavioral framework.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-950 border border-white/10 rounded-3xl p-10 hover:border-yellow-500/30 transition"
              >
                <div className="text-5xl font-black bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-4">
                  {item.number}
                </div>
                <div className="text-zinc-400 text-lg leading-relaxed">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              The System
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Hardware + Data + Verification
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              The public platform intentionally protects core intellectual property while presenting the strategic vision, business opportunity and technology direction.
            </p>

            <div className="space-y-5">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="bg-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition"
                >
                  <div className="text-xl font-bold mb-2 text-yellow-300">
                    {pillar.title}
                  </div>

                  <div className="text-zinc-400 leading-relaxed">
                    {pillar.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/20 rounded-[32px] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full" />

              <div className="relative">
                <div className="text-yellow-300 text-sm uppercase tracking-[0.2em] mb-4">
                  Protected Product Preview
                </div>

                <div className="text-4xl font-black mb-6 leading-tight">
                  Investor Data Room Access Required
                </div>

                <p className="text-zinc-400 leading-relaxed mb-8">
                  Detailed product architecture, verification flows and hardware demonstrations are available only for approved investors and strategic partners.
                </p>

                <button className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSURETECH */}
      <section className="py-24 px-6 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              InsureTech Opportunity
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Building The Next UBI Layer
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10">
              <div className="text-7xl font-black bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-6">
                98/100
              </div>

              <div className="text-2xl font-bold mb-4">
                Driver Focus Score
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg">
                A future-facing behavioral score designed to help insurers create new incentive structures around distraction-free driving.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
                <div className="text-yellow-300 font-bold text-xl mb-3">
                  Fleet & Insurance Integration
                </div>
                <div className="text-zinc-400 leading-relaxed">
                  Enterprise and insurer-ready infrastructure with behavioral analytics and verification layers.
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
                <div className="text-yellow-300 font-bold text-xl mb-3">
                  Risk Reduction Model
                </div>
                <div className="text-zinc-400 leading-relaxed">
                  Positioned around measurable distraction reduction and long-term loss prevention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET */}
      <section id="market" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              Market Opportunity
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8">
              A Massive Global Opportunity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10 text-center">
              <div className="text-zinc-500 uppercase text-sm tracking-[0.2em] mb-4">TAM</div>
              <div className="text-6xl font-black text-yellow-300 mb-4">1.5B</div>
              <div className="text-zinc-400">Global drivers using smartphones daily</div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10 text-center">
              <div className="text-zinc-500 uppercase text-sm tracking-[0.2em] mb-4">SAM</div>
              <div className="text-6xl font-black text-yellow-300 mb-4">300M</div>
              <div className="text-zinc-400">OECD drivers and insured mobility markets</div>
            </div>

            <div className="bg-zinc-950 border border-yellow-500/30 rounded-[32px] p-10 text-center shadow-2xl shadow-yellow-500/10">
              <div className="text-zinc-500 uppercase text-sm tracking-[0.2em] mb-4">SOM</div>
              <div className="text-6xl font-black text-yellow-300 mb-4">3.5M</div>
              <div className="text-zinc-400">Israeli driver market entry opportunity</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
            Roadmap
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-16">
            Building The Platform Step By Step
          </h2>

          <div className="space-y-6 text-left">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-zinc-950 border border-white/10 rounded-3xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-300 text-black font-black flex items-center justify-center text-xl shrink-0">
                  {index + 1}
                </div>

                <div className="text-xl font-semibold text-zinc-200">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              Team
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Built By Industry Professionals
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-300 mb-6" />
              <div className="text-2xl font-black mb-2">Sharon Baider</div>
              <div className="text-yellow-300 font-semibold mb-6">Founder & CEO</div>
              <div className="text-zinc-400 leading-relaxed">
                Former road safety spokesperson, transportation journalist and communications executive with extensive experience in PR, regulation and mobility strategy.
              </div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-300 mb-6" />
              <div className="text-2xl font-black mb-2">Dan Ben David</div>
              <div className="text-yellow-300 font-semibold mb-6">CTO</div>
              <div className="text-zinc-400 leading-relaxed">
                Senior electronics engineer with semiconductor industry experience and expertise in complex hardware systems and architecture.
              </div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-300 mb-6" />
              <div className="text-2xl font-black mb-2">Eddie Averbuch</div>
              <div className="text-yellow-300 font-semibold mb-6">CPO</div>
              <div className="text-zinc-400 leading-relaxed">
                Product and electronics sourcing expert focused on scalable production, manufacturing and supply chain infrastructure.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-zinc-950 to-black border border-yellow-500/20 rounded-[40px] p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/5" />

          <div className="relative">
            <div className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-4">
              Investment Opportunity
            </div>

            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              $2M Pre-Seed Round
            </h2>

            <p className="text-zinc-400 text-xl leading-relaxed max-w-3xl mx-auto mb-12">
              OnlyDrive is building a new category around distraction prevention, behavioral verification and insurance intelligence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <a
                href="https://drive.google.com/file/d/1GemvM3jO0yxBezc8OBVU1g2fGkmQMHeN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-500 to-amber-300 text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20 inline-block"
              >
                Request Investor Deck
              </a>

              <button className="border border-white/20 px-10 py-5 rounded-2xl font-semibold hover:border-yellow-500 hover:text-yellow-300 transition text-lg">
                Schedule Introduction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500">
          <div>
            © 2026 OnlyDrive. All rights reserved.
          </div>

          <div>
            Patent Pending • Investor Materials Available Upon Request
          </div>
        </div>
      </footer>
    </div>
  );
}
