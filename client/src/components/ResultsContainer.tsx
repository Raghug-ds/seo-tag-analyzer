import { useState } from "react";
import SummaryCard from "./SummaryCard";
import TabNavigation from "./TabNavigation";
import MetaTagsList from "./MetaTagsList";
import MetaTagsDistribution from "./MetaTagsDistribution";
import PreviewSection from "./PreviewSection";
import RecommendationsSection from "./RecommendationsSection";
import RawHtmlViewer from "./RawHtmlViewer";
import SEOOverview from "./SEOOverview";
import { AnalysisResponse } from "../types/seo";
import { TabType } from "../types/seo";
import { createShareableLink, exportAsJson } from "../lib/seoUtils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, ImageIcon, FileText, BarChart3, Search } from "lucide-react";

interface ResultsContainerProps {
  analysisResult: AnalysisResponse;
  onClear: () => void;
}

const ResultsContainer = ({ analysisResult, onClear }: ResultsContainerProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSection, setActiveSection] = useState("overview");
  const { toast } = useToast();
  
  const essentialTags = analysisResult.tags.filter(tag => tag.category === "essential");
  const socialTags = analysisResult.tags.filter(tag => tag.category === "social");
  const otherTags = analysisResult.tags.filter(tag => tag.category === "other");
  
  const handleShareResults = () => {
    // Create a shareable URL with the current analysis URL as a query parameter
    const shareableUrl = createShareableLink(analysisResult.url);
    
    // Use Web Share API if available, otherwise fallback to clipboard
    if (navigator.share) {
      navigator.share({
        title: "SEO Analysis Results",
        text: `Check out the SEO analysis for ${analysisResult.url}`,
        url: shareableUrl,
      }).catch(err => {
        console.error("Error sharing:", err);
        copyToClipboard(shareableUrl);
      });
    } else {
      copyToClipboard(shareableUrl);
    }
  };
  
  const handleExportResults = () => {
    // Create a JSON export of the analysis results
    const exportData = {
      ...analysisResult,
      exportedAt: new Date().toISOString(),
    };
    
    // Use the utility function to export as JSON
    const domain = analysisResult.url.replace(/^https?:\/\//, "").replace(/[^\w.-]/g, "_");
    const filename = `seo_analysis_${domain}_${new Date().toISOString().split("T")[0]}.json`;
    exportAsJson(exportData, filename);
  };
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link copied",
        description: "The shareable link has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <SummaryCard 
        url={analysisResult.url}
        overallScore={analysisResult.overallScore}
        validCount={analysisResult.validCount}
        warningCount={analysisResult.warningCount}
        errorCount={analysisResult.errorCount}
        lastUpdated={analysisResult.lastUpdated}
        issues={analysisResult.issues}
        onShareResults={handleShareResults}
        onExportResults={handleExportResults}
      />
      
      {/* Desktop SEO Overview - Hidden on desktop as we show it in a tab below */}
      <div className="hidden">{/* Placeholder - SEO Overview is shown in the tabbed interface below */}</div>
      
      {/* Mobile section tabs - only shown on small screens */}
      <div className="md:hidden">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview" className="flex flex-col items-center p-2 h-auto">
              <Search className="h-4 w-4 mb-1" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="meta-tags" className="flex flex-col items-center p-2 h-auto">
              <Database className="h-4 w-4 mb-1" />
              <span className="text-xs">Tags</span>
            </TabsTrigger>
            <TabsTrigger value="previews" className="flex flex-col items-center p-2 h-auto">
              <ImageIcon className="h-4 w-4 mb-1" />
              <span className="text-xs">Previews</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex flex-col items-center p-2 h-auto">
              <BarChart3 className="h-4 w-4 mb-1" />
              <span className="text-xs">Tips</span>
            </TabsTrigger>
            <TabsTrigger value="raw-html" className="flex flex-col items-center p-2 h-auto">
              <FileText className="h-4 w-4 mb-1" />
              <span className="text-xs">HTML</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Desktop always shows all sections, mobile shows only active section */}
      
      {/* SEO Overview - Always visible on desktop, conditionally on mobile */}
      <div className={`${activeSection === 'overview' ? 'block' : 'hidden md:block'}`}>
        <SEOOverview analysisResult={analysisResult} />
      </div>
      
      {/* Meta Tags Section - Always visible on desktop, conditionally on mobile */}
      <div className={`${activeSection === 'meta-tags' ? 'block' : 'hidden md:block'}`}>
        {/* Visualization Section */}
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">Meta Tags Distribution</h2>
          <MetaTagsDistribution tags={analysisResult.tags} />
        </div>
        
        <Separator className="my-6" />
        
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            all: analysisResult.tags.length,
            essential: essentialTags.length,
            social: socialTags.length,
            other: otherTags.length
          }}
        />
        
        <MetaTagsList 
          tags={
            activeTab === "all" ? analysisResult.tags : 
            activeTab === "essential" ? essentialTags :
            activeTab === "social" ? socialTags :
            otherTags
          }
        />
      </div>
      
      {/* Preview Section - Always visible on desktop, conditionally on mobile */}
      {analysisResult.googlePreview && analysisResult.facebookPreview && analysisResult.twitterPreview && (
        <div className={`${activeSection === 'previews' ? 'block' : 'hidden md:block'}`}>
          <PreviewSection 
            googlePreview={analysisResult.googlePreview}
            facebookPreview={analysisResult.facebookPreview}
            twitterPreview={analysisResult.twitterPreview}
          />
        </div>
      )}
      
      {/* Recommendations Section - Always visible on desktop, conditionally on mobile */}
      {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
        <div className={`${activeSection === 'recommendations' ? 'block' : 'hidden md:block'}`}>
          <RecommendationsSection recommendations={analysisResult.recommendations} />
        </div>
      )}
      
      {/* Raw HTML Viewer - Always visible on desktop, conditionally on mobile */}
      {analysisResult.rawHtml && (
        <div className={`${activeSection === 'raw-html' ? 'block' : 'hidden md:block'}`}>
          <RawHtmlViewer rawHtml={analysisResult.rawHtml} />
        </div>
      )}
    </div>
  );
};

export default ResultsContainer;
