import { test } from "node:test";
import assert from "node:assert/strict";
import {
  emptyState,
  fitBounds,
  indicatorWindows,
  reducer,
} from "../../src/store/windowState";
const bounds = { x: 40, y: 50, width: 740, height: 540 };
test("indicator order survives focus and restore; reopened windows go last", () => {
  let state = emptyState;
  for (const appId of ["one", "two", "three"])
    state = reducer(state, { type: "open", appId, bounds });
  state = reducer(state, { type: "focus", appId: "one" });
  state = reducer(state, { type: "minimize", appId: "two" });
  state = reducer(state, { type: "open", appId: "two", bounds });
  assert.deepEqual(
    indicatorWindows(state).map((w) => w.appId),
    ["one", "two", "three"],
  );
  assert.equal(state.windows.at(-1)?.appId, "two");
  state = reducer(state, { type: "close", appId: "one" });
  state = reducer(state, { type: "open", appId: "one", bounds });
  assert.deepEqual(
    indicatorWindows(state).map((w) => w.appId),
    ["two", "three", "one"],
  );
});
test("opening an existing app restores it without duplicating its window", () => {
  let state = reducer(emptyState, { type: "open", appId: "one", bounds });
  state = reducer(state, { type: "minimize", appId: "one" });
  assert.equal(state.activeId, null);
  state = reducer(state, { type: "open", appId: "one", bounds });
  assert.equal(state.windows.length, 1);
  assert.equal(state.windows[0].minimized, false);
  assert.equal(state.activeId, "one");
});
test("focus changes stacking order and closing selects the last visible window", () => {
  let state = reducer(emptyState, { type: "open", appId: "one", bounds });
  state = reducer(state, { type: "open", appId: "two", bounds });
  state = reducer(state, { type: "focus", appId: "one" });
  assert.deepEqual(
    state.windows.map((w) => w.appId),
    ["two", "one"],
  );
  state = reducer(state, { type: "close", appId: "one" });
  assert.equal(state.activeId, "two");
});
test("maximize and restore preserve floating geometry", () => {
  let state = reducer(emptyState, { type: "open", appId: "one", bounds });
  state = reducer(state, { type: "maximize", appId: "one" });
  assert.equal(state.windows[0].maximized, true);
  state = reducer(state, { type: "maximize", appId: "one" });
  assert.equal(state.windows[0].maximized, false);
  assert.deepEqual(state.windows[0].bounds, bounds);
});
test("viewport changes keep the whole window reachable, including small screens", () => {
  assert.deepEqual(fitBounds(bounds, 320, 480), {
    x: 0,
    y: 0,
    width: 320,
    height: 480,
  });
  assert.deepEqual(fitBounds({ ...bounds, x: -80, y: 2000 }, 1000, 800), {
    ...bounds,
    x: 0,
    y: 260,
  });
});
test("unchanged geometry does not trigger another render", () => {
  const state = reducer(emptyState, { type: "open", appId: "one", bounds });
  assert.equal(
    reducer(state, { type: "bounds", appId: "one", bounds: { ...bounds } }),
    state,
  );
});
