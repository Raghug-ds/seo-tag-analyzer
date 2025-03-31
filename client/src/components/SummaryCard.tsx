import { AlertCircle, AlertTriangle, Share2, Download, ExternalLink, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Issue } from "../types/seo";
import { getScoreBadge, getIssueIcon } from "../types/seo";
import { formatUrlForDisplay } from "../lib/seoUtils";
import ScoreGauge from "./ScoreGauge";
import { cn } from "@/lib/utils";
import React from "react";

interface SummaryCardProps {
  url: string;
  overallScore: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  lastUpdated: string;
  issues: Issue[];
  onShareResults: () => void;
  onExportResults: () => void;
}

const SummaryCard = ({
  url,
  overallScore,
  validCount,
  warningCount,
  errorCount,
  lastUpdated,
  issues,
  onShareResults,
  onExportResults,
}: SummaryCardProps) => {
  const scoreBadge = getScoreBadge(overallScore);
  const displayUrl = formatUrlForDisplay(url);
  const totalTags = validCount + warningCount + errorCount;
  
  // Prevent divide by zero
  const getPercentage = (count: number) => {
    if (totalTags === 0) return 0;
    return Math.round((count / totalTags) * 100);
  };
  
  return (
    <Card className="border-none shadow-md sm:shadow-lg overflow-hidden mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 px-4 sm:px-6 py-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Analysis Results
            </CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-sm text-slate-600 mr-1 truncate max-w-[200px] sm:max-w-none">
                {displayUrl}
              </span>
              <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 transition-colors" />
              </a>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onShareResults}
              className="inline-flex items-center bg-white/80 hover:bg-white transition-colors px-2 sm:px-3 h-8 flex-1 sm:flex-none"
            >
              <Share2 className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExportResults}
              className="inline-flex items-center bg-white/80 hover:bg-white transition-colors px-2 sm:px-3 h-8 flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ScoreGauge score={overallScore} size="sm" className="mr-3" />
              <div>
                <h3 className="text-xs font-medium text-slate-500">SEO Score</h3>
                <Badge className={cn("mt-1", scoreBadge.color)}>{scoreBadge.text}</Badge>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-xs font-medium text-slate-500">Meta Tags</h3>
              <p className="text-xl font-bold">{totalTags}</p>
            </div>
          </div>
          
          {/* Mobile Meta Tag Distribution */}
          <div className="space-y-2 mb-4 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="font-semibold text-slate-800">{validCount}</div>
                <div className="text-green-600">Valid</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">{warningCount}</div>
                <div className="text-amber-600">Warnings</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">{errorCount}</div>
                <div className="text-red-600">Errors</div>
              </div>
            </div>
            
            {/* Stacked bar distribution */}
            <div className="w-full h-2 rounded-full overflow-hidden flex">
              <div 
                className="bg-green-500 h-full"
                style={{width: `${getPercentage(validCount)}%`}}
              ></div>
              <div 
                className="bg-amber-500 h-full"
                style={{width: `${getPercentage(warningCount)}%`}}
              ></div>
              <div 
                className="bg-red-500 h-full"
                style={{width: `${getPercentage(errorCount)}%`}}
              ></div>
            </div>
          </div>
          
          {/* Mobile Issues */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 mb-2">
            <h3 className="text-xs font-medium text-slate-500 mb-2">
              Key Issues {issues.length === 0 && <span className="text-green-500 font-medium">(None found!)</span>}
            </h3>
            {issues.length > 0 ? (
              <div className="space-y-2">
                {issues.slice(0, 2).map((issue, index) => (
                  <div key={index} className="flex items-start p-2 rounded-lg bg-slate-50">
                    <div className="flex-shrink-0 mr-2 mt-0.5">
                      {issue.type === "error" ? (
                        <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-700">{issue.message}</p>
                  </div>
                ))}
                {issues.length > 2 && (
                  <p className="text-xs text-slate-600 flex items-center justify-end">
                    <span className="mr-1">View all {issues.length} issues</span>
                    <ChevronRight className="h-3 w-3" />
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center p-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 opacity-90" />
                <p className="text-slate-500 text-xs">All meta tags are correctly implemented</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Score Section */}
            <div className="md:col-span-3 flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-medium text-slate-500 mb-3">SEO Score</h3>
              <ScoreGauge score={overallScore} size="lg" />
              <Badge className={`mt-3 ${scoreBadge.color}`}>{scoreBadge.text}</Badge>
            </div>
            
            {/* Meta Tags Distribution */}
            <div className="md:col-span-5 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Meta Tags Found</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-slate-800">{totalTags}</div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                    <span className="text-sm text-slate-600">{validCount} Valid</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></div>
                    <span className="text-sm text-slate-600">{warningCount} Warnings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                    <span className="text-sm text-slate-600">{errorCount} Errors</span>
                  </div>
                </div>
              </div>
              
              {/* Distribution Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Valid</span>
                    <span>{getPercentage(validCount)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{width: `${getPercentage(validCount)}%`}}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Warnings</span>
                    <span>{getPercentage(warningCount)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full"
                      style={{width: `${getPercentage(warningCount)}%`}}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Errors</span>
                    <span>{getPercentage(errorCount)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{width: `${getPercentage(errorCount)}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Issues List */}
            <div className="md:col-span-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-medium text-slate-500 mb-3">
                Key Issues {issues.length === 0 && <span className="text-green-500 font-medium">(None found!)</span>}
              </h3>
              {issues.length > 0 ? (
                <div className="space-y-3">
                  {issues.slice(0, 3).map((issue, index) => (
                    <div key={index} className="flex items-start p-2 rounded-lg bg-slate-50">
                      <div className="flex-shrink-0 mr-2 mt-0.5">
                        {issue.type === "error" ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-700">{issue.message}</p>
                    </div>
                  ))}
                  {issues.length > 3 && (
                    <p className="text-xs text-slate-500 italic pl-2">{issues.length - 3} more issues found</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[150px] text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2 opacity-90" />
                  <p className="text-slate-500 text-sm">All meta tags are correctly implemented</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-slate-50 py-3 px-4 sm:px-6 border-t border-slate-100 text-center sm:text-left">
        <p className="text-xs text-slate-500">Last analyzed: {lastUpdated}</p>
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
