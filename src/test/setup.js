import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Supabase client to ensure Vitest unit tests run fast and offline
vi.mock("../lib/supabase", () => {
  const createChainableMock = (resolvedData = [{ id: "1", title: "Test Post", slug: "test-post", is_published: true }]) => {
    const mock = {
      select: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: resolvedData[0] || { id: "1" }, error: null }),
      single: vi.fn().mockResolvedValue({ data: resolvedData[0] || { id: "1" }, error: null }),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ data: resolvedData, error: null }),
    };
    mock.then = (onFulfilled) => Promise.resolve({ data: resolvedData, error: null }).then(onFulfilled);
    return mock;
  };

  return {
    isSupabaseConfigured: true,
    supabase: {
      from: vi.fn(() => createChainableMock()),
    },
  };
});

