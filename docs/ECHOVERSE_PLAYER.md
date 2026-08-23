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

Current expected filenames:

- `docklight-drip.mp3`
- `swamphop-megahits.mp3`
- `swamphop-worldwide-cda-midnight.mp3`
- `bass-dont-lie.mp3`
- `thirty-two-grand.mp3`

This mirrors the older EchoVerse player pattern, which used local `./audio/*.mp3` media rather than a public catalog API.

## Data flow

`public/audio/echoverse/*.mp3 → /api/echoverse/playlist → browser file preflight → EchoVerseSponsoredPlayer`

Once a listed MP3 is present in `public/audio/echoverse/`, it becomes eligible for playback without rebuilding the player UI.

## Analytics

- `echoverse_player_open`
- `echoverse_play`
- `echoverse_track_change`
- `echoverse_sponsor_click`
