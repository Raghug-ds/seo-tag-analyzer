import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  Search,
  Share2,
  Globe,
  ScrollText
} from "lucide-react";
import { AnalysisResponse } from "../types/seo";
import { getScoreBadge } from "../types/seo";
import { cn } from "@/lib/utils";

interface SEOOverviewProps {
  analysisResult: AnalysisResponse;
}

const SEOOverview: React.FC<SEOOverviewProps> = ({ analysisResult }) => {
  const { 
    overallScore, 
    validCount, 
    warningCount, 
    errorCount,
    tags 
  } = analysisResult;
  
  // Get SEO overview data
  const hasTitleTag = tags.some(tag => tag.name === "title");
  const hasDescriptionTag = tags.some(tag => tag.name === "description" || tag.name === "og:description");
  const hasCanonicalTag = tags.some(tag => tag.name === "canonical");
  const hasSocialTags = tags.some(tag => tag.category === "social");
  
  // Get score categories and insights
  const scoreBadge = getScoreBadge(overallScore);
  
  // SEO insights based on score and tag analysis
  const getInsightText = () => {
    if (overallScore >= 90) {
      return "Your SEO implementation is excellent! Continue monitoring and making minor improvements.";
    } else if (overallScore >= 70) {
      return "Your SEO is good, but there are some opportunities to improve your meta tags.";
    } else if (overallScore >= 50) {
      return "Your SEO needs work. Focus on addressing the warning and error issues identified.";
    } else {
      return "Your SEO requires significant improvement. Consider addressing all the errors as soon as possible.";
    }
  };
  
  // Get checklist items with status
  const checklistItems = [
    {
      name: "Title Tag",
      status: hasTitleTag ? "good" : "bad",
      description: "A descriptive page title helps search engines understand your content",
      icon: <ScrollText className="h-4 w-4" />
    },
    {
      name: "Meta Description",
      status: hasDescriptionTag ? "good" : "bad",
      description: "Provides a summary of your page for search results",
      icon: <Info className="h-4 w-4" />
    },
    {
      name: "Canonical URL",
      status: hasCanonicalTag ? "good" : "bad",
      description: "Prevents duplicate content issues by specifying the preferred URL",
      icon: <Globe className="h-4 w-4" />
    },
    {
      name: "Social Media Tags",
      status: hasSocialTags ? "good" : "bad",
      description: "Optimizes how your content appears when shared on social platforms",
      icon: <Share2 className="h-4 w-4" />
    }
  ];
  
  return (
    <Card className="mb-8 overflow-hidden border-none shadow-md">
      <CardHeader className="bg-gradient-to-br from-slate-50 to-slate-100 px-6 pb-2 pt-6 border-b border-slate-200">
        <CardTitle className="text-xl font-bold text-slate-800">
          SEO Overview at a Glance
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          A beginner-friendly summary of your website's SEO implementation
        </p>
      </CardHeader>
      
      <CardContent className="px-0 pb-0">
        {/* Summary Panel */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6">
            <div className="flex-1 flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full mr-4 flex items-center justify-center">
                <span 
                  className={cn(
                    "text-2xl font-bold",
                    overallScore >= 90 ? "text-emerald-600" :
                    overallScore >= 70 ? "text-yellow-600" :
                    overallScore >= 50 ? "text-orange-600" :
                    "text-red-600"
                  )}
                >
                  {overallScore}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">SEO Score</h3>
                <Badge className={scoreBadge.color}>{scoreBadge.text}</Badge>
              </div>
            </div>
            
            <div className="flex-1 flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-full">
                <h3 className="font-medium text-slate-800 mb-1">Meta Tag Health</h3>
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5"></div>
                    <span>{validCount} Valid</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-1.5"></div>
                    <span>{warningCount} Warnings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-1.5"></div>
                    <span>{errorCount} Errors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Insight */}
          <div className="rounded-lg border border-slate-200 p-4 mb-6 bg-gradient-to-r from-indigo-50 to-indigo-100/50">
            <div className="flex">
              <div className="flex-shrink-0">
                <Search className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">SEO Insight</h3>
                <p className="text-sm text-slate-700">
                  {getInsightText()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Key SEO Elements Checklist */}
          <div>
            <h3 className="font-medium text-slate-800 mb-3">Essential SEO Elements</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {checklistItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-3 rounded-lg border border-slate-200 bg-white"
                >
                  <div className="flex-shrink-0 mt-0.5 mr-3">
                    <div className={cn(
                      "p-1.5 rounded-full",
                      item.status === "good" ? "bg-green-100" : "bg-red-100"
                    )}>
                      {item.status === "good" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-slate-800 mr-2">{item.name}</span>
                      {item.icon && <span className="text-slate-400">{item.icon}</span>}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">What to look for next</h3>
              <p className="text-sm text-slate-600 mt-1">
                Review the detailed analysis below to see specific recommendations for improving your website's SEO.
                Pay special attention to any warnings and errors identified.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOOverview;