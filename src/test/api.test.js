import { describe, it, expect, vi } from "vitest";
import { getProfile, getProjects, submitContact } from "../services/api";

describe("API Service Suite", () => {
  it("getProfile returns fallback profile or object when executed", async () => {
    const res = await getProfile();
    expect(res).toBeDefined();
    expect(res).toHaveProperty("data");
  });

  it("getProjects returns an object structure", async () => {
    const res = await getProjects();
    expect(res).toBeDefined();
    expect(res).toHaveProperty("data");
  });

  it("submitContact handles contact submission payload", async () => {
    const payload = {
      name: "Test Recruiter",
      email: "test@example.com",
      message: "Testing portfolio contact form",
    };
    const res = await submitContact(payload);
    expect(res).toBeDefined();
    expect(res).toHaveProperty("data");
  });
});
