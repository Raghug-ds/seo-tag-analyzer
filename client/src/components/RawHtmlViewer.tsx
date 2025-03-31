import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clipboard, Check, Code, Eye } from "lucide-react";
import { copyToClipboard } from "../lib/seoUtils";

interface RawHtmlViewerProps {
  rawHtml: string;
}

const RawHtmlViewer = ({ rawHtml }: RawHtmlViewerProps) => {
  const [activeTab, setActiveTab] = useState<string>("raw");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(rawHtml);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatHtml = (html: string) => {
    // Simple formatter to highlight tags for better readability
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(&lt;\/?)([^\s&]+)([^&]*?)(\/?&gt;)/g, "$1<span class='text-blue-500'>$2</span>$3$4")
      .replace(/(="[^"]*")/g, "<span class='text-green-500'>$1</span>");
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-slate-50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Raw HTML Source</CardTitle>
          <CardDescription>
            View and analyze the raw HTML head tags
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="mx-4 mb-0 bg-transparent">
              <TabsTrigger
                value="raw"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none gap-2"
              >
                <Code className="h-4 w-4" />
                <span>Raw HTML</span>
              </TabsTrigger>
              <TabsTrigger
                value="formatted"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none gap-2"
              >
                <Eye className="h-4 w-4" />
                <span>Formatted</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="raw" className="m-0">
            <pre className="bg-slate-50 p-4 text-sm overflow-auto max-h-[400px] whitespace-pre-wrap break-all">{rawHtml}</pre>
          </TabsContent>

          <TabsContent value="formatted" className="m-0">
            <div 
              className="bg-slate-50 p-4 text-sm overflow-auto max-h-[400px] font-mono"
              dangerouslySetInnerHTML={{ __html: formatHtml(rawHtml) }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RawHtmlViewer;