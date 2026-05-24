'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Car,
  Info,
  Moon,
  Smartphone,
  Utensils,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type YearlyRow = {
  year: number;
  totalTrafficFatalities: number;
  nhtsaDistractedFatalities: number | null;
  nhtsaInjuries: number | null;
  cellPhoneFatalities: number | null;
  drowsyOfficial: number | null;
  eatingOfficial: number | null;
  sourceStatus: string;
};

type DashboardRow = YearlyRow & {
  nhtsaComparable: number | null;
  projectedOfficial2025: number | null;
  officialRate: number | null;
  modeledAllDistraction: number;
  modeledDrowsy: number;
  modeledCellPhone: number;
  modeledEating: number;
  officialOther: number | null;
  officialEating: number | null;
  reportingGap: number;
  gapMultiplier: number;
  injuriesPerFatality: number | null;
};

const yearly: YearlyRow[] = [
  { year: 2015, totalTrafficFatalities: 35092, nhtsaDistractedFatalities: 3477, nhtsaInjuries: 391000, cellPhoneFatalities: 476, drowsyOfficial: 800, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2016, totalTrafficFatalities: 37461, nhtsaDistractedFatalities: 3450, nhtsaInjuries: 391000, cellPhoneFatalities: 453, drowsyOfficial: 772, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2017, totalTrafficFatalities: 37133, nhtsaDistractedFatalities: 3166, nhtsaInjuries: 297000, cellPhoneFatalities: 434, drowsyOfficial: 795, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2018, totalTrafficFatalities: 36560, nhtsaDistractedFatalities: 2841, nhtsaInjuries: 400000, cellPhoneFatalities: 385, drowsyOfficial: 785, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2019, totalTrafficFatalities: 36096, nhtsaDistractedFatalities: 3142, nhtsaInjuries: 424000, cellPhoneFatalities: 422, drowsyOfficial: 697, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2020, totalTrafficFatalities: 39007, nhtsaDistractedFatalities: 3154, nhtsaInjuries: 324652, cellPhoneFatalities: 397, drowsyOfficial: 633, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2021, totalTrafficFatalities: 42939, nhtsaDistractedFatalities: 3522, nhtsaInjuries: 362415, cellPhoneFatalities: 420, drowsyOfficial: 684, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2022, totalTrafficFatalities: 42721, nhtsaDistractedFatalities: 3308, nhtsaInjuries: 289310, cellPhoneFatalities: 402, drowsyOfficial: 693, eatingOfficial: null, sourceStatus: 'Final official' },
  { year: 2023, totalTrafficFatalities: 41025, nhtsaDistractedFatalities: 3275, nhtsaInjuries: 324819, cellPhoneFatalities: 401, drowsyOfficial: 637, eatingOfficial: null, sourceStatus: 'FARS ARF / final overview' },
  { year: 2024, totalTrafficFatalities: 39254, nhtsaDistractedFatalities: 3208, nhtsaInjuries: 315167, cellPhoneFatalities: 437, drowsyOfficial: 644, eatingOfficial: null, sourceStatus: '2024 FARS ARF' },
  { year: 2025, totalTrafficFatalities: 36640, nhtsaDistractedFatalities: null, nhtsaInjuries: null, cellPhoneFatalities: null, drowsyOfficial: null, eatingOfficial: null, sourceStatus: 'Early all-fatality estimate; distraction detail not yet final' },
];

const fmt = (n: number | null | undefined) => (n == null ? '-' : n.toLocaleString());
const pct = (n: number | null | undefined) => (n == null ? '-' : `${n.toFixed(1)}%`);

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Car;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/35">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-yellow-400/10 text-yellow-300">
          <Icon size={28} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-zinc-500">{label}</p>
          <strong className="mt-1 block text-3xl font-black text-zinc-50">{value}</strong>
        </div>
      </div>
    </article>
  );
}

