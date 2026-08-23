"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type PlayerTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  src: string;
};

type PlaylistResponse = {
  available: boolean;
  label: string;
  sponsor: { name: string; url: string };
  tracks: PlayerTrack[];
};

function timeLabel(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function EchoVerseSponsoredPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resumeAfterTrackChange = useRef(false);
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const [error, setError] = useState("");

  const tracks = playlist?.tracks || [];
  const track = tracks[index];

  useEffect(() => {
    let active = true;
    fetch("/api/echoverse/playlist")
      .then((response) => response.json())
      .then((data: PlaylistResponse) => {
        if (!active) return;
        setPlaylist(data);
      })
      .catch(() => {
        if (active) setPlaylist({ available: false, label: "CDA SwampHop", sponsor: { name: "EchoVerse Audio", url: "#" }, tracks: [] });
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    setCurrentTime(0);
    setDuration(0);
    setError("");
    audio.load();

    if (resumeAfterTrackChange.current) {
      resumeAfterTrackChange.current = false;
      audio.play().catch(() => {
        setPlaying(false);
        setError("Tap play to continue.");
      });
    }
  }, [index, track?.id]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  if (!playlist?.available || !track) return null;

  const toggleExpanded = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) trackEvent("echoverse_player_open", { track_id: track.id, placement: "sponsored_player" });
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      trackEvent("echoverse_play", { track_id: track.id, title: track.title });
    } catch {
      setPlaying(false);
      setError("Audio is temporarily unavailable.");
    }
  };

  const changeTrack = (direction: number) => {
    const audio = audioRef.current;
    resumeAfterTrackChange.current = Boolean(audio && !audio.paused);
    setIndex((current) => (current + direction + tracks.length) % tracks.length);
    trackEvent("echoverse_track_change", { direction: direction > 0 ? "next" : "previous" });
  };

  const nextTrack = () => changeTrack(1);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = (value / 100) * audio.duration;
  };

  const setAudioVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <aside className={`echoverse-player ${expanded ? "expanded" : ""}`} aria-label="Sponsored CDA SwampHop audio player">
      <div className="echoverse-player-bar">
        <button className="echoverse-play" type="button" onClick={togglePlay} aria-label={playing ? "Pause CDA SwampHop" : "Play CDA SwampHop"}>
          {playing ? "Ⅱ" : "▶"}
        </button>
        <button className="echoverse-summary" type="button" onClick={toggleExpanded} aria-expanded={expanded}>
          <span>Sponsored · EchoVerse</span>
          <strong>{playing ? track.title : "CDA SwampHop"}</strong>
          <small>{playing ? `${track.artist} · ${index + 1}/${tracks.length}` : `${tracks.length} local tracks`}</small>
        </button>
        <button className="echoverse-expand" type="button" onClick={toggleExpanded} aria-label={expanded ? "Collapse player" : "Expand player"}>
          {expanded ? "↓" : "↑"}
        </button>
      </div>

      {expanded && (
        <div className="echoverse-player-detail">
          <div className="echoverse-now-playing">
            <span>NOW PLAYING · CDA SWAMPHOP</span>
            <strong>{track.title}</strong>
            <small>{track.artist}{track.album ? ` · ${track.album}` : ""}</small>
          </div>

          <div className="echoverse-progress-row">
            <span>{timeLabel(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={duration ? Math.min(100, (currentTime / duration) * 100) : 0}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Track progress"
            />
            <span>{timeLabel(duration)}</span>
          </div>

          <div className="echoverse-controls">
            <button type="button" onClick={() => changeTrack(-1)} aria-label="Previous track">‹</button>
            <button className="main" type="button" onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
            <button type="button" onClick={nextTrack} aria-label="Next track">›</button>
            <label className="echoverse-volume">
              <span>VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setAudioVolume(Number(event.target.value))}
                aria-label="Volume"
              />
            </label>
          </div>

          <div className="echoverse-player-foot">
            <span>{error || "Local sound for the night. Playback starts only when you tap play."}</span>
            <a
              href={playlist.sponsor.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("echoverse_sponsor_click", { placement: "sponsored_player" })}
            >
              EchoVerse Audio ↗
            </a>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={nextTrack}
        onError={() => {
          setPlaying(false);
          setError("This track could not be loaded. Try the next one.");
        }}
      />
    </aside>
  );
}
