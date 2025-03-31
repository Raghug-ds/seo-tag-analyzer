import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import URLInput from "./URLInput";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import ResultsContainer from "./ResultsContainer";
import { AnalysisResponse } from "../types/seo";
import { isValidUrl } from "../lib/seoUtils";
import { Code, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SEOAnalyzer = () => {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [location] = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Extract URL from query params on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get("url");
    
    if (urlParam && isValidUrl(urlParam)) {
      setUrl(urlParam);
      // Trigger analysis on load if URL param exists
      setIsAnalyzing(true);
    }
  }, []);
  
  const {
    data: analysisResult,
    error,
    isLoading,
    refetch,
    isError,
  } = useQuery<AnalysisResponse>({
    queryKey: [`/api/analyze?url=${encodeURIComponent(url)}`],
    enabled: isAnalyzing && !!url,
    refetchOnWindowFocus: false,
  });
  
  // Reset analyzing state when the query completes
  useEffect(() => {
    if (isAnalyzing && !isLoading) {
      setIsAnalyzing(false);
    }
  }, [isLoading, isAnalyzing]);
  
  const handleAnalyze = (submittedUrl: string) => {
    setUrl(submittedUrl);
    setIsAnalyzing(true);
  };
  
  const handleClear = () => {
    setUrl("");
    setIsAnalyzing(false);
    
    // Update URL in browser to remove query parameter
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with responsive navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Code className="h-7 w-7 text-primary" />
                <h1 className="ml-2 text-xl font-bold text-slate-900 hidden sm:block">SEO Meta Tag Analyzer</h1>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-700">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[350px]">
                  <div className="py-4 flex flex-col space-y-4">
                    <Link href="/" className="text-primary hover:text-primary/80 font-medium flex items-center" onClick={() => setIsNavOpen(false)}>
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                    <a href="#" className="text-slate-700 hover:text-primary font-medium">Documentation</a>
                    <a href="#" className="text-slate-700 hover:text-primary font-medium">About</a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden sm:flex items-center space-x-6">
              <Link href="/" className="text-primary hover:text-primary/80 font-medium flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <a href="#" className="text-slate-700 hover:text-primary font-medium">Documentation</a>
              <a href="#" className="text-slate-700 hover:text-primary font-medium">About</a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* URL Input Form */}
          <URLInput onAnalyze={handleAnalyze} onClear={handleClear} initialUrl={url} />
          
          {/* Loading State */}
          {isLoading && <LoadingState />}
          
          {/* Error State */}
          {isError && (
            <ErrorState 
              title="Unable to analyze website" 
              message={error instanceof Error ? error.message : "An unexpected error occurred."} 
            />
          )}
          
          {/* Results */}
          {!isLoading && !isError && analysisResult && (
            <ResultsContainer 
              analysisResult={analysisResult} 
              onClear={handleClear} 
            />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} SEO Meta Tag Analyzer. All rights reserved.
              </p>
            </div>
            <div className="mt-4 flex justify-center space-x-6 md:mt-0">
              <a href="#" className="text-sm text-slate-600 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-600 hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SEOAnalyzer;