function ChartCard({
  title,
  note,
  children,
  tall = false,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/35">
      <h2 className="text-xl font-black text-zinc-50">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-zinc-500">{note}</p>
      <div className={tall ? 'mt-5 h-[390px]' : 'mt-5 h-[320px]'}>{children}</div>
    </section>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="min-w-52 rounded-2xl border border-yellow-400/20 bg-zinc-950 p-3 text-sm text-zinc-100 shadow-2xl">
      <p className="mb-2 font-black text-yellow-300">{label}</p>
      {payload.map((item: any) => (
        <p className="flex justify-between gap-5" key={item.name}>
          <span>{item.name}</span>
          <strong>{fmt(item.value)}</strong>
        </p>
      ))}
    </div>
  );
}

export default function DataPage() {
  const [mode, setMode] = useState<'official' | 'estimate' | 'gap'>('official');
  const [showMethodology, setShowMethodology] = useState(true);

  const data: DashboardRow[] = useMemo(() => yearly.map((row) => {
    const officialRate = row.nhtsaDistractedFatalities && row.totalTrafficFatalities
      ? row.nhtsaDistractedFatalities / row.totalTrafficFatalities
      : null;
    const projectedOfficial2025 =
      row.year === 2025 ? Math.round(0.0817 * row.totalTrafficFatalities) : null;
    const nhtsaComparable = row.nhtsaDistractedFatalities ?? projectedOfficial2025;
    const modeledAllDistraction = Math.round(0.29 * row.totalTrafficFatalities);
    const modeledDrowsy = Math.round(0.176 * row.totalTrafficFatalities);
    const modeledCellPhone = Math.round(0.26 * row.totalTrafficFatalities);
    const officialOther =
      nhtsaComparable && row.cellPhoneFatalities
        ? Math.max(nhtsaComparable - row.cellPhoneFatalities, 0)
        : null;

    return {
      ...row,
      nhtsaComparable,
      projectedOfficial2025,
      officialRate: officialRate ? officialRate * 100 : null,
      modeledAllDistraction,
      modeledDrowsy,
      modeledCellPhone,
      modeledEating: Math.round(0.02 * row.totalTrafficFatalities),
      officialOther,
      officialEating: null,
      reportingGap: nhtsaComparable
        ? modeledAllDistraction - nhtsaComparable
        : modeledAllDistraction - (projectedOfficial2025 ?? 0),
      gapMultiplier: nhtsaComparable
        ? modeledAllDistraction / nhtsaComparable
        : modeledAllDistraction / (projectedOfficial2025 ?? 1),
      injuriesPerFatality:
        row.nhtsaInjuries && nhtsaComparable ? row.nhtsaInjuries / nhtsaComparable : null,
    };
  }), []);

  const latestOfficial = data.find((row) => row.year === 2024)!;
  const totalDecade = data
    .filter((row) => row.year <= 2024)
    .reduce((sum, row) => sum + (row.nhtsaDistractedFatalities || 0), 0);
  const phoneShare2024 =
    (latestOfficial.cellPhoneFatalities! / latestOfficial.nhtsaDistractedFatalities!) * 100;
  const gap2024 = latestOfficial.modeledAllDistraction - latestOfficial.nhtsaDistractedFatalities!;
  const typeRows = data.map((row) => ({
    year: row.year,
    'Cell phone official': row.cellPhoneFatalities,
    'Cell phone estimate': row.modeledCellPhone,
    'Drowsy official': row.drowsyOfficial,
    'Drowsy estimate': row.modeledDrowsy,
    'Eating scenario': row.modeledEating,
    'Other official': row.officialOther,
  }));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] right-[-80px] h-[520px] w-[520px] rounded-full bg-yellow-500/15 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-4">
            <img src="/logo.png" alt="OnlyDrive Logo" className="h-11 w-auto" />
            <div>
              <div className="text-xl font-black tracking-tight">OnlyDrive</div>
              <div className="text-xs font-semibold text-zinc-500">DATA</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-400 transition hover:border-yellow-400/50 hover:text-yellow-300 sm:inline-flex">
              Home
            </Link>
            <Link href="/dashboard" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-400 transition hover:border-yellow-400/50 hover:text-yellow-300 sm:inline-flex">
              Dashboard
            </Link>
            <span className="inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-black text-yellow-300">
              DATA
            </span>
          </div>
        </div>
      </nav>

      <div className="relative mx-auto max-w-7xl px-5 py-8 lg:py-12">
        <section className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
              <AlertTriangle size={15} />
              U.S. distracted-driving data center
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              The reporting gap behind distracted-driving fatalities.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">
              Official FARS/NHTSA data shows roughly 3,000-3,500 distraction-affected
              deaths per year, while independent estimates suggest the true burden can
              be several times higher.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['official', 'estimate', 'gap'] as const).map((value) => (
              <button
                className={`rounded-full border px-5 py-3 text-sm font-black transition ${
                  mode === value
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-yellow-400/50 hover:text-yellow-300'
                }`}
                key={value}
                onClick={() => setMode(value)}
                type="button"
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Car} label="2024 official distracted deaths" value={fmt(latestOfficial.nhtsaDistractedFatalities)} />
          <StatCard icon={Smartphone} label="2024 official cellphone share" value={pct(phoneShare2024)} />
          <StatCard icon={Activity} label="2015-2024 official deaths" value={fmt(totalDecade)} />
          <StatCard icon={Info} label="2024 estimated undercount gap" value={fmt(gap2024)} />
        </section>

        {showMethodology && (
          <section className="mb-4 rounded-[28px] border border-yellow-400/20 bg-yellow-400/[0.075] p-5 text-zinc-300 shadow-2xl shadow-black/35">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Methodology warning</h2>
                <p className="mt-2 max-w-5xl text-sm leading-relaxed">
                  "Official" means police-reported/FARS distraction coding. "Estimate"
                  applies independent-model assumptions: 29% of fatalities for broad
                  distraction, 26% for cellphone-involved crash burden, and 17.6% for
                  drowsy-driving fatal-crash involvement. Eating is shown only as a low
                  illustrative scenario.
                </p>
              </div>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-300 hover:border-yellow-400/50 hover:text-yellow-300" onClick={() => setShowMethodology(false)} type="button">
                Hide
              </button>
            </div>
          </section>
        )}

        <section className="grid gap-4 xl:grid-cols-2">
          <ChartCard title="Official fatalities vs independent estimate" note="Measured trend can look flat while modeled burden remains much higher.">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="year" stroke="#807866" />
                <YAxis stroke="#807866" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="nhtsaComparable" name="NHTSA official / 2025 projected" fill="#facc15" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="modeledAllDistraction" name="Independent/model estimate" stroke="#fb923c" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Reporting gap multiplier" note="Alternative estimate divided by official count.">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="year" stroke="#807866" />
                <YAxis stroke="#807866" tickFormatter={(value) => `${Number(value).toFixed(1)}x`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="gapMultiplier" name="Gap multiplier" fill="#facc1530" stroke="#facc15" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <div className="mt-4">
          <ChartCard title="Fatalities by distraction type" note="Cellphone and drowsiness have official annual counts. Eating is an illustrative scenario only." tall>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={typeRows}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="year" stroke="#807866" />
                <YAxis stroke="#807866" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {mode === 'official' && <Line type="monotone" dataKey="Cell phone official" stroke="#facc15" strokeWidth={3} dot={false} />}
                {mode === 'official' && <Line type="monotone" dataKey="Drowsy official" stroke="#fb923c" strokeWidth={3} dot={false} />}
                {mode === 'official' && <Line type="monotone" dataKey="Other official" stroke="#38bdf8" strokeWidth={3} dot={false} />}
                {mode === 'estimate' && <Line type="monotone" dataKey="Cell phone estimate" stroke="#facc15" strokeWidth={3} dot={false} />}
                {mode === 'estimate' && <Line type="monotone" dataKey="Drowsy estimate" stroke="#fb923c" strokeWidth={3} dot={false} />}
                {mode === 'estimate' && <Line type="monotone" dataKey="Eating scenario" stroke="#22c55e" strokeWidth={3} dot={false} />}
                {mode === 'gap' && <Line type="monotone" dataKey="Cell phone official" stroke="#fde68a" strokeWidth={3} dot={false} />}
                {mode === 'gap' && <Line type="monotone" dataKey="Cell phone estimate" stroke="#facc15" strokeWidth={3} dot={false} />}
                {mode === 'gap' && <Line type="monotone" dataKey="Drowsy official" stroke="#fdba74" strokeWidth={3} dot={false} />}
                {mode === 'gap' && <Line type="monotone" dataKey="Drowsy estimate" stroke="#fb923c" strokeWidth={3} dot={false} />}
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <ChartCard title="Distracted-driving injuries vs fatalities" note="Injuries move more sharply because they come from sampled police-reported crash systems.">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.filter((row) => row.year <= 2024)}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="year" stroke="#807866" />
                <YAxis yAxisId="left" stroke="#807866" />
                <YAxis yAxisId="right" orientation="right" stroke="#807866" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="right" dataKey="nhtsaInjuries" name="Official injuries" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                <Line yAxisId="left" type="monotone" dataKey="nhtsaDistractedFatalities" name="Official fatalities" stroke="#facc15" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/35">
            <h2 className="text-xl font-black text-zinc-50">Smartphone-era interpretation layer</h2>
            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              Official cellphone-coded deaths remain low relative to broad distraction estimates.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <InsightTile icon={<Smartphone />} label="Official 2024 cellphone fatalities" value={fmt(latestOfficial.cellPhoneFatalities)} />
              <InsightTile icon={<Moon />} label="Official 2024 drowsy fatalities" value={fmt(latestOfficial.drowsyOfficial)} />
              <InsightTile icon={<Utensils />} label="Official eating fatalities" value="Not consistently coded" />
            </div>
            <div className="mt-5 rounded-3xl border border-white/10 bg-black/35 p-4 text-sm leading-relaxed text-zinc-300">
              <strong className="text-white">Dashboard reading: </strong>
              If official cellphone deaths are taken alone, the smartphone effect appears modest.
              If modeled underreporting is added, smartphones and in-vehicle screens become a
              much larger road-safety burden.
            </div>
          </section>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/35">
          <h2 className="text-xl font-black text-zinc-50">Underlying data table</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-zinc-500">
                <tr className="border-b border-white/10">
                  <th className="py-3">Year</th>
                  <th>Official distracted deaths</th>
                  <th>Cellphone deaths</th>
                  <th>Drowsy deaths</th>
                  <th>Official injuries</th>
                  <th>Independent estimate</th>
                  <th>Gap</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr className="border-b border-white/10 last:border-0" key={row.year}>
                    <td className="py-3 font-black text-white">{row.year}</td>
                    <td>{fmt(row.nhtsaComparable)}{row.year === 2025 ? ' est.' : ''}</td>
                    <td>{fmt(row.cellPhoneFatalities)}</td>
                    <td>{fmt(row.drowsyOfficial)}</td>
                    <td>{fmt(row.nhtsaInjuries)}</td>
                    <td>{fmt(row.modeledAllDistraction)}</td>
                    <td>{fmt(row.reportingGap)}</td>
                    <td className="text-zinc-500">{row.sourceStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function InsightTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-h-36 rounded-3xl border border-white/10 bg-black/35 p-4">
      <div className="mb-4 text-yellow-300">{icon}</div>
      <p className="text-sm text-zinc-500">{label}</p>
      <strong className="mt-2 block text-xl font-black text-white">{value}</strong>
    </div>
  );
}
