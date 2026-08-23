"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ClientHydrationGate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="shell app-boot" aria-busy="true" aria-label="Loading CDA Tonight">
        <div className="app-boot-mark" aria-hidden="true" />
        <span>Loading tonight…</span>
      </main>
    );
  }

  return <>{children}</>;
}
