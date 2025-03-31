import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, RotateCcw } from "lucide-react";
import { isValidUrl, prepareUrlForApi } from "../lib/seoUtils";
import { cn } from "@/lib/utils";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  onClear: () => void;
  initialUrl?: string;
}

const URLInput = ({ onAnalyze, onClear, initialUrl = "" }: URLInputProps) => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [error, setError] = useState<string | null>(null);
  
  // Update local state when initialUrl prop changes
  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    
    let processedUrl = url;
    // Add https:// if no protocol specified
    if (!/^https?:\/\//i.test(url)) {
      processedUrl = `https://${url}`;
    }
    
    if (!isValidUrl(processedUrl)) {
      setError("Please enter a valid URL");
      return;
    }
    
    setError(null);
    onAnalyze(processedUrl);
  };
  
  const handleClear = () => {
    setUrl("");
    setError(null);
    onClear();
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-lg font-semibold mb-4">Enter Website URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                
                <Input 
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "pl-10 pr-4 py-2 h-11 sm:h-12 text-base",
                    "border border-slate-300 focus-visible:ring-2 focus-visible:ring-primary",
                    error ? "border-red-500" : ""
                  )}
                  placeholder="Enter website URL (e.g., example.com)"
                />
                
                {error && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 sm:flex-shrink-0">
                <Button
                  type="submit"
                  className="h-11 sm:h-12 px-4 sm:px-6 flex-grow sm:flex-grow-0"
                >
                  <Search className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Analyze</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="h-11 sm:h-12 px-4"
                  aria-label="Clear results"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="sr-only">Clear Results</span>
                </Button>
              </div>
            </div>
          </div>
          
          {error && (
            <p className="mt-2 text-red-600 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default URLInput;
