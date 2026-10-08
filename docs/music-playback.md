# Music playback integration

Verified October 8, 2026. This page uses Spotify's official playlist embed and a direct Apple Music song link. No new website login, dependencies, credentials, or API routes are needed.

## Website behavior

- Spotify playlist: `5b8JKnvweOEaLqS00nIr7n`. Browser verification showed 19 songs, with I Wish first. The website heading is `gatsby starter pack`; the provider's saved title remains `gatsby grace starter pack`.
- The iframe preserves Spotify's documented permissions, including `encrypted-media`, and reserves 352px height. The separate playlist link works even when embedded content is blocked.
- Playback is controlled by Spotify for the listener's browser/session. In the verification session the player showed Preview; starting I Wish changed the control to Pause, and pausing worked. This does not prove authenticated full playback.
- Apple destination: [I Wish by Gatsby Grace](https://music.apple.com/us/album/i-wish/1894545725?i=6762530659), verified through Apple's public iTunes search and the Apple Music page. The artist is `1877412628`, song `6762530659`, album `1894545725`. This is an outbound listening link, not Apple login on this website.
- The existing I Wish Spotify CTA, video, social links, and email form remain present. The form handler and capture route are unchanged.

## Existing Recoup capabilities

Inspected API source at `96ee5f90` (no API files changed):

| Capability | Source / endpoints | What it actually does |
| --- | --- | --- |
| Spotify catalog | `lib/spotify/generateAccessToken.ts`; `/api/spotify/search`, `/artist`, `/artist/albums`, `/artist/topTracks`, `/album` under `/api/spotify` | Server client-credentials grant using `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`. Catalog metadata, not listener login or playback authorization. Live unauthenticated search returned 200. |
| Apple catalog | `app/api/apple/songs/route.ts`, `lib/apple/generateDeveloperToken.ts` | ISRC lookup with optional storefront; requires Recoup API key or Bearer authentication. Developer token uses Apple team ID, key ID and private key. Unauthenticated live lookup returned 401. Not a MusicKit user login endpoint. |
| Connectors | `lib/composio/connectors/getConnectors.ts`, `/api/connectors` | Authenticated connector authorization exists, but the explicitly supported toolkit list contains neither Spotify nor Apple Music. The generic authorization function alone is not evidence of a supported music login integration. |

## Older SyncStream implementation

Source: [SyncStreamAI/syncstream-npm](https://github.com/SyncStreamAI/syncstream-npm/tree/b430505662c63358f93d6dc0fe9564cd7d0308e0). npm package: `@syncstreamai/syncstream`, latest verified version `0.3.11`, registry modified November 12, 2024.

- `hooks/useSpotifyLogin.tsx` exchanges an authorization code and PKCE verifier, refreshes tokens, reads the listener profile, checks Premium, and initializes Spotify's Web Playback SDK. Login also reads listening/library data and sends fan data and tokens to the SyncStream backend.
- `hooks/useMusicKitPlayer.tsx` loads MusicKit JS v3 and requests `/api/getDeveloperToken`. `hooks/useMusicKitLogin.tsx` calls `musickit.authorize()`, reads recommendations/history, creates a fan record and can add the configured release to the listener's library.
- `SyncstreamProvider` requires `campaignId` and checks `/api/campaignId/check`. The README example instead passes `clientId`, so the README is not a reliable integration contract.
- Repository source hardcodes localhost backend/callback URLs. The inspected npm tarball instead uses `https://www.syncstream.ai` and its `/spotify` callback. The published package declares a React 19 release-candidate peer range, and its `module` field points to `dist/index.mjs`, which is absent in the retrieved tarball.
- A HEAD request to the legacy `/api/getDeveloperToken` returned 404. No developer token was retrieved. Neither legacy login was exercised with a user account; current hosted operation, app approval and callback configuration remain unverified.

These are real implementations, but not a verified drop-in service for this website. Do not import them just to display this public playlist.

## Requirements for a future custom player

Spotify full playback through the Web Playback SDK requires listener authorization, appropriate scopes and Spotify Premium. A public custom integration also needs valid redirect configuration and Spotify app access/quota approval; development mode is not general public availability. Apple MusicKit requires a developer token, listener authorization and an eligible subscription for full catalog playback. A catalog lookup token does not replace either provider's user authorization.

Official references: [Spotify embed creation](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed), [embed preview limits](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting), [Spotify SDK](https://developer.spotify.com/documentation/web-playback-sdk), [quota modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes), [Apple MusicKit](https://developer.apple.com/musickit/), [MusicKit user authorization](https://developer.apple.com/documentation/applemusicapi/user-authentication-for-musickit).

## Validation

- Production build and TypeScript check passed; ESLint on the changed page and `git diff --check` passed.
- Chrome browser verification at 390×844 and 1440×1000: no horizontal overflow; real playlist content and preview play/pause verified. This is responsive browser testing, not a physical-device or authenticated Premium test.
- Full-project lint retains three pre-existing `react-hooks/set-state-in-effect` errors in `MeshGradientGhost.tsx`, `browser/Browser.tsx`, and `phone/MessagesApp.tsx`.
- No live email was submitted during verification. No production deployment or playlist rename was performed.
