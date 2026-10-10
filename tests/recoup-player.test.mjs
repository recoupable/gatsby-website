import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
const exports = {};
runInNewContext(ts.transpileModule(readFileSync("src/lib/recoup-player.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, process: { env: {} }, URL });
for (const [provider, release, route] of [["spotify", "https://open.spotify.com/playlist/5b8JKnvweOEaLqS00nIr7n", "spotify"], ["apple_music", "https://music.apple.com/us/album/beautiful-tomorrow/1894545725", "apple"]]) {
  const url = new URL(exports.recoupPlayerUrl(provider, release, "https://www.gatsby.wtf"));
  assert.equal(url.origin, "https://app.recoupable.dev");
  assert.equal(url.pathname, `/s/${route}/connect`);
  assert.equal(url.searchParams.get("release"), release);
  assert.equal(url.searchParams.get("parent"), "https://www.gatsby.wtf");
  assert.equal(url.searchParams.has("token"), false);
}
console.log("Both provider buttons use Recoup's trusted player and retain the requested release.");
