import { TabType } from "../types/seo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LayoutGrid, FileText, Share2, FolderCog } from "lucide-react";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    all: number;
    essential: number;
    social: number;
    other: number;
  };
}

const TabNavigation = ({ activeTab, onTabChange, counts }: TabNavigationProps) => {
  // Get tab icon based on tab ID
  const getTabIcon = (tabId: string) => {
    switch(tabId) {
      case 'all': return <LayoutGrid className="h-4 w-4 mr-2" />;
      case 'essential': return <FileText className="h-4 w-4 mr-2" />;
      case 'social': return <Share2 className="h-4 w-4 mr-2" />;
      case 'other': return <FolderCog className="h-4 w-4 mr-2" />;
      default: return null;
    }
  };
  
  return (
    <Card className="shadow-md border-none mb-8">
      <CardContent className="p-1">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TabType)} className="w-full">
          <TabsList className="w-full bg-slate-50 p-1 grid grid-cols-4 h-auto">
            <TabButton
              id="all"
              label="All Tags"
              count={counts.all}
              isActive={activeTab === "all"}
              onClick={() => onTabChange("all")}
              icon={getTabIcon("all")}
            />
            <TabButton
              id="essential"
              label="Essential"
              count={counts.essential}
              isActive={activeTab === "essential"}
              onClick={() => onTabChange("essential")}
              icon={getTabIcon("essential")}
            />
            <TabButton
              id="social"
              label="Social"
              count={counts.social}
              isActive={activeTab === "social"}
              onClick={() => onTabChange("social")}
              icon={getTabIcon("social")}
            />
            <TabButton
              id="other"
              label="Other"
              count={counts.other}
              isActive={activeTab === "other"}
              onClick={() => onTabChange("other")}
              icon={getTabIcon("other")}
            />
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface TabButtonProps {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const TabButton = ({ id, label, count, isActive, onClick, icon }: TabButtonProps) => {  
  return (
    <TabsTrigger 
      value={id} 
      className={cn(
        "flex items-center justify-center px-3 py-2.5 data-[state=active]:text-primary data-[state=active]:shadow-sm", 
        "transition-all duration-200 ease-in-out",
        "text-sm font-medium"
      )}
    >
      {icon}
      <span className="flex flex-col sm:flex-row sm:items-center">
        <span>{label}</span>
        <span className={cn(
          "ml-1.5 text-xs font-normal rounded-full px-1.5 py-0.5",
          isActive ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-600"
        )}>
          {count}
        </span>
      </span>
    </TabsTrigger>
  );
};

export default TabNavigation;
