
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth";
import ProfilePage from "./pages/profile";
import DashboardPage from "./pages/dashboard";
import ResumeBuilderPage from "./pages/resume-builder";
import ApiKeysPage from "./pages/api-keys";
import JobMatchingPage from "./pages/job-matching";
import MatchingPage from "./pages/matching";
import JobDescriptionsPage from "./pages/job-descriptions.jsx";
import React from "react"; // Add explicit React import

// Create QueryClient outside of the component to avoid recreation on re-renders
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={
        <div className="p-8 m-4 border border-red-500 rounded bg-red-50 text-red-900">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p>There was an error loading the application. Please try refreshing the page.</p>
        </div>
      }>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                <Route path="/api-keys" element={<ApiKeysPage />} />
                <Route path="/job-matching" element={<JobMatchingPage />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/job-descriptions" element={<JobDescriptionsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
