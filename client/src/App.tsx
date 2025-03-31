import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import SEOAnalyzer from "@/components/SEOAnalyzer";
import LandingPage from "@/pages/landing";
import { useEffect } from "react";
import { isValidUrl } from "./lib/seoUtils";

function Router() {
  const [location, setLocation] = useLocation();
  
  // Handle URL parameter on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get("url");
    
    // If there's a URL parameter and we're at the root, keep it there
    // The SEOAnalyzer component will handle processing this URL
    if (urlParam && location === "/") {
      // Optional: validate URL before allowing it to be processed
      if (isValidUrl(urlParam)) {
        // The URL is already in the query params, so we don't need to redirect
        // SEOAnalyzer will pick it up from there
      } else {
        // Remove invalid URL from query params
        setLocation("/");
      }
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/">
        {() => {
          const urlParams = new URLSearchParams(window.location.search);
          const urlParam = urlParams.get("url");
          
          return urlParam ? <SEOAnalyzer /> : <LandingPage />;
        }}
      </Route>
      <Route path="/analyze" component={SEOAnalyzer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
