import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('interpolates scalar values', () => {
  assert.equal(api.renderTemplate('{{name}}: {{count}}', { name: 'box', count: 3 }), 'box: 3');
});
test('resolves nested paths', () => {
  assert.equal(api.renderTemplate('Hi {{ user.name }}', { user: { name: 'Ari' } }), 'Hi Ari');
});
test('preserves ordinary text', () => {
  assert.equal(api.renderTemplate('no tokens', {}), 'no tokens');
});
test('stringifies null explicitly', () => {
  assert.equal(api.renderTemplate('{{value}}', { value: null }), 'null');
});
test('rejects missing path', () => {
  assert.throws(() => api.renderTemplate('{{missing}}', {}), TypeError);
});
test('rejects object interpolation', () => {
  assert.throws(() => api.renderTemplate('{{value}}', { value: { x: 1 } }), TypeError);
});
