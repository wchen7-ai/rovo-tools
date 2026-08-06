#!/usr/bin/env node
/*
 * build-embedded.js — regenerates data/rovo-rates.embedded.js from the canonical
 * data/rovo-rates.json. Run this AFTER any change to rovo-rates.json so the
 * offline (file://) fallback stays in sync.
 *
 *   node build-embedded.js
 *
 * The embedded copy is ONLY used when a tool is opened via file:// (fetch blocked).
 * When served over http/https (Live Server, GitHub Pages), the canonical JSON wins
 * and this file is ignored.
 */
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "data", "rovo-rates.json");
const outPath = path.join(__dirname, "data", "rovo-rates.embedded.js");

const json = fs.readFileSync(srcPath, "utf8");
JSON.parse(json); // validate before writing

const header = `/*
 * rovo-rates.embedded.js — GENERATED BUILD ARTIFACT. DO NOT HAND-EDIT.
 * Auto-generated from data/rovo-rates.json by build-embedded.js.
 * Regenerate after any change:  node build-embedded.js
 * Used only as the file:// (double-click) fallback when fetch() is blocked.
 */
`;

const body = "window.ROVO_RATES_EMBEDDED = " + json.trim() + ";\n";
fs.writeFileSync(outPath, header + body, "utf8");
console.log("Wrote " + outPath + " from " + srcPath);
