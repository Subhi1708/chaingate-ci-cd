const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

const PORT = 3100;
const URL = `http://127.0.0.1:${PORT}/health`;
let server;

async function waitForServer(tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(URL);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Server did not start in time');
}

before(async () => {
  server = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'inherit',
  });
  await waitForServer();
});

after(() => server.kill());

test('GET /health returns status OK', async () => {
  const res = await fetch(URL);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'OK');
});