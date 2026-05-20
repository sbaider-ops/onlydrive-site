import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const requiredEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const onlyDriveDeviceId =
  process.env.NEXT_PUBLIC_ONLYDRIVE_DEVICE_ID || "";

export const firebaseConfig = {
  apiKey: requiredEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: requiredEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: requiredEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: requiredEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: requiredEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: requiredEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingFirebaseEnv = Object.entries(requiredEnv)
  .filter(([, value]) => typeof value !== "string" || value.length === 0)
  .map(([key]) => key);

export const firebaseEnvDiagnostics = {
  keys: Object.fromEntries(
    Object.entries(requiredEnv).map(([key, value]) => [
      key,
      Boolean(value && value.length > 0),
    ])
  ),
  missingKeys: missingFirebaseEnv,
  projectId: requiredEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID || null,
  authDomain: requiredEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || null,
  deviceId: onlyDriveDeviceId || null,
  deviceIdExists: Boolean(onlyDriveDeviceId),
  envOk: missingFirebaseEnv.length === 0,
};

export function getOnlyDriveFirebaseApp() {
  if (!firebaseEnvDiagnostics.envOk) {
    return null;
  }

  const existingApp = getApps().find((app) => app.name === "onlydrive-web");
  return existingApp ?? initializeApp(firebaseConfig, "onlydrive-web");
}

export function getOnlyDriveDb() {
  const app = getOnlyDriveFirebaseApp();
  return app ? getFirestore(app) : null;
}

export const db = getOnlyDriveDb();
