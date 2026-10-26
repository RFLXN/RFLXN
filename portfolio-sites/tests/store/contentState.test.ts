import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { useContentStore } from "../../src/store/contentStore";
import { projects, skills, skillProjects } from "../../src/content/portfolio";
beforeEach(() =>
  useContentStore.setState(useContentStore.getInitialState(), true),
);
test("skill to project problem round trip preserves independent app selections", () => {
  const navigate = useContentStore.getState().navigate;
  navigate({ appId: "skills", item: "redis" });
  navigate({ appId: "projects", item: "bilbil", problem: "chat" });
  assert.equal(useContentStore.getState().projectTab, "problems");
  assert.equal(useContentStore.getState().problem, "chat");
  navigate({ appId: "skills" });
  assert.equal(useContentStore.getState().skill, "redis");
  navigate({ appId: "projects" });
  assert.equal(useContentStore.getState().problem, "chat");
  assert.equal(useContentStore.getState().projectTab, "problems");
});
test("project changes reset overview and reject stale problem selections", () => {
  const navigate = useContentStore.getState().navigate;
  navigate({ appId: "projects", item: "bilbil", problem: "duplicates" });
  navigate({ appId: "projects", item: "jisakupc" });
  assert.equal(useContentStore.getState().projectTab, "main");
  assert.equal(useContentStore.getState().problem, "external-api");
  navigate({ appId: "projects", problem: "duplicates" });
  assert.equal(useContentStore.getState().problem, "external-api");
  navigate({ appId: "projects", tab: "stack" });
  navigate({ appId: "preference" });
  navigate({ appId: "experiences", item: "leadership" });
  assert.equal(useContentStore.getState().projectTab, "stack");
});
test("all project skill and problem links resolve in both directions", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((p) => p.id)).size, 5);
  for (const project of projects) {
    assert.ok(project.problems.length);
    assert.equal(
      new Set(project.problems.map((p) => p.id)).size,
      project.problems.length,
    );
    for (const usage of project.stack) {
      assert.ok(skills.some((s) => s.id === usage.skill));
      assert.ok(skillProjects(usage.skill).some((p) => p.id === project.id));
    }
    for (const problem of project.problems)
      for (const id of problem.skills) {
        assert.ok(
          project.stack.some((s) => s.skill === id),
          `${project.id}/${problem.id}: ${id}`,
        );
        useContentStore.getState().navigate({
          appId: "projects",
          item: project.id,
          problem: problem.id,
        });
        assert.equal(useContentStore.getState().problem, problem.id);
      }
  }
});
