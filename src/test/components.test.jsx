import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GithubFeed from "../components/GithubFeed";
import Footer from "../components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQuery = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("UI Components Suite", () => {
  it("GithubFeed renders git log command header", () => {
    renderWithQuery(<GithubFeed />);
    expect(screen.getByText(/git log --recent/i)).toBeInTheDocument();
  });

  it("Footer renders copyright and profile info", () => {
    renderWithQuery(<Footer />);
    expect(screen.getByText(/Mustapha Haadi/i)).toBeInTheDocument();
  });
});
