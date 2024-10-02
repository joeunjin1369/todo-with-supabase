"use client";

import React, { useEffect } from "react";
import supabase from "../../../supabase/client";
import { useAuthStore } from "../../../zustand/auth.store";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_eventName, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      initializeAuth();
    });
  }, []);

  return children;
}

export default AuthProvider;
