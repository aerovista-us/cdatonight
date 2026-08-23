# EchoVerse sponsored player

CDA Tonight includes a small, visitor-initiated **CDA SwampHop** player sponsored by EchoVerse Audio.

## Rules

- Never autoplay. Audio starts only after a visitor taps Play.
- Clearly label the unit `Sponsored · EchoVerse`.
- Keep the player secondary to event planning and navigation.
- If the EchoVerse catalog cannot return playable tracks, render no player rather than a broken promo.
- Keep canonical audio in EchoVerse; do not duplicate MP3 files into CDA Tonight.

## Data flow

`EchoVerse Music Catalog → /api/echoverse/playlist → EchoVerseSponsoredPlayer`

The server adapter reads `ECHOVERSE_MUSIC_API` (default `https://music.aerovista.us/api/catalog`), selects up to six approved CDA/SwampHop tracks by stable `track_id`, and returns absolute canonical audio URLs.

Preferred titles are maintained in `data/echoverse-player.ts`. Changing the visitor rotation should normally require only editing that list.

## Analytics

- `echoverse_player_open`
- `echoverse_play`
- `echoverse_track_change`
- `echoverse_sponsor_click`
