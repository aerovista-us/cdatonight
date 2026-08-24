"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const formspreeEndpoint = "https://formspree.io/f/xnjwverg";

type Fields = {
  title: string;
  date: string;
  start: string;
  end: string;
  venue: string;
  address: string;
  sourceUrl: string;
  contact: string;
  cost: string;
  notes: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const initial: Fields = { title: "", date: "", start: "", end: "", venue: "", address: "", sourceUrl: "", contact: "", cost: "", notes: "" };

function submissionText(fields: Fields) {
  return [
    "CDA TONIGHT EVENT SUBMISSION",
    "",
    `Event: ${fields.title}`,
    `Date: ${fields.date}`,
    `Start: ${fields.start}`,
    `End: ${fields.end || "Not provided"}`,
    `Venue: ${fields.venue}`,
    `Address: ${fields.address || "Not provided"}`,
    `Official/source URL: ${fields.sourceUrl}`,
    `Cost: ${fields.cost || "Not provided"}`,
    `Organizer/contact: ${fields.contact || "Not provided"}`,
    "",
    "Notes:",
    fields.notes || "None",
    "",
    "I understand this submission is reviewed before publication and may be rejected if the source cannot verify the event details."
  ].join("\n");
}

export default function SubmitEventForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (submitState !== "idle") setSubmitState("idle");
  };

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    const subject = `[CDA Tonight submission] ${fields.title} — ${fields.date}`;
    const payload = new FormData();
    Object.entries(fields).forEach(([key, value]) => payload.append(key, value));
    payload.append("_subject", subject);
    payload.append("submission", submissionText(fields));
    payload.append("source", "CDA Tonight");

    trackEvent("event_submission_start", { has_end_time: Boolean(fields.end), has_contact: Boolean(fields.contact) });

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);

      trackEvent("event_submission_success", { event_title: fields.title || "untitled" });
      setFields(initial);
      setSubmitState("success");
    } catch {
      trackEvent("event_submission_error", { event_title: fields.title || "untitled" });
      setSubmitState("error");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(submissionText(fields));
    setCopied(true);
    trackEvent("event_submission_copy", { event_title: fields.title || "untitled" });
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="submit-card">
      <h2>Send it for review.</h2>
      <p>Nothing submitted here is auto-published. A source URL is required so CDA Tonight can verify the event before it enters the trusted feed.</p>
      <form className="submit-form" onSubmit={send}>
        <label>Event name<input required value={fields.title} onChange={(e) => update("title", e.target.value)} placeholder="What is happening?" /></label>
        <label>Date<input required type="date" value={fields.date} onChange={(e) => update("date", e.target.value)} /></label>
        <label>Start time<input required type="time" value={fields.start} onChange={(e) => update("start", e.target.value)} /></label>
        <label>End time<input type="time" value={fields.end} onChange={(e) => update("end", e.target.value)} /></label>
        <label>Venue<input required value={fields.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Venue / park / organizer" /></label>
        <label>Address<input value={fields.address} onChange={(e) => update("address", e.target.value)} placeholder="Street address if known" /></label>
        <label className="full">Official or authoritative source URL<input required type="url" value={fields.sourceUrl} onChange={(e) => update("sourceUrl", e.target.value)} placeholder="https://..." /></label>
        <label>Cost / price<input value={fields.cost} onChange={(e) => update("cost", e.target.value)} placeholder="Free, $20, unknown..." /></label>
        <label>Organizer / contact<input value={fields.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Name, email or phone (optional)" /></label>
        <label className="full">Notes<textarea value={fields.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Age limits, ticket notes, schedule details, anything useful for verification." /></label>
        <div className="submit-policy">Moderation rule: a submission is only an intake lead. The event does not become trusted merely because someone submitted it; timing, existence, price and availability still need a source.</div>
        <div className="submit-actions"><button type="submit" disabled={submitState === "submitting"}>{submitState === "submitting" ? "Sending…" : "Submit for review"}</button><button className="secondary" type="button" onClick={copy}>Copy submission</button></div>
        {submitState === "success" && <span className="submit-success" role="status">Submission received. We’ll review the source before anything is published.</span>}
        {submitState === "error" && <span className="submit-success" role="alert">Submission could not be sent. Please try again, or use “Copy submission” as a fallback.</span>}
        {copied && <span className="submit-success" role="status">Submission copied.</span>}
      </form>
    </section>
  );
}
