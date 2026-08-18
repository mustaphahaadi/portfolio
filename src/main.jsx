import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/tailwind.css";
import "./assets/css/terminal.css";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Never retry on 4xx — avoids spamming console when a Supabase table
      // doesn't exist yet (e.g. blog_posts 404 before migration is run).
      // Still retries on network errors and 5xx by returning true for those.
      retry: (failureCount, error) => {
        const status = error?.status ?? error?.code;
        if (status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      // Cache data for 5 minutes — reduces duplicate requests across routes
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
