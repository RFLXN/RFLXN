import { test } from "node:test";
import assert from "node:assert/strict";
import { createWindowGesture, gestureBounds } from "../../src/shell/windowGesture";
import { useWindowStore } from "../../src/store/windowStore";
import { emptyState } from "../../src/store/windowState";
import type { Bounds } from "../../src/store/windowState";

const initial = { x: 100, y: 100, width: 400, height: 300 };
function setup() {
  let reads = 0,
    writes = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const commits: Bounds[] = [];
  const style = new Proxy({} as CSSStyleDeclaration, {
    set(target, key, value) {
      writes++;
      Reflect.set(target, key, value);
      return true;
    },
  });
  const element = { style, getAnimations: () => [] } as unknown as HTMLElement;
  let id = 0;
  const gesture = createWindowGesture({
    viewport: () => {
      reads++;
      return { width: 1200, height: 900 };
    },
    commit: (_, bounds) => commits.push(bounds),
    requestFrame: (callback) => {
      frames.set(++id, callback);
      return id;
    },
    cancelFrame: (key) => {
      frames.delete(key);
    },
  });
  const tick = () => {
    const jobs = [...frames.values()];
    frames.clear();
    jobs.forEach((fn) => fn(0));
  };
  return {
    gesture,
    element,
    frames,
    commits,
    tick,
    reads: () => reads,
    writes: () => writes,
  };
}
test("1,000 pointer events coalesce into one compositor update and one final state commit", () => {
  const s = setup();
  s.gesture.begin("demo", "move", s.element, 1, 0, 0, initial);
  const before = s.writes();
  for (let i = 1; i <= 1000; i++) s.gesture.move(1, i / 10, i / 20);
  assert.equal(s.frames.size, 1);
  assert.equal(s.writes(), before);
  assert.equal(s.commits.length, 0);
  s.tick();
  assert.equal(s.writes(), before + 1);
  assert.equal(s.element.style.translate, "100px 50px");
  assert.equal(s.reads(), 1);
  s.gesture.finish();
  assert.deepEqual(s.commits, [{ ...initial, x: 200, y: 150 }]);
  assert.equal(s.element.style.translate, "");
  s.gesture.finish();
  assert.equal(s.commits.length, 1);
});
test("release flushes latest resize even before the scheduled frame", () => {
  const s = setup();
  s.gesture.begin("demo", "se", s.element, 1, 0, 0, initial);
  s.gesture.move(1, 80, 70);
  s.gesture.finish();
  assert.equal(s.frames.size, 0);
  assert.deepEqual(s.commits, [{ ...initial, width: 480, height: 370 }]);
  assert.equal(s.element.style.width, "480px");
});
test("northwest resize keeps opposite edges fixed at minimum size and viewport edges", () => {
  assert.deepEqual(gestureBounds(initial, "nw", 1000, 1000, 1200, 900), {
    x: 200,
    y: 140,
    width: 300,
    height: 260,
  });
  assert.deepEqual(gestureBounds(initial, "nw", -1000, -1000, 1200, 900), {
    x: 0,
    y: 0,
    width: 500,
    height: 400,
  });
});
test("unrelated pointers and disposed pending frames do not commit", () => {
  const s = setup();
  s.gesture.begin("demo", "move", s.element, 1, 0, 0, initial);
  s.gesture.move(2, 500, 500);
  assert.equal(s.frames.size, 0);
  s.gesture.move(1, 20, 20);
  s.gesture.dispose();
  assert.equal(s.frames.size, 0);
  s.tick();
  assert.equal(s.commits.length, 0);
});
test("Zustand notifies once for a gesture and not for unchanged geometry", () => {
  useWindowStore.setState({ desktop: emptyState });
  useWindowStore
    .getState()
    .dispatch({ type: "open", appId: "demo", bounds: initial });
  let updates = 0;
  const unsubscribe = useWindowStore.subscribe(() => updates++);
  useWindowStore
    .getState()
    .dispatch({ type: "bounds", appId: "demo", bounds: { ...initial } });
  assert.equal(updates, 0);
  useWindowStore
    .getState()
    .dispatch({
      type: "bounds",
      appId: "demo",
      bounds: { ...initial, x: 150 },
    });
  assert.equal(updates, 1);
  unsubscribe();
  useWindowStore.setState({ desktop: emptyState });
});
