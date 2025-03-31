import { Recommendation } from "../types/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, AlertTriangle, AlertCircle, BarChart3, Code, FileText, Share2 } from "lucide-react";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

const RecommendationsSection = ({ recommendations }: RecommendationsSectionProps) => {
  // Group recommendations by category
  const technicalRecs = recommendations.filter(rec => rec.category === "technical");
  const contentRecs = recommendations.filter(rec => rec.category === "content");
  const socialRecs = recommendations.filter(rec => rec.category === "social");
  const performanceRecs = recommendations.filter(rec => rec.category === "performance");

  if (recommendations.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader className="bg-slate-50">
          <CardTitle className="text-xl">SEO Recommendations</CardTitle>
          <CardDescription>
            Suggested improvements for better search engine optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckSquare className="h-12 w-12 text-green-500 mb-3" />
            <p className="text-gray-600 text-lg text-center">
              Great job! No SEO recommendations needed.
            </p>
            <p className="text-gray-400 text-sm text-center mt-2 max-w-md">
              Your page appears to have implemented all the important SEO best practices we check for.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-xl">SEO Recommendations</CardTitle>
        <CardDescription>
          Suggested improvements for better search engine optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {technicalRecs.length > 0 && (
            <RecommendationGroup
              title="Technical SEO"
              icon={<Code className="h-5 w-5 text-indigo-500" />}
              recommendations={technicalRecs}
            />
          )}
          
          {contentRecs.length > 0 && (
            <RecommendationGroup
              title="Content Optimization"
              icon={<FileText className="h-5 w-5 text-blue-500" />}
              recommendations={contentRecs}
            />
          )}
          
          {socialRecs.length > 0 && (
            <RecommendationGroup
              title="Social Media Optimization"
              icon={<Share2 className="h-5 w-5 text-pink-500" />}
              recommendations={socialRecs}
            />
          )}
          
          {performanceRecs.length > 0 && (
            <RecommendationGroup
              title="Performance Optimization"
              icon={<BarChart3 className="h-5 w-5 text-orange-500" />}
              recommendations={performanceRecs}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface RecommendationGroupProps {
  title: string;
  icon: React.ReactNode;
  recommendations: Recommendation[];
}

const RecommendationGroup = ({ title, icon, recommendations }: RecommendationGroupProps) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-50 p-3 flex items-center gap-2 border-b">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="divide-y">
        {recommendations.map(rec => (
          <RecommendationItem key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

interface RecommendationItemProps {
  recommendation: Recommendation;
}

const RecommendationItem = ({ recommendation }: RecommendationItemProps) => {
  const getImpactIcon = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "low":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getImpactText = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "High Impact";
      case "medium":
        return "Medium Impact";
      case "low":
        return "Low Impact";
    }
  };
  
  const getImpactColor = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-medium flex-grow">{recommendation.title}</h4>
        <Badge variant="outline" className={`flex items-center gap-1 ${getImpactColor(recommendation.impact)}`}>
          {getImpactIcon(recommendation.impact)}
          <span>{getImpactText(recommendation.impact)}</span>
        </Badge>
      </div>
      <p className="text-gray-600 text-sm">{recommendation.description}</p>
    </div>
  );
};

export default RecommendationsSection;