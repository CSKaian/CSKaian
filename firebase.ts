import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  initializeFirestore, 
  memoryLocalCache 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIhJ2pdz2sFGkWS2ZuO_aosrytyYwrCuU",
  authDomain: "cskaianjakarta.firebaseapp.com",
  projectId: "cskaianjakarta",
  storageBucket: "cskaianjakarta.firebasestorage.app",
  messagingSenderId: "550793182818",
  appId: "1:550793182818:web:28bb25ca2e48d489c41b3b"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Gunakan memoryLocalCache + experimentalForceLongPolling agar bebas crash IndexedDB/BroadcastChannel
// di dalam iframe, private mode, multi-tab, serta React StrictMode (caching offline ditangani oleh safeStorage + API server)
let firestoreDb: any;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    localCache: memoryLocalCache()
  });
} catch {
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;
export const auth = getAuth(app);
export { app };