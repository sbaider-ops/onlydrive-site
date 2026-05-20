'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import {
  firebaseEnvDiagnostics,
  getOnlyDriveDb,
  onlyDriveDeviceId,
} from '@/lib/firebase';
import {
  Activity,
  BluetoothConnected,
  CarFront,
  Cloud,
  Gauge,
  LockKeyhole,
  MapPin,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Timer,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type LiveStatus = {
  id: string;
  deviceId?: string;
  appUserId?: string;
  bleConnected?: boolean;
  esp32Connected?: boolean;
  motionState?: string;
  drivingState?: string;
  ledState?: string;
  futureLockState?: string;
  gpsSpeedKmh?: number | null;
  lastCommand?: string | null;
  lastEsp32Response?: string | null;
  lastUpdatedAt?: Timestamp;
};

type TripStatus = {
  id: string;
  status?: string;
  startedAt?: Timestamp;
  endedAt?: Timestamp;
  durationSeconds?: number;
  startGpsSpeedKmh?: number | null;
  endGpsSpeedKmh?: number | null;
  deviceId?: string;
  appUserId?: string;
  isDemo?: boolean;
};

type TripEvent = {
  id: string;
  type?: string;
  timestamp?: Timestamp;
  gpsSpeedKmh?: number | null;
  motionState?: string | null;
  ledState?: string | null;
  command?: string | null;
  response?: string | null;
  source?: string | null;
};

type SpeedPoint = {
  time: string;
  speed: number;
};

type RealtimeState = {
  configured: boolean;
  loading: boolean;
  error: string | null;
  envDiagnostics: typeof firebaseEnvDiagnostics;
  firestorePath: string | null;
  realtimeConnected: boolean;
  snapshotStatus: string;
  lastSnapshotAt: Date | null;
  lastFirestoreError: { code?: string; message: string } | null;
  availableDeviceIds: string[];
  deviceId: string | null;
  live: LiveStatus | null;
  trip: TripStatus | null;
  events: TripEvent[];
  speedPoints: SpeedPoint[];
};

function useOnlyDriveRealtime(): RealtimeState {
  const configured = firebaseEnvDiagnostics.envOk;
  const configuredDeviceId = onlyDriveDeviceId || null;
  const firestorePath = configuredDeviceId
    ? `devices/${configuredDeviceId}/live/status`
    : null;
  const [state, setState] = useState<RealtimeState>({
    configured,
    loading: true,
    error: null,
    envDiagnostics: firebaseEnvDiagnostics,
    firestorePath,
    realtimeConnected: false,
    snapshotStatus: 'initializing',
    lastSnapshotAt: null,
    lastFirestoreError: null,
    availableDeviceIds: [],
    deviceId: configuredDeviceId,
    live: null,
    trip: null,
    events: [],
    speedPoints: [],
  });

  useEffect(() => {
    console.log('[OnlyDrive Firebase] env validation result', firebaseEnvDiagnostics);

    const db = getOnlyDriveDb();
    if (!configured || !db) {
      setState((current) => ({
        ...current,
        loading: false,
        realtimeConnected: false,
        snapshotStatus: 'env_error',
        error: `Missing Firebase env variables: ${firebaseEnvDiagnostics.missingKeys.join(', ')}`,
      }));
      return;
    }

    console.log('[OnlyDrive Firebase] app initialized');

    if (!configuredDeviceId) {
      setState((current) => ({
        ...current,
        loading: false,
        realtimeConnected: false,
        snapshotStatus: 'missing_device_id',
        error: 'Missing NEXT_PUBLIC_ONLYDRIVE_DEVICE_ID',
      }));
      return;
    }

    const livePath = `devices/${configuredDeviceId}/live/status`;
    console.log('[OnlyDrive Firestore] subscription path', livePath);

    return onSnapshot(
      doc(db, 'devices', configuredDeviceId, 'live', 'status'),
      (snapshot) => {
        const receivedAt = new Date();
        const live = snapshot.exists()
          ? ({ id: snapshot.id, ...snapshot.data() } as LiveStatus)
          : null;

        console.log('[OnlyDrive Firestore] snapshot received', {
          path: livePath,
          exists: snapshot.exists(),
          data: live,
        });

        setState((current) => ({
          ...current,
          loading: false,
          error: null,
          realtimeConnected: true,
          snapshotStatus: snapshot.exists() ? 'live_snapshot_received' : 'live_status_missing',
          lastSnapshotAt: receivedAt,
          lastFirestoreError: null,
          deviceId: configuredDeviceId,
          live,
        }));
      },
      (error) => {
        console.error('[OnlyDrive Firestore] snapshot error', {
          path: livePath,
          code: error.code,
          message: error.message,
        });
        setState((current) => ({
          ...current,
          loading: false,
          realtimeConnected: false,
          snapshotStatus: 'snapshot_error',
          lastFirestoreError: { code: error.code, message: error.message },
          error:
            error.code === 'permission-denied'
              ? 'Firestore permission denied. Check Firestore Rules.'
              : `${error.code}: ${error.message}`,
        }));
      },
    );
  }, []);

  useEffect(() => {
    const db = getOnlyDriveDb();
    if (!configured || !db) {
      return;
    }

    return onSnapshot(
      collection(db, 'devices'),
      (snapshot) => {
        const availableDeviceIds = snapshot.docs.map((deviceDoc) => deviceDoc.id);
        console.log('[OnlyDrive Firestore] available devices loaded', availableDeviceIds);
        setState((current) => ({ ...current, availableDeviceIds }));
      },
      (error) => {
        console.error('[OnlyDrive Firestore] available devices error', {
          code: error.code,
          message: error.message,
        });
        setState((current) => ({
          ...current,
          lastFirestoreError: { code: error.code, message: error.message },
          error:
            error.code === 'permission-denied'
              ? 'Firestore permission denied. Check Firestore Rules.'
              : `${error.code}: ${error.message}`,
        }));
      },
    );
  }, [configured]);

  useEffect(() => {
    const db = getOnlyDriveDb();
    if (!configured || !db || !state.deviceId) {
      return;
    }

    const tripsQuery = query(
      collection(db, 'devices', state.deviceId, 'trips'),
      orderBy('startedAt', 'desc'),
      limit(1),
    );

    return onSnapshot(
      tripsQuery,
      (snapshot) => {
        const tripDoc = snapshot.docs[0];
        setState((current) => ({
          ...current,
          trip: tripDoc ? ({ id: tripDoc.id, ...tripDoc.data() } as TripStatus) : null,
        }));
      },
      (error) => {
        console.error('[OnlyDrive Firestore] trips snapshot error', {
          code: error.code,
          message: error.message,
        });
        setState((current) => ({
          ...current,
          lastFirestoreError: { code: error.code, message: error.message },
          error: `${error.code}: ${error.message}`,
        }));
      },
    );
  }, [state.deviceId]);

  useEffect(() => {
    const db = getOnlyDriveDb();
    if (!configured || !db || !state.deviceId || !state.trip?.id) {
      return;
    }

    const eventsQuery = query(
      collection(db, 'devices', state.deviceId, 'trips', state.trip.id, 'events'),
      orderBy('timestamp', 'desc'),
      limit(80),
    );

    return onSnapshot(
      eventsQuery,
      (snapshot) => {
        const events = snapshot.docs.map(
          (eventDoc) => ({ id: eventDoc.id, ...eventDoc.data() }) as TripEvent,
        );
        setState((current) => ({
          ...current,
          events,
          speedPoints: buildSpeedPoints(events),
        }));
      },
      (error) => {
        console.error('[OnlyDrive Firestore] events snapshot error', {
          code: error.code,
          message: error.message,
        });
        setState((current) => ({
          ...current,
          lastFirestoreError: { code: error.code, message: error.message },
          error: `${error.code}: ${error.message}`,
        }));
      },
    );
  }, [state.deviceId, state.trip?.id]);

  return useMemo(() => state, [state]);
}

export default function DashboardPage() {
  const {
    configured,
    loading,
    error,
    envDiagnostics,
    firestorePath,
    realtimeConnected,
    snapshotStatus,
    lastSnapshotAt,
    lastFirestoreError,
    availableDeviceIds,
    deviceId,
    live,
    trip,
    events,
    speedPoints,
  } = useOnlyDriveRealtime();
  const [chartMounted, setChartMounted] = useState(false);
  const connected = Boolean(live?.bleConnected && live?.esp32Connected);
  const driving = isDriving(live);
  const ledActive = live?.ledState === 'ACTIVE';

  useEffect(() => {
    setChartMounted(true);
  }, []);

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
              <div className="text-xs font-semibold text-zinc-500">Realtime Platform</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-400 transition hover:border-yellow-400/50 hover:text-yellow-300 sm:inline-flex"
            >
              Home
            </Link>
            <StatusPill label={connected ? 'DEVICE ONLINE' : 'WAITING'} active={connected} />
          </div>
        </div>
      </nav>

      <div className="relative mx-auto max-w-7xl px-5 py-8 lg:py-12">
        <section className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
              OnlyDrive Cloud
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Realtime enforcement dashboard.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Live Firestore telemetry for BLE connectivity, qualified driving state,
              GPS movement, trip events, and future lock-control readiness.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill label={driving ? 'DRIVING' : 'IDLE'} active={driving} />
            <StatusPill label={ledActive ? 'LED ACTIVE' : 'LED INACTIVE'} active={ledActive} />
          </div>
        </section>

        {!configured && (
          <Notice
            title="Firebase environment variables missing"
            detail={`Missing: ${envDiagnostics.missingKeys.join(', ') || 'none'}`}
          />
        )}
        {!deviceId && (
          <Notice
            title="Missing NEXT_PUBLIC_ONLYDRIVE_DEVICE_ID"
            detail="Set this variable in Vercel to the Firestore device document ID written by the Flutter app."
          />
        )}
        {error && <Notice title="Firestore realtime diagnostic" detail={error} />}
        {loading && <Notice title="Connecting to Firestore" detail="Opening realtime subscriptions..." />}

        <DiagnosticsPanel
          configured={configured}
          envDiagnostics={envDiagnostics}
          firestorePath={firestorePath}
          realtimeConnected={realtimeConnected}
          snapshotStatus={snapshotStatus}
          lastSnapshotAt={lastSnapshotAt}
          lastFirestoreError={lastFirestoreError}
          availableDeviceIds={availableDeviceIds}
          deviceId={deviceId}
          liveExists={Boolean(live)}
        />

        <section className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<BluetoothConnected />}
            label="BLE / ESP32"
            value={connected ? 'Connected' : 'Disconnected'}
            tone={connected ? 'success' : 'warning'}
            detail={deviceId ?? 'No device selected'}
          />
          <MetricCard
            icon={<CarFront />}
            label="Driving State"
            value={live?.drivingState ?? 'Unknown'}
            tone={driving ? 'success' : 'neutral'}
            detail={live?.motionState ?? 'No motion state'}
          />
          <MetricCard
            icon={<Zap />}
            label="LED / Future Lock"
            value={ledActive ? 'Active' : 'Inactive'}
            tone={ledActive ? 'success' : 'neutral'}
            detail={live?.futureLockState ?? 'simulated_lock_inactive'}
          />
          <MetricCard
            icon={<Gauge />}
            label="GPS Speed"
            value={`${formatNumber(live?.gpsSpeedKmh)} km/h`}
            tone={Number(live?.gpsSpeedKmh ?? 0) >= 5 ? 'success' : 'neutral'}
            detail="Realtime filtered speed"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.4fr]">
          <Panel title="Live Device Status" icon={<ShieldCheck />}>
            <div className="grid min-h-[190px] place-items-center rounded-[28px] border border-yellow-400/10 bg-[radial-gradient(circle,rgba(250,204,21,0.16),transparent_46%),#080807]">
              <div
                className={`grid h-36 w-36 place-items-center rounded-full border bg-black text-center ${
                  connected
                    ? 'border-yellow-400/40 text-yellow-300 shadow-[0_0_44px_rgba(250,204,21,0.16)]'
                    : 'border-white/10 text-zinc-600'
                }`}
              >
                <LockKeyhole size={42} />
                <span className="text-xs font-black">{connected ? 'READY' : 'OFFLINE'}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              <DataRow label="Device ID" value={live?.deviceId ?? deviceId ?? '-'} />
              <DataRow label="App User" value={live?.appUserId ?? '-'} />
              <DataRow label="Last Command" value={live?.lastCommand ?? '-'} />
              <DataRow label="ESP32 Response" value={live?.lastEsp32Response ?? '-'} />
              <DataRow label="Last Updated" value={formatDate(live?.lastUpdatedAt)} />
            </div>
          </Panel>

          <Panel title="GPS Speed Visualization" icon={<MapPin />}>
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-7xl font-black leading-none text-yellow-300">
                {formatNumber(live?.gpsSpeedKmh)}
              </span>
              <span className="font-black text-zinc-500">km/h</span>
            </div>
            <div className="h-[250px]">
              {chartMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={speedPoints}>
                    <defs>
                      <linearGradient id="speedFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity={0.75} />
                        <stop offset="100%" stopColor="#facc15" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="time" stroke="#807866" tickLine={false} axisLine={false} />
                    <YAxis stroke="#807866" tickLine={false} axisLine={false} width={36} />
                    <Tooltip
                      contentStyle={{
                        background: '#11100d',
                        border: '1px solid rgba(250,204,21,.24)',
                        borderRadius: 14,
                        color: '#fff',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="speed"
                      stroke="#facc15"
                      strokeWidth={3}
                      fill="url(#speedFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="grid h-full place-items-center rounded-3xl border border-white/10 bg-white/[0.03] text-sm font-bold text-zinc-500">
                  Loading speed chart
                </div>
              )}
            </div>
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.4fr]">
          <Panel title="Live Trip Status" icon={<Timer />}>
            <TripSummary trip={trip} live={live} />
          </Panel>
          <Panel title="Event Timeline" icon={<Activity />}>
            <EventTimeline events={events} />
          </Panel>
        </section>
      </div>
    </main>
  );
}

function TripSummary({ trip, live }: { trip: TripStatus | null; live: LiveStatus | null }) {
  return (
    <div className="grid gap-4">
      <div
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-black ${
          trip?.status === 'ACTIVE'
            ? 'border-yellow-400/50 bg-yellow-400/10 text-yellow-300'
            : 'border-white/10 bg-white/[0.04] text-zinc-500'
        }`}
      >
        <RadioTower size={18} />
        {trip?.status ?? 'NO TRIP'}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <MetricMini label="Trip ID" value={trip?.id ?? '-'} />
        <MetricMini label="Mode" value={trip?.isDemo ? 'Demo' : 'Production'} />
        <MetricMini label="Started" value={formatDate(trip?.startedAt)} />
        <MetricMini label="Duration" value={`${trip?.durationSeconds ?? 0}s`} />
        <MetricMini label="Start Speed" value={`${formatNumber(trip?.startGpsSpeedKmh)} km/h`} />
        <MetricMini label="Current Speed" value={`${formatNumber(live?.gpsSpeedKmh)} km/h`} />
      </div>
    </div>
  );
}

function DiagnosticsPanel({
  configured,
  envDiagnostics,
  firestorePath,
  realtimeConnected,
  snapshotStatus,
  lastSnapshotAt,
  lastFirestoreError,
  availableDeviceIds,
  deviceId,
  liveExists,
}: {
  configured: boolean;
  envDiagnostics: typeof firebaseEnvDiagnostics;
  firestorePath: string | null;
  realtimeConnected: boolean;
  snapshotStatus: string;
  lastSnapshotAt: Date | null;
  lastFirestoreError: { code?: string; message: string } | null;
  availableDeviceIds: string[];
  deviceId: string | null;
  liveExists: boolean;
}) {
  const missingLiveStatus = Boolean(deviceId && !liveExists && !lastFirestoreError);

  return (
    <section className="mb-4 rounded-[28px] border border-yellow-400/20 bg-yellow-400/[0.055] p-5 shadow-2xl shadow-black/35">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
            Runtime Diagnostics
          </p>
          <h2 className="mt-1 text-xl font-black text-white">Firebase / Firestore</h2>
        </div>
        <StatusPill
          label={realtimeConnected ? 'REALTIME CONNECTED' : 'REALTIME WAITING'}
          active={realtimeConnected}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <DiagnosticItem label="Firebase initialized" value={configured ? 'true' : 'false'} />
        <DiagnosticItem label="Env OK" value={envDiagnostics.envOk ? 'true' : 'false'} />
        <DiagnosticItem label="Project ID" value={envDiagnostics.projectId ?? '-'} />
        <DiagnosticItem label="Auth Domain" value={envDiagnostics.authDomain ?? '-'} />
        <DiagnosticItem label="Device ID" value={deviceId ?? 'MISSING'} />
        <DiagnosticItem label="Firestore Path" value={firestorePath ?? '-'} />
        <DiagnosticItem label="Snapshot Status" value={snapshotStatus} />
        <DiagnosticItem
          label="Last Snapshot"
          value={lastSnapshotAt ? lastSnapshotAt.toLocaleTimeString() : '-'}
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <pre className="overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-5 text-zinc-300">
          {JSON.stringify(
            {
              envKeysExist: envDiagnostics.keys,
              missingEnvVariables: envDiagnostics.missingKeys,
              apiKeyExists: envDiagnostics.keys.NEXT_PUBLIC_FIREBASE_API_KEY,
              projectId: envDiagnostics.projectId,
              authDomain: envDiagnostics.authDomain,
              deviceId: envDiagnostics.deviceId,
            },
            null,
            2,
          )}
        </pre>
        <pre className="overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-5 text-zinc-300">
          {JSON.stringify(
            {
              watching: firestorePath,
              realtimeConnected,
              snapshotStatus,
              lastFirestoreError,
              permissionHint:
                lastFirestoreError?.code === 'permission-denied'
                  ? 'Firestore permission denied. Check Firestore Rules.'
                  : null,
              noLiveStatusHint: missingLiveStatus
                ? 'No live status found for selected deviceId.'
                : null,
              availableDevices: availableDeviceIds,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </section>
  );
}

function DiagnosticItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-20 rounded-2xl border border-white/10 bg-black/35 p-4">
      <span className="block text-[11px] font-black uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </span>
      <strong className="mt-2 block break-words text-sm font-black text-zinc-50">{value}</strong>
    </div>
  );
}

function EventTimeline({ events }: { events: TripEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="grid min-h-[260px] place-items-center gap-3 text-zinc-500">
        <Sparkles />
        <span>Waiting for trip events</span>
      </div>
    );
  }

  return (
    <div className="max-h-[470px] space-y-3 overflow-auto pr-1">
      {events.map((event) => (
        <article
          className="grid grid-cols-[18px_1fr] gap-3 rounded-2xl bg-white/[0.04] p-4"
          key={event.id}
        >
          <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.45)]" />
          <div>
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-zinc-50">{event.type ?? 'event'}</strong>
              <span className="text-xs text-zinc-500">{formatDate(event.timestamp)}</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500">
              {event.source ?? 'system'} · {event.motionState ?? 'motion unknown'} ·{' '}
              {formatNumber(event.gpsSpeedKmh)} km/h
            </p>
            {(event.command || event.response) && (
              <code className="mt-2 inline-block whitespace-normal text-xs text-yellow-300">
                {event.command ? `cmd:${event.command}` : ''}
                {event.command && event.response ? ' / ' : ''}
                {event.response ? `rsp:${event.response}` : ''}
              </code>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: 'success' | 'warning' | 'neutral';
}) {
  const border =
    tone === 'success'
      ? 'border-emerald-400/20'
      : tone === 'warning'
        ? 'border-yellow-400/30'
        : 'border-white/10';
  return (
    <article className={`flex min-h-32 gap-4 rounded-[26px] border ${border} bg-white/[0.045] p-5 shadow-2xl shadow-black/35`}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-yellow-300">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="text-[11px] font-black uppercase tracking-[0.08em] text-zinc-500">
          {label}
        </span>
        <strong className="mt-2 block truncate text-xl font-black text-zinc-50">{value}</strong>
        <p className="mt-2 truncate text-sm text-zinc-500">{detail}</p>
      </div>
    </article>
  );
}

function MetricMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-20 rounded-2xl bg-white/[0.04] p-4">
      <span className="block text-[11px] font-black uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </span>
      <strong className="mt-2 block truncate text-base font-black text-zinc-50">{value}</strong>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-h-[360px] rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/35">
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-yellow-300">
          {icon}
          <h2 className="text-lg font-black text-zinc-50">{title}</h2>
        </div>
      </header>
      {children}
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-h-11 grid-cols-1 gap-1 rounded-2xl bg-white/[0.04] px-4 py-3 sm:grid-cols-[130px_1fr] sm:items-center sm:gap-3">
      <span className="text-[11px] font-black uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </span>
      <strong className="truncate text-sm font-bold text-zinc-50">{value}</strong>
    </div>
  );
}

function StatusPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-black ${
        active
          ? 'border-yellow-400/50 bg-yellow-400/10 text-yellow-300'
          : 'border-white/10 bg-white/[0.04] text-zinc-500'
      }`}
    >
      {label}
    </span>
  );
}

function Notice({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-yellow-300">
      <Cloud size={18} />
      <div>
        <strong className="block">{title}</strong>
        <span className="text-sm text-zinc-300">{detail}</span>
      </div>
    </div>
  );
}

function buildSpeedPoints(events: TripEvent[]): SpeedPoint[] {
  return events
    .filter((event) => typeof event.gpsSpeedKmh === 'number')
    .slice()
    .reverse()
    .slice(-30)
    .map((event) => ({
      time:
        event.timestamp?.toDate().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) ?? '--:--',
      speed: Number(event.gpsSpeedKmh?.toFixed(1) ?? 0),
    }));
}

function isDriving(live: LiveStatus | null) {
  const state = `${live?.drivingState ?? ''} ${live?.motionState ?? ''}`.toUpperCase();
  return state.includes('DRIVING') || state.includes('DEMO');
}

function formatNumber(value: number | null | undefined) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0.0';
  }
  return value.toFixed(1);
}

function formatDate(value: { toDate: () => Date } | undefined) {
  if (!value) {
    return '-';
  }
  return value.toDate().toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
  });
}
