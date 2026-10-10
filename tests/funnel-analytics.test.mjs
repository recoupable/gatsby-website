import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const calls = [];
const exports = {};
const context = { exports, URL, URLSearchParams, window: { location: { href: "https://www.gatsby.wtf/?utm_source=instagram&utm_medium=social&utm_campaign=bio&email=private@example.com" , search: "?utm_source=instagram&utm_medium=social&utm_campaign=bio&email=private@example.com" } }, require: () => ({ track: (...args) => calls.push(args) }) };
vm.runInNewContext(ts.transpileModule(readFileSync("src/lib/funnel-analytics.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, context);
const { sanitizeAnalyticsEvent, trackFunnelEvent } = exports;
const clean = sanitizeAnalyticsEvent({ type: "pageview", url: "https://www.gatsby.wtf/?utm_source=INSTAGRAM&utm_campaign=bio&email=private@example.com#secret" });
assert.equal(clean.url, "https://www.gatsby.wtf/?utm_source=instagram&utm_campaign=bio");
for (const url of ["http://localhost:3151/", "https://preview.vercel.app/", "https://www.gatsby.wtf/?analytics_test=1"]) assert.equal(sanitizeAnalyticsEvent({ type: "event", url }), null);
assert.equal(sanitizeAnalyticsEvent({ type: "pageview", url: "https://www.gatsby.wtf/?utm_source=private@example.com&token=secret" }).url, "https://www.gatsby.wtf/");
trackFunnelEvent("music_link_clicked", "spotify");
assert.equal(calls.length, 1);
assert.equal(calls[0][1].provider, "spotify");
assert.equal(calls[0][1].acquisition, "instagram/social/bio/unattributed");
assert.equal(Object.keys(calls[0][1]).length, 2);
assert.ok(!JSON.stringify(calls).includes("private@example.com"));
context.window.location.href = "https://www.gatsby.wtf/?analytics_test=1";
trackFunnelEvent("signup_completed");
assert.equal(calls.length, 1);
console.log("Analytics redaction, attribution, test exclusion and provider handoff payload checks passed.");

context.window.location.href = "https://www.gatsby.wtf/i-wish?utm_source=x&utm_medium=social&utm_campaign=i_wish&utm_content=video&email=private@example.com";
context.window.location.search = new URL(context.window.location.href).search;
trackFunnelEvent("landing_viewed");
trackFunnelEvent("music_link_clicked", "apple_music");
assert.equal(calls[1][1].acquisition, "x/social/i_wish/video/i_wish");
assert.equal(calls[2][1].provider, "apple_music");
assert.equal(Object.keys(calls[2][1]).length, 2);
assert.ok(!JSON.stringify(calls).includes("private@example.com"));
context.window.location.href = "https://www.gatsby.wtf/i-wish/?utm_source=x";
context.window.location.search = "?utm_source=x";
trackFunnelEvent("landing_viewed");
assert.equal(calls[3][1].acquisition, "x/unattributed/unattributed/unattributed/i_wish");
for (const url of ["https://www.gatsby.wtf/i-wish?analytics_test=1", "https://www.gatsby.wtf/unknown", "https://preview.vercel.app/i-wish"]) {
  context.window.location.href = url;
  trackFunnelEvent("landing_viewed");
}
assert.equal(calls.length, 4);
console.log("Song-route separation, X acquisition, trailing slash and exclusions passed.");

const configExports = {};
vm.runInNewContext(ts.transpileModule(readFileSync("next.config.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports: configExports });
const redirects = await configExports.default.redirects();
assert.equal(redirects.length, 4);
for (const [alias, platform] of [["/ig", "instagram"], ["/tt", "tiktok"], ["/yt", "youtube"], ["/x", "x"]]) {
  const redirect = redirects.find(row => row.source === alias);
  assert.equal(redirect.permanent, false);
  const destination = new URL(redirect.destination, "https://www.gatsby.wtf");
  assert.equal(destination.pathname, "/");
  assert.equal(destination.searchParams.get("utm_source"), platform);
  const cleanDestination = new URL(sanitizeAnalyticsEvent({type: "pageview", url: destination.href}).url);
  for (const [key, value] of Object.entries({ utm_source: platform, utm_medium: "social", utm_campaign: "bio", utm_content: "profile" })) {
    assert.equal(destination.searchParams.get(key), value);
    assert.equal(cleanDestination.searchParams.get(key), value);
  }
}
console.log("Short profile links retain supported source attribution and the homepage destination.");
