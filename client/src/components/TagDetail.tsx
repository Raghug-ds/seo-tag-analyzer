import { ChevronDown, Check, AlertTriangle, AlertCircle, X, Info, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import { Tag } from "../types/seo";
import { getStatusColor, getStatusBadgeClass } from "../types/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { copyToClipboard } from "../lib/seoUtils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TagDetailProps {
  tag: Tag;
  isExpanded: boolean;
  onToggle: () => void;
}

const TagDetail = ({ tag, isExpanded, onToggle }: TagDetailProps) => {
  const [copied, setCopied] = useState(false);
  const statusColor = getStatusColor(tag.status);
  const statusBadgeClass = getStatusBadgeClass(tag.status);
  
  // Determine the border color based on status
  const getBorderColor = () => {
    switch (tag.status) {
      case "success": return "border-l-green-500";
      case "warning": return "border-l-amber-500";
      case "error": return "border-l-red-500";
      default: return "border-l-slate-300";
    }
  };
  
  // Determine status icon
  const StatusIcon = () => {
    switch (tag.status) {
      case "success": 
        return <Check className="h-4 w-4 text-green-500" aria-hidden="true" />;
      case "warning": 
        return <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />;
      case "error": 
        return <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />;
      default: 
        return <Info className="h-4 w-4 text-slate-500" aria-hidden="true" />;
    }
  };
  
  const handleCopy = async () => {
    if (tag.value) {
      const success = await copyToClipboard(tag.value);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <Card 
      className={cn(
        "shadow-sm overflow-hidden mb-4 border-l-4 transition-all", 
        getBorderColor(),
        isExpanded ? "bg-white" : "bg-white/70 hover:bg-white"
      )}
    >
      <div 
        className={cn(
          "p-4 flex items-start justify-between cursor-pointer",
          isExpanded ? "border-b border-slate-100" : ""
        )}
        onClick={onToggle}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5 mr-3">
            <StatusIcon />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-slate-900">{tag.name}</h3>
              <Badge 
                variant={tag.status === "success" ? "outline" : "secondary"} 
                className={cn(
                  "ml-2 text-xs font-normal",
                  tag.status === "success" ? "bg-green-50 text-green-700 hover:bg-green-50" : 
                  tag.status === "warning" ? "bg-amber-50 text-amber-700 hover:bg-amber-50" : 
                  "bg-red-50 text-red-700 hover:bg-red-50"
                )}
              >
                {tag.statusText}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{tag.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <ChevronDown 
            className={cn(
              "h-5 w-5 text-slate-400 transition-transform", 
              isExpanded ? "transform rotate-180" : ""
            )} 
          />
        </div>
      </div>
      
      {isExpanded && (
        <CardContent className="p-4 pt-4 bg-slate-50/50">
          {tag.value ? (
            <div className="group relative">
              <div className="bg-slate-100 p-3 rounded-md mb-3 font-mono text-sm overflow-x-auto max-h-[120px]">
                <pre className="text-slate-800 whitespace-pre-wrap break-all">{tag.value}</pre>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy();
                        }}
                      >
                        {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 p-3 rounded-md mb-3 flex items-center justify-center text-slate-500">
              <X className="h-5 w-5 mr-2" />
              <span className="text-sm">No {tag.name.toLowerCase()} found</span>
            </div>
          )}
          
          <div className="space-y-3">
            {tag.info && (
              <div className="flex items-start p-3 rounded-md bg-white border border-slate-200">
                <div className="flex-shrink-0 mr-2 mt-0.5">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-slate-700">{tag.info}</p>
              </div>
            )}
            
            {tag.recommendation && (
              <div className="p-3 rounded-md bg-white border border-slate-200">
                <p className="text-sm font-medium text-slate-900 mb-1">Recommendation:</p>
                <p className="text-sm text-slate-700">{tag.recommendation}</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default TagDetail;
