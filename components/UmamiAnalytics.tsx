"use client";

import { useEffect } from "react";
import { flushQueuedEvents } from "@/lib/analytics";

const DEFAULT_UMAMI_URL = "https://stats.aerocoreos.com";
const DEFAULT_UMAMI_WEBSITE_ID = "8d3be7f4-0747-4581-b4b0-2d6f594b25bc";

function hostAllowed(hostname: string, domains: string[]) {
  if (!domains.length) return true;
  const host = hostname.toLowerCase();
  return domains.some((domain) => {
    const normalized = domain.toLowerCase();
    if (normalized === host) return true;
    if (normalized.startsWith(".")) return host.endsWith(normalized);
    return false;
  });
}

export default function UmamiAnalytics() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() || DEFAULT_UMAMI_WEBSITE_ID;
    const url = (process.env.NEXT_PUBLIC_UMAMI_URL || DEFAULT_UMAMI_URL).replace(/\/$/, "");
    const allowedDomains = (process.env.NEXT_PUBLIC_UMAMI_DOMAINS || "").split(",").map((v) => v.trim()).filter(Boolean);
    const { hostname, protocol, search } = window.location;
    if (protocol === "file:" || ["localhost", "127.0.0.1", "::1"].includes(hostname)) return;
    if (new URLSearchParams(search).get("no_analytics") === "1") return;
    if (!hostAllowed(hostname, allowedDomains)) return;

    const existing = document.querySelector<HTMLScriptElement>("script[data-aerolocal-umami]");
    if (existing) {
      if (window.umami) flushQueuedEvents();
      else existing.addEventListener("load", flushQueuedEvents, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `${url}/script.js`;
    script.setAttribute("data-website-id", websiteId);
    script.setAttribute("data-aerolocal-umami", "true");
    script.addEventListener("load", flushQueuedEvents, { once: true });
    document.head.appendChild(script);
  }, []);
  return null;
}
