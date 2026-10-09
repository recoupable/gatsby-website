# Music playback integration

Updated October 9, 2026. The homepage is a silent full-screen video with Spotify and Apple Music buttons. They open provider-owned web players in the same tab; they do not create a Gatsby account, initiate website OAuth, or force a login dialog for existing provider sessions. No new dependencies, credentials, or API routes are needed.

## Website behavior

- Spotify destination: `https://open.spotify.com/playlist/5b8JKnvweOEaLqS00nIr7n`. Browser handoff verified the public playlist has 19 songs, with I Wish first. Its saved title remains `gatsby grace starter pack`.
- Apple destination: [Beautiful Tomorrow by Gatsby Grace](https://music.apple.com/us/album/beautiful-tomorrow/1894545725). The user approved this album destination while an Apple Music playlist is unavailable. Browser handoff verified the correct album page. It includes I Wish, song `6762530659`.
- The video is always muted and has no unmute control. The optimized 1280px MP4 has no audio track and is 83.4% smaller than the source. Video loading and autoplay are skipped when reduced motion or a browser data-saving preference is detected; manual play remains available. A small play/pause control remains available.
- The cream layout, song headline, bio, promotional copy, social icon row and embedded player are removed. Metadata now leads with Gatsby.
- Email signup is preserved behind a small updates button. The native dialog provides focus containment, Escape dismissal and focus return; opening it pauses the video. The capture API and email submission behavior are unchanged.
- Playback, sign-in prompts, account/subscription rules, app handoff and regional availability are controlled by Spotify and Apple Music. No forced autoplay or authenticated full playback is claimed.

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

- Production build and TypeScript check passed; ESLint on both changed source files and `git diff --check` passed.
- Chrome browser verification at 390×844 and 1440×900: responsive buttons and no horizontal overflow; video muted during playback; pause control worked.
- Both provider destinations were verified with the exact Spotify playlist and Apple album titles. No provider login or account mutation was performed.
- Mobile signup dialog checked visually; Escape closed it and returned focus to updates. No live email submitted.
- Full-project lint previously identified three pre-existing `react-hooks/set-state-in-effect` errors in `MeshGradientGhost.tsx`, `browser/Browser.tsx`, and `phone/MessagesApp.tsx`; those files remain untouched.
- This is browser viewport testing, not physical-device playback verification. No production merge/deployment or playlist rename was performed.

## Stream-conversion experiment — October 9

Keep the accepted silent video, centered Spotify-green and Apple-red buttons, and quiet signup. Change button copy from “sign in with” to “listen on”: the destination is music, and the site does not perform provider authentication. Open links in the same tab to avoid an extra browser context in social in-app browsers. These are conversion hypotheses, not measured uplift.

Reduce the background video from 41,108,417 bytes to a 1280px silent encode without changing its scenes or duration. Keep the original asset available, but remove it from the landing-page download path. Remove two unused Google font families; the accepted design uses system fonts.

At the October 9 release, Vercel Web Analytics was enabled on the existing project and the official SDK was added. Page views, source-attributed landing events, music-link clicks and successful signup events are instrumented; provider playback remains outside website measurement. Historical website conversion data before instrumentation is unavailable. Do not treat deployment as instrumentation, a button click as a stream, or an empty baseline as zero. Before the next comparison, use the chosen site's analytics service to measure landing sessions and outbound Spotify/Apple clicks, segmented by tagged acquisition source. Do not send emails, provider tokens or arbitrary query strings in analytics payloads. The existing Vercel Pro project is used; no plan upgrade or separate analytics service was purchased.

Suggested comparison: compare the first complete seven days after instrumentation with the following seven complete days, retaining traffic-source mix and release dates; no instrumented pre-release baseline exists. Measure outbound clicks / landing sessions separately for each provider. Review actual listeners, streams per listener and saves in the artist dashboards for the matching period. These aggregate music metrics are not attributable website conversions without a supported attribution mechanism. Spotify requires at least 30 seconds of playback for a stream ([official definition](https://support.spotify.com/us/artists/article/how-we-count-streams/)).

Next experiment depends on traffic intent: a general bio link keeps the starter-pack playlist; an I Wish-specific campaign can test a direct-song destination. Do not silently replace the user's selected playlist or approved Apple album before defining that experiment.

## Measurement implementation — October 9

- Automatic page views use `@vercel/analytics/next`. A once-per-mount `landing_viewed` event supplies the source-attributed denominator. Pro allows two custom-event properties, so `music_link_clicked` records only `provider` and `acquisition`. The latter packs allowlisted source/medium/campaign/content in that fixed slash-separated order; missing values become `unattributed`. `landing_viewed` and `signup_completed` retain the same acquisition field. Destinations and layout variant are fixed by this release, not additional event properties. Native UTM dashboard reporting requires an add-on and is not assumed here ([Vercel limits](https://vercel.com/docs/analytics/limits-and-pricing)). `signup_completed` fires only after the capture API returns success; it never includes the email.
- Query strings are stripped except documented allowlisted campaign values. Preview hosts, localhost and URLs containing `analytics_test` are excluded. Release smoke checks use `utm_source=verification&utm_campaign=release_check`; exclude these tagged checks from performance comparisons. Link navigation does not wait for tracking; blockers and network failures may reduce measured clicks.
- Use provider-specific unique `music_link_clicked` visitors / unique `landing_viewed` visitors for the same acquisition field and reporting window. Raw clicks / page views are a secondary interaction rate, not a listener conversion rate. Compare seven complete days after release against the next seven; there is no instrumented pre-release website baseline. Use music-dashboard metrics alongside these periods without claiming user-level attribution.
- Approved starter-pack playlist and Apple album remain the baseline destinations. Do not change social profiles or assign an experiment winner without evidence.

Ready-to-use acquisition links (not yet installed in social profiles):

| Placement | URL |
| --- | --- |
| Instagram bio | https://www.gatsby.wtf/?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=profile |
| TikTok bio | https://www.gatsby.wtf/?utm_source=tiktok&utm_medium=social&utm_campaign=bio&utm_content=profile |
| Instagram I Wish Reel | https://www.gatsby.wtf/?utm_source=instagram&utm_medium=social&utm_campaign=i_wish&utm_content=reel |
| TikTok I Wish video | https://www.gatsby.wtf/?utm_source=tiktok&utm_medium=social&utm_campaign=i_wish&utm_content=video |

Validation: production build, changed-file lint, analytics redaction/attribution tests and 844×320 short-screen controls passed. Explicit white keyboard-focus rings were verified. Vercel accepted analytics enablement; release verification must additionally confirm script delivery and collected events.
