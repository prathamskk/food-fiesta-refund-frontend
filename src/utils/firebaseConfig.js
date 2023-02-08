import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  serverTimestamp,
  setDoc,
  where,
  enableMultiTabIndexedDbPersistence,
  limit,
  startAt,
  startAfter,
} from "firebase/firestore";

import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

import {
  getAuth,
  updateProfile,
  connectAuthEmulator,
  signInWithPhoneNumber,
  onAuthStateChanged,
  reauthenticateWithRedirect,
  RecaptchaVerifier,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APPID,

  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const functions = getFunctions(firebaseApp);
  return { firebaseApp, firestore, auth, isConfigured, functions };
}

function connectToEmulators({ auth, firestore, functions }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
    console.log("auth emulators");
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);

    enableMultiTabIndexedDbPersistence(services.firestore);
    console.log("connected to emulators");
  }
  return services;
}

export function newOrder(data) {
  const { functions } = getFirebase();
  const newOrder = httpsCallable(functions, "newOrder");
  return newOrder(data);
}

export function streamOrders() {
  const ORDERS_COLLECTION_ID = "orders";
  const { firestore } = getFirebase();
  const orderCol = collection(firestore, ORDERS_COLLECTION_ID);
  const stream = (callback) => {
    const q = query(
      orderCol,
      where("payment_status", "==", "unpaid"),
      orderBy("order_placed_timestamp", "asc"),
      limit(15)
    );

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      callback(orders);
    });
  };

  const streamSearch = (orderId, callback) => {
    if (orderId === undefined) {
      return;
    }

    console.log(orderId);
    const q = query(
      orderCol,
      where("order_id", "==", parseInt(orderId))
    );

    return onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      const orders = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      callback(orders);
    });
  };

  const streamPaid = (callback) => {
    const q = query(
      orderCol,
      where("payment_status", "==", "paid"),
      orderBy("order_placed_timestamp", "asc"),
      limit(15)
    );

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      callback(orders);
    });
  };

  const streamCancelled = (callback) => {
    const q = query(
      orderCol,
      where("payment_status", "==", "cancelled"),
      orderBy("order_placed_timestamp", "asc"),
      limit(15)
    );

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      callback(orders);
    });
  };

  // const loadMore = (documentId, callback) => {
  //   if (documentId === undefined) {
  //     console.log("undefined");
  //     return callback([]);
  //   }
  //   console.log(documentId);
  //   const q2 = query(
  //     orderCol,
  //     where("payment_status", "==", "unpaid"),
  //     orderBy("order_placed_timestamp", "asc"),
  //     // startAt(3),
  //   );
  //   return onSnapshot(q2, (snapshot) => {
  //     const orders = snapshot.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });

  //     callback(orders);
  //   });
  // };

  return { stream, streamSearch, streamPaid, streamCancelled };
}
