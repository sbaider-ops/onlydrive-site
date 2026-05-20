"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  db,
  firebaseEnvDiagnostics,
  onlyDriveDeviceId,
} from "../firebase";

export default function Dashboard() {
  const [rootDeviceData, setRootDeviceData] = useState(null);
  const [liveStatusData, setLiveStatusData] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const deviceId = onlyDriveDeviceId;

  useEffect(() => {
    console.log("[OnlyDrive Firebase] env diagnostics", firebaseEnvDiagnostics);

    if (!firebaseEnvDiagnostics.envOk || !db) {
      setIsLoading(false);
      setError(
        `Missing Firebase env variables: ${firebaseEnvDiagnostics.missingKeys.join(", ")}`
      );
      return undefined;
    }

    if (!deviceId) {
      setIsLoading(false);
      setError("Missing NEXT_PUBLIC_ONLYDRIVE_DEVICE_ID");
      return undefined;
    }

    const deviceRef = doc(db, "devices", deviceId);
    const liveStatusRef = doc(db, "devices", deviceId, "live", "status");
    let rootLoaded = false;
    let liveLoaded = false;

    console.log(
      "[OnlyDrive Firestore] subscribing",
      `devices/${deviceId}/live/status`
    );

    const finishLoading = () => {
      if (rootLoaded && liveLoaded) {
        setIsLoading(false);
      }
    };

    const unsubscribeRoot = onSnapshot(
      deviceRef,
      (snapshot) => {
        console.log("[OnlyDrive Firestore] root snapshot received", {
          exists: snapshot.exists(),
          id: snapshot.id,
          data: snapshot.exists() ? snapshot.data() : null,
        });
        rootLoaded = true;
        setError("");

        if (snapshot.exists()) {
          setRootDeviceData({
            id: snapshot.id,
            ...snapshot.data()
          });
        } else {
          setRootDeviceData(null);
        }

        finishLoading();
      },
      (snapshotError) => {
        console.error("[OnlyDrive Firestore] root snapshot error", {
          code: snapshotError.code,
          message: snapshotError.message,
        });
        rootLoaded = true;
        setRootDeviceData(null);
        setError(`${snapshotError.code}: ${snapshotError.message}`);
        finishLoading();
      }
    );

    const unsubscribeLive = onSnapshot(
      liveStatusRef,
      (snapshot) => {
        console.log("[OnlyDrive Firestore] live/status snapshot received", {
          exists: snapshot.exists(),
          id: snapshot.id,
          data: snapshot.exists() ? snapshot.data() : null,
        });
        liveLoaded = true;
        setError("");

        if (snapshot.exists()) {
          setLiveStatusData({
            id: snapshot.id,
            ...snapshot.data()
          });
        } else {
          setLiveStatusData(null);
        }

        finishLoading();
      },
      (snapshotError) => {
        console.error("[OnlyDrive Firestore] live/status snapshot error", {
          code: snapshotError.code,
          message: snapshotError.message,
        });
        liveLoaded = true;
        setLiveStatusData(null);
        setError(`${snapshotError.code}: ${snapshotError.message}`);
        finishLoading();
      }
    );

    const unsubscribeDevices = onSnapshot(
      collection(db, "devices"),
      (snapshot) => {
        const ids = snapshot.docs.map((deviceDoc) => deviceDoc.id);
        console.log("[OnlyDrive Firestore] available devices loaded", ids);
        setAvailableDevices(ids);
      },
      (snapshotError) => {
        console.error("[OnlyDrive Firestore] devices discovery error", {
          code: snapshotError.code,
          message: snapshotError.message,
        });
      }
    );

    return () => {
      unsubscribeRoot();
      unsubscribeLive();
      unsubscribeDevices();
    };
  }, [deviceId]);

  const hasAnyData = rootDeviceData || liveStatusData;
  const displayData = {
    rootDocument: {
      path: `devices/${deviceId}`,
      exists: Boolean(rootDeviceData),
      data: rootDeviceData
    },
    liveStatusDocument: {
      path: `devices/${deviceId}/live/status`,
      exists: Boolean(liveStatusData),
      data: liveStatusData
    }
  };

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
            {`Watching Firestore path: devices/${deviceId || "MISSING_DEVICE_ID"}/live/status`}
          </p>
        </div>

        <div className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Raw Firestore JSON
            </h2>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              {isLoading ? "LISTENING" : error ? "ERROR" : hasAnyData ? "LIVE" : "NO DATA"}
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

          {!isLoading && !error && !hasAnyData && (
            <pre className="overflow-auto rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-200">
              {JSON.stringify(
                {
                  error: `No live status found for selected deviceId: ${deviceId}`,
                  firebaseDiagnostics: firebaseEnvDiagnostics,
                  checkedPaths: [
                    `devices/${deviceId}`,
                    `devices/${deviceId}/live/status`
                  ],
                  availableDevices,
                  nextStep:
                    "Set NEXT_PUBLIC_ONLYDRIVE_DEVICE_ID to one of the available device document IDs."
                },
                null,
                2
              )}
            </pre>
          )}

          {!isLoading && !error && hasAnyData && (
            <pre className="overflow-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-yellow-100">
              {JSON.stringify(displayData, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
