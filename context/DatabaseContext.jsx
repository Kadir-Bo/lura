"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getFirebaseDB } from "@/lib/firebase/config";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

export const DatabaseContext = createContext(null);

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context)
    throw new Error("useDatabase must be used within a DatabaseProvider");
  return context;
};

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export default function DatabaseProvider({ children }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const db = getFirebaseDB();

  // ─────────────────────────────────────────────────────────────────────────────
  // Constants
  // ─────────────────────────────────────────────────────────────────────────────

  const DEFAULT_MODEL = "openai/gpt-oss-120b";

  // ─────────────────────────────────────────────────────────────────────────
  // User
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!user || !db) return;

    const init = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          const profile = {
            email: user.email,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            preferences: {
              defaultModel: DEFAULT_MODEL,
              language: "en",
              modelPreferences: "",
            },
            memories: [],
            usage: {
              totalMessages: 0,
              lastReset: serverTimestamp(),
            },
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp(),
          };
          await setDoc(userRef, profile);
          setUserProfile({ id: user.uid, ...profile });
        } else {
          await updateDoc(userRef, { lastActive: serverTimestamp() });
          setUserProfile({ id: userDoc.id, ...userDoc.data() });
        }
      } catch (err) {
        console.error("Failed to initialize user profile:", err);
      }
    };

    init();
  }, [user, db]);

  // ─────────────────────────────────────────────────────────────────────────
  // Context value
  // ─────────────────────────────────────────────────────────────────────────

  const values = {
    userProfile,
  };

  return (
    <DatabaseContext.Provider value={values}>
      {children}
    </DatabaseContext.Provider>
  );
}
