import { AnalysisResponse, Issue, Tag, Preview, Recommendation } from "@shared/schema";

export type { AnalysisResponse, Issue, Tag, Preview, Recommendation };

export type TabType = "all" | "essential" | "social" | "other";

export const getStatusColor = (status: Tag["status"]) => {
  switch (status) {
    case "success":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "error":
      return "bg-error";
  }
};

export const getStatusBadgeClass = (status: Tag["status"]) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
  }
};

export const getScoreBadge = (score: number): { text: string; color: string } => {
  if (score >= 90) {
    return { text: "Excellent", color: "bg-green-100 text-green-800" };
  } else if (score >= 70) {
    return { text: "Good", color: "bg-yellow-100 text-yellow-800" };
  } else if (score >= 50) {
    return { text: "Needs Improvement", color: "bg-orange-100 text-orange-800" };
  } else {
    return { text: "Poor", color: "bg-red-100 text-red-800" };
  }
};

export const getIssueIcon = (type: Issue["type"]) => {
  switch (type) {
    case "error":
      return "AlertCircle";
    case "warning":
      return "AlertTriangle";
  }
};
