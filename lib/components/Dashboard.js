"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [deviceData, setDeviceData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const deviceRef = doc(db, "devices", "esp32_001");

    const unsubscribe = onSnapshot(
      deviceRef,
      (snapshot) => {
        setIsLoading(false);
        setError("");

        if (snapshot.exists()) {
          setDeviceData({
            id: snapshot.id,
            ...snapshot.data()
          });
          return;
        }

        setDeviceData(null);
        setError("No document found at devices/esp32_001");
      },
      (snapshotError) => {
        setIsLoading(false);
        setDeviceData(null);
        setError(snapshotError.message);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-[28px] border border-yellow-500/25 bg-zinc-950 p-6 shadow-2xl shadow-yellow-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
            OnlyDrive Firestore
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            IoT Device Debug
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Realtime listener: devices/esp32_001
          </p>
        </div>

        <div className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Raw Firestore JSON
            </h2>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              {isLoading ? "LISTENING" : error ? "ERROR" : "LIVE"}
            </span>
          </div>

          {isLoading && (
            <p className="text-sm text-zinc-400">
              Loading realtime device data...
            </p>
          )}

          {!isLoading && error && (
            <pre className="overflow-auto rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-200">
              {JSON.stringify({ error }, null, 2)}
            </pre>
          )}

          {!isLoading && !error && (
            <pre className="overflow-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-yellow-100">
              {JSON.stringify(deviceData, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
