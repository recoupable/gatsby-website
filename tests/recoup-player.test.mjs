import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
const source=ts.transpileModule(readFileSync("src/lib/recoup-player.ts","utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
function load(env){const exports={};runInNewContext(source,{exports,process:{env},URL});return exports;}
const id="10000000-0000-4000-8000-000000000001";
const player=load({NEXT_PUBLIC_RECOUP_PLAYER_ID:id});
for(const provider of ["spotify","apple_music"]){
 const url=new URL(player.recoupPlayerUrl(provider,"https://www.gatsby.wtf",{source:"instagram",campaign:"bio"}));
 assert.equal(url.pathname,`/listen/${id}/${provider}`);assert.equal(url.searchParams.get("parent"),"https://www.gatsby.wtf");assert.equal(url.searchParams.get("source"),"instagram");assert.equal(url.searchParams.has("release"),false);assert.equal(url.searchParams.has("token"),false);
}
assert.equal(load({}).recoupPlayerUrl("spotify","https://www.gatsby.wtf",{}),null);
assert.equal(player.recoupPlayerUrl("spotify","https://www.gatsby.wtf",{},"iWish"),null);
assert.equal(load({NEXT_PUBLIC_RECOUP_PLAYER_ID:"bad"}).recoupPlayerUrl("spotify","https://www.gatsby.wtf",{}),null);
console.log("Registered player IDs replace artist-specific auth URLs; missing configuration retains direct DSP access.");
