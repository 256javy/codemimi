"use client";

import { useEffect } from "react";
import { useStudentStore } from "@/lib/store";

/** Dispara la rehidratación manual del store persistido tras montar en cliente.
 *  Necesario porque el store usa skipHydration para evitar mismatch SSR/cliente. */
export default function StoreHydration() {
  useEffect(() => {
    useStudentStore.persist.rehydrate();
    useStudentStore.setState({ hydrated: true });
  }, []);

  return null;
}
