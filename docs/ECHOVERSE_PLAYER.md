# EchoVerse sponsored player

CDA Tonight includes a small, visitor-initiated **CDA SwampHop** player sponsored by EchoVerse Audio.

## Rules

- Never autoplay. Audio starts only after a visitor taps Play.
- Clearly label the unit `Sponsored · EchoVerse`.
- Keep the player secondary to event planning and navigation.
- Never invent or assume a remote audio/catalog service.
- Only expose Play controls for audio files that actually respond successfully from CDA Tonight.
- If no playable files are published yet, show a small sponsor/status shell instead of a broken Play button.

## Audio contract

Approved MP3s live under:

`public/audio/echoverse/`

The visitor rotation is defined in `data/echoverse-player.ts`. The playlist route returns that manifest, and the browser preflights the listed files before enabling playback.

Current live filenames:

- `cda-dont-sleep.mp3`
- `call-it-corner.mp3`
- `docklife-drip.mp3`
- `echoverse-midnight-radio.mp3`
- `fri-freeze.mp3`
- `sub-below-sea-level.mp3`

The files are normalized to lowercase web-safe names while preserving the original uploaded audio blobs.

## Data flow

`public/audio/echoverse/*.mp3 → /api/echoverse/playlist → browser file preflight → EchoVerseSponsoredPlayer`

Once a listed MP3 is present in `public/audio/echoverse/`, it becomes eligible for playback without rebuilding the player UI.

## Analytics

- `echoverse_player_open`
- `echoverse_play`
- `echoverse_track_change`
- `echoverse_sponsor_click`
