import { describe, expect, it } from "vite-plus/test";

import { acpPendingBackgroundRoster } from "./AcpAdapterV2.ts";

describe("acpPendingBackgroundRoster", () => {
  it("names only running tasks that have a detail, in task id order", () => {
    expect(
      acpPendingBackgroundRoster({
        runningTaskIds: new Set(["mon-1", "shell-1", "unnamed"]),
        details: new Map([
          ["mon-1", { kind: "monitor", description: "  Visible session monitor  " }],
          ["shell-1", { kind: "command", description: "Visible shell task" }],
        ]),
      }),
    ).toEqual([
      { taskId: "mon-1", kind: "monitor", description: "Visible session monitor" },
      { taskId: "shell-1", kind: "command", description: "Visible shell task" },
    ]);
  });

  it("omits a blank description", () => {
    expect(
      acpPendingBackgroundRoster({
        runningTaskIds: new Set(["shell-1"]),
        details: new Map([["shell-1", { kind: "command", description: "   " }]]),
      }),
    ).toEqual([{ taskId: "shell-1", kind: "command" }]);
  });
});
