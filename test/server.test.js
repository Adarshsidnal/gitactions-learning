import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from '../server.js';

const server = app.listen(0);
await once(server, 'listening');
const baseUrl = `http://localhost:${server.address().port}`;

test.after(() => server.close());

test('health endpoint reports the service is available', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok', service: 'github-actions-learning-app' });
});

test('lessons endpoint returns the learning plan', async () => {
  const response = await fetch(`${baseUrl}/api/lessons`);
  const lessons = await response.json();
  assert.equal(response.status, 200);
  assert.equal(lessons.length, 3);
  assert.equal(lessons[0].title, 'Workflow basics');
});

test('unknown lesson returns a useful error', async () => {
  const response = await fetch(`${baseUrl}/api/lessons/999`, { method: 'PATCH', body: JSON.stringify({ completed: true }), headers: { 'Content-Type': 'application/json' } });
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Lesson not found' });
});