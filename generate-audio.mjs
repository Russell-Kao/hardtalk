#!/usr/bin/env node
// Pre-bake OpenAI TTS audio for every line in episodes.json.
// Already-baked files are skipped, so reruns are cheap.
//
// Usage (PowerShell):
//   $env:OPENAI_API_KEY = "sk-..."
//   node generate-audio.mjs
//
// Usage (bash):
//   OPENAI_API_KEY=sk-... node generate-audio.mjs
//
// Output: audio/{epId}/{lineIdx}.mp3   (e.g. audio/ep01/0.mp3)
// Voice: host=onyx, you=echo. Speed=0.92 baked in (client adjusts via playbackRate).

import fs from 'node:fs/promises';
import path from 'node:path';

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error('❌ 缺少 OPENAI_API_KEY');
  console.error('   PowerShell:  $env:OPENAI_API_KEY = "sk-..."');
  console.error('   bash:        export OPENAI_API_KEY=sk-...');
  process.exit(1);
}

const BAKED_SPEED = 0.92;
const HOST_VOICE = 'onyx';
const YOU_VOICE  = 'echo';
const CONCURRENCY = 6;

const stripEm = t => t.replace(/<\/?em>/g, '');
const exists = async p => { try { await fs.access(p); return true; } catch { return false; } };

async function synth(text, voice) {
  const r = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'tts-1', input: text, voice, speed: BAKED_SPEED })
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return Buffer.from(await r.arrayBuffer());
}

async function runPool(jobs, n) {
  const queue = jobs.slice();
  const workers = Array.from({ length: n }, async () => {
    while (queue.length) {
      const job = queue.shift();
      await job();
    }
  });
  await Promise.all(workers);
}

const data = JSON.parse(await fs.readFile('episodes.json', 'utf-8'));
const tasks = [];
let total = 0, skipped = 0;

for (const ep of data.episodes) {
  const dir = path.join('audio', ep.id);
  await fs.mkdir(dir, { recursive: true });
  for (let i = 0; i < ep.lines.length; i++) {
    total++;
    const out = path.join(dir, `${i}.mp3`);
    if (await exists(out)) { skipped++; continue; }
    const line = ep.lines[i];
    const voice = line.role === 'host' ? HOST_VOICE : YOU_VOICE;
    const label = `[${ep.id} ${String(i).padStart(2, '0')}/${ep.lines.length - 1}]`;
    tasks.push(async () => {
      try {
        const buf = await synth(stripEm(line.en), voice);
        await fs.writeFile(out, buf);
        console.log(`${label} ✓ ${voice.padEnd(5)} ${(buf.length / 1024).toFixed(1)}KB`);
      } catch (e) {
        console.error(`${label} ✗ ${e.message}`);
        throw e;
      }
    });
  }
}

console.log(`總計 ${total} 段 · 已存在 ${skipped} · 待合成 ${tasks.length}`);
if (tasks.length === 0) {
  console.log('全部都有了，沒事可做。');
  process.exit(0);
}

const startedAt = Date.now();
let failed = 0;
await runPool(tasks.map(t => async () => { try { await t(); } catch { failed++; } }), CONCURRENCY);
const sec = ((Date.now() - startedAt) / 1000).toFixed(1);

console.log(`\n完成 — 新增 ${tasks.length - failed} · 失敗 ${failed} · 耗時 ${sec}s`);
console.log('接下來：');
console.log('  git add audio/');
console.log('  git commit -m "Bake audio for new episodes"');
console.log('  git push');
