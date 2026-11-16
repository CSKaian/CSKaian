import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager, 
  CACHE_SIZE_UNLIMITED,
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

// VERSI IRIT 1000 BROWSER - ANTI LELET
let firestoreDb: any;
try {
  firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED
    })
  });
} catch {
  try {
    firestoreDb = getFirestore(app);
  } catch {
    firestoreDb = initializeFirestore(app, {
      localCache: memoryLocalCache()
    });
  }
}

export const db = firestoreDb;
export const auth = getAuth(app);
export { app };