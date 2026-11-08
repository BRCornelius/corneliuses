#!/usr/bin/env node
// Manage the Holiday Card photos (public/card/<year>.jpg) and their
// manifest (src/data/holiday-cards.json).
//
//   npm run card -- add <image> <year> [--frame x,y,w,h]
//       Resize/compress the image to public/card/<year>.jpg and add or
//       replace that year in the manifest.
//   npm run card -- frame <year> <x,y,w,h>
//       Set where the held frame sits in <year>'s photo, as percentages.
//   npm run card -- preview <year> <out.png> [--frame x,y,w,h]
//       Write a copy of the photo with a labelled 10% grid (and the frame
//       box, if known or given) to help measure the frame.
//   npm run card -- remove <year>
//   npm run card -- check
//       Every manifest year has a photo and vice versa, and every year
//       except the oldest has a measured frame.

import { readFile, writeFile, readdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photoDir = path.join(root, "public/card");
const manifestPath = path.join(root, "src/data/holiday-cards.json");
const MAX_WIDTH = 2400;
const MAX_HEIGHT = 2400;
const QUALITY = 80;

const photoPath = (year) => path.join(photoDir, `${year}.jpg`);

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function parseYear(s) {
  const year = Number(s);
  if (!Number.isInteger(year) || year < 1900 || year > 2200) fail(`bad year: ${s}`);
  return year;
}

function parseFrame(s) {
  const parts = String(s).split(",").map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) {
    fail(`frame must be x,y,width,height in percent, got: ${s}`);
  }
  const [x, y, width, height] = parts;
  if (x < 0 || y < 0 || width <= 0 || height <= 0 || x + width > 100 || y + height > 100) {
    fail(`frame ${s} must sit inside the photo (0-100%)`);
  }
  const r = (n) => Math.round(n * 100) / 100;
  return { x: r(x), y: r(y), width: r(width), height: r(height) };
}

function takeFlag(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const value = args[i + 1];
  if (value === undefined) fail(`${name} needs a value`);
  args.splice(i, 2);
  return value;
}

async function loadManifest() {
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

async function saveManifest(entries) {
  entries.sort((a, b) => a.year - b.year);
  await writeFile(manifestPath, JSON.stringify(entries, null, 2) + "\n");
}

async function add(args) {
  const frameArg = takeFlag(args, "--frame");
  const [input, yearArg] = args;
  if (!input || !yearArg) fail("usage: add <image> <year> [--frame x,y,w,h]");
  if (!existsSync(input)) fail(`no such file: ${input}`);
  const year = parseYear(yearArg);
  // Validate everything before touching an existing photo.
  const newFrame = frameArg ? parseFrame(frameArg) : undefined;
  const entries = await loadManifest();
  const existing = entries.find((e) => e.year === year);

  const info = await sharp(input)
    .rotate() // respect EXIF orientation
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(photoPath(year));

  const aspect = Math.round((info.width / info.height) * 10000) / 10000;
  const frame = newFrame ?? existing?.frame ?? null;
  const entry = { year, aspect, frame };
  await saveManifest([...entries.filter((e) => e.year !== year), entry]);

  const kb = Math.round(info.size / 1024);
  console.log(`${year}: ${info.width}x${info.height}, ${kb} KB, aspect ${aspect}` +
    (frame ? `, frame ${JSON.stringify(frame)}` : ", frame not set yet"));
}

async function setFrame(args) {
  const [yearArg, frameArg] = args;
  if (!yearArg || !frameArg) fail("usage: frame <year> <x,y,w,h>");
  const year = parseYear(yearArg);
  const entries = await loadManifest();
  const entry = entries.find((e) => e.year === year);
  if (!entry) fail(`${year} isn't in the manifest; add its photo first`);
  entry.frame = parseFrame(frameArg);
  await saveManifest(entries);
  console.log(`${year}: frame ${JSON.stringify(entry.frame)}`);
}

async function preview(args) {
  const frameArg = takeFlag(args, "--frame");
  const [yearArg, out] = args;
  if (!yearArg || !out) fail("usage: preview <year> <out.png> [--frame x,y,w,h]");
  const year = parseYear(yearArg);
  if (!existsSync(photoPath(year))) fail(`no photo for ${year}; add it first`);
  const entry = (await loadManifest()).find((e) => e.year === year);
  const frame = frameArg ? parseFrame(frameArg) : entry?.frame;

  const W = 1200;
  const meta = await sharp(photoPath(year)).metadata();
  const H = Math.round((W * meta.height) / meta.width);
  const img = sharp(photoPath(year)).resize({ width: W, height: H });

  let lines = "";
  for (let p = 10; p < 100; p += 10) {
    const x = (W * p) / 100;
    const y = (H * p) / 100;
    const strong = p === 50 ? 0.9 : 0.55;
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#0ff" stroke-opacity="${strong}" stroke-width="1"/>`;
    lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#0ff" stroke-opacity="${strong}" stroke-width="1"/>`;
    lines += `<text x="${x + 3}" y="14" font-size="13" font-family="sans-serif" fill="#0ff" stroke="#000" stroke-width="3" paint-order="stroke">${p}</text>`;
    lines += `<text x="3" y="${y - 3}" font-size="13" font-family="sans-serif" fill="#0ff" stroke="#000" stroke-width="3" paint-order="stroke">${p}</text>`;
  }
  if (frame) {
    lines += `<rect x="${(W * frame.x) / 100}" y="${(H * frame.y) / 100}" width="${(W * frame.width) / 100}" height="${(H * frame.height) / 100}" fill="none" stroke="#f0f" stroke-width="3"/>`;
  }
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${lines}</svg>`);
  await img.composite([{ input: svg }]).png().toFile(out);
  console.log(`wrote ${out} (${W}x${H})${frame ? `, frame ${JSON.stringify(frame)}` : ""}`);
}

async function remove(args) {
  const year = parseYear(args[0]);
  const entries = await loadManifest();
  await saveManifest(entries.filter((e) => e.year !== year));
  if (existsSync(photoPath(year))) await unlink(photoPath(year));
  console.log(`removed ${year}`);
}

async function check() {
  const entries = await loadManifest();
  const files = (await readdir(photoDir)).filter((f) => /^\d{4}\.jpg$/.test(f));
  const problems = [];
  const years = entries.map((e) => e.year).sort((a, b) => a - b);
  for (const e of entries) {
    if (!files.includes(`${e.year}.jpg`)) problems.push(`${e.year} is in the manifest but public/card/${e.year}.jpg is missing`);
    if (e.year !== years[0] && !e.frame) problems.push(`${e.year} has no frame; zooming into ${years[years.indexOf(e.year) - 1]} will aim at the middle`);
  }
  for (const f of files) {
    if (!entries.some((e) => `${e.year}.jpg` === f)) problems.push(`public/card/${f} isn't in the manifest`);
  }
  for (let i = 1; i < years.length; i++) {
    if (years[i] - years[i - 1] > 1) problems.push(`gap: no card between ${years[i - 1]} and ${years[i]}`);
  }
  console.log(`years: ${years.join(", ") || "(none)"}`);
  if (problems.length) {
    for (const p of problems) console.log(`- ${p}`);
    process.exit(1);
  }
  console.log("ok");
}

const [cmd, ...args] = process.argv.slice(2);
const commands = { add, frame: setFrame, preview, remove, check };
if (!commands[cmd]) fail(`unknown command "${cmd ?? ""}"; use add, frame, preview, remove or check`);
await commands[cmd](args);
