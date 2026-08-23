"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ShareButton({ eventId, title }: { eventId: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const canNativeShare = typeof navigator.share === "function";
    trackEvent("event_share", { event_id: eventId, share_type: canNativeShare ? "native" : "copy" });
    if (canNativeShare) {
      try {
        await navigator.share({ title: `${title} | CDA Tonight`, text: `See ${title} on CDA Tonight.`, url });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <button className="primary" onClick={share}>Share this event</button>
      {copied && <span className="share-confirm">Link copied.</span>}
    </>
  );
}
