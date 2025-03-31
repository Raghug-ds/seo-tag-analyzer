import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, BarChart3, ArrowRight, CircleCheck, Layout, Layers } from "lucide-react";
import { isValidUrl, prepareUrlForApi } from "@/lib/seoUtils";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "In-Depth Meta Tag Analysis",
    description: "Thoroughly scans and validates all essential SEO meta tags on your website",
    icon: <Layers className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Visual Search Previews",
    description: "See how your site appears in Google search results and social media platforms",
    icon: <Layout className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Actionable Recommendations",
    description: "Get specific suggestions to improve your website's SEO performance",
    icon: <AlertCircle className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Comprehensive Reports",
    description: "Detailed visualization and analytics of your website's SEO health",
    icon: <BarChart3 className="h-10 w-10 text-indigo-500" />
  }
];

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();
  
  const handleSubmit = (e: React.FormEvent) => {
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
    navigate(`/analyze?url=${encodeURIComponent(processedUrl)}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-50 to-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-slate-900">SEO Meta Tag</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mt-1">
                Analyzer
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
              Analyze your website's SEO meta tags for better search engine visibility and social media presence.
            </p>
            
            <div className="mt-10 max-w-xl mx-auto">
              <form 
                onSubmit={handleSubmit} 
                className="sm:flex sm:gap-4"
              >
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter website URL (e.g., example.com)"
                    className={cn(
                      "pl-10 pr-4 py-3 text-base rounded-lg shadow-sm",
                      "border border-slate-300 focus-visible:ring-2 focus-visible:ring-indigo-500",
                      "h-12 sm:h-14",
                      error ? "border-red-500" : ""
                    )}
                  />
                  
                  {error && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="mt-3 sm:mt-0 w-full sm:w-auto h-12 sm:h-14 text-base px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <span>Analyze</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              
              {error && (
                <p className="mt-2 text-red-600 text-sm flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive SEO Analysis
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Get detailed insights into your website's SEO elements with our powerful tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative p-6 bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md hover:border-slate-200"
              >
                <div className="h-16 mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center p-1 px-2 sm:px-3 bg-slate-50 rounded-full text-sm text-slate-800">
              <CircleCheck className="h-4 w-4 text-indigo-500 mr-1" />
              <span>No sign-up required • Instant results • Free to use</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-50 mt-auto">
        <div className="container mx-auto px-4 py-8 md:py-12 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} SEO Meta Tag Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}