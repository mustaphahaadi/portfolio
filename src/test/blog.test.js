import { describe, it, expect } from "vitest";
import { getBlogPosts, getBlogPost } from "../services/api";

describe("Blog API Suite", () => {
  it("getBlogPosts returns an object structure", async () => {
    const res = await getBlogPosts();
    expect(res).toBeDefined();
    expect(res).toHaveProperty("data");
  });

  it("getBlogPost with a slug returns an object structure", async () => {
    const res = await getBlogPost("terraform-aws-eks-zero-to-production");
    expect(res).toBeDefined();
    expect(res).toHaveProperty("data");
  });
});
