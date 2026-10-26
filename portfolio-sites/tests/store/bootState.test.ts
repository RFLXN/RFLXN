import { test } from "node:test";
import assert from "node:assert/strict";
import { bootConfig, delay, logBadge, useBootStore } from "../../src/store/bootStore";

test("boot displays each configured line before leaving, then completes", () => {
  useBootStore.setState({
    phase: "booting",
    visibleCount: 1,
    completedCount: 0,
  });
  for (let count = 1; count < bootConfig.logs.length; count++) {
    assert.equal(useBootStore.getState().phase, "booting");
    useBootStore.getState().advance();
    assert.equal(useBootStore.getState().visibleCount, count + 1);
    assert.equal(useBootStore.getState().completedCount, count);
  }
  useBootStore.getState().advance();
  assert.equal(useBootStore.getState().phase, "leaving");
  useBootStore.getState().complete();
  assert.equal(useBootStore.getState().phase, "ready");
});
test("skipping prevents a pending line from restarting the sequence", () => {
  useBootStore.setState({
    phase: "booting",
    visibleCount: 1,
    completedCount: 0,
  });
  useBootStore.getState().skip();
  useBootStore.getState().advance();
  assert.equal(useBootStore.getState().visibleCount, 1);
  assert.equal(useBootStore.getState().completedCount, 0);
  assert.equal(useBootStore.getState().phase, "leaving");
  useBootStore.getState().complete();
  useBootStore.getState().skip();
  assert.equal(useBootStore.getState().phase, "ready");
});
test("custom durations cannot overflow the browser timer or become negative", () => {
  assert.equal(delay(-1), 0);
  assert.equal(delay(Infinity), 0);
  assert.equal(delay(500), 500);
  assert.equal(delay(3e9), 2147483647);
});

test("typed badges stay pending until their duration completes; plain has no badge", () => {
  assert.equal(logBadge("plain", false), "");
  assert.equal(logBadge("plain", true), "");
  assert.equal(logBadge("ok", false), "[ .... ]");
  assert.equal(logBadge("ok", true), "[  OK  ]");
  assert.equal(logBadge("skip", false), "[ .... ]");
  assert.equal(logBadge("skip", true), "[ SKIP ]");
});
