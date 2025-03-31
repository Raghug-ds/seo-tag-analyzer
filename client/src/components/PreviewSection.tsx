import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Preview } from "../types/seo";
import { Search, Facebook, Twitter } from "lucide-react";

interface PreviewSectionProps {
  googlePreview: Preview;
  facebookPreview: Preview;
  twitterPreview: Preview;
}

const PreviewSection = ({ googlePreview, facebookPreview, twitterPreview }: PreviewSectionProps) => {
  const [activeTab, setActiveTab] = useState<string>("google");

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-xl">Preview Your Content</CardTitle>
        <CardDescription>
          See how your content appears in search results and social media platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          defaultValue="google"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="google" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Google</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="google" className="mt-0">
            <GooglePreview preview={googlePreview} />
          </TabsContent>
          
          <TabsContent value="facebook" className="mt-0">
            <FacebookPreview preview={facebookPreview} />
          </TabsContent>
          
          <TabsContent value="twitter" className="mt-0">
            <TwitterPreview preview={twitterPreview} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const GooglePreview = ({ preview }: { preview: Preview }) => {
  const displayUrl = preview.url?.replace(/^https?:\/\//i, "") || "";
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex flex-col gap-1 max-w-[600px]">
        <div className="text-sm text-green-800">{displayUrl}</div>
        <div className="text-blue-800 text-xl font-medium line-clamp-1">
          {preview.title || "No title available"}
        </div>
        <div className="text-gray-600 text-sm line-clamp-2 mt-1">
          {preview.description || "No description available"}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Google search results typically show the first 50-60 characters of your title and 150-160 characters of your description.
      </div>
    </div>
  );
};

const FacebookPreview = ({ preview }: { preview: Preview }) => {
  return (
    <div className="border rounded-md overflow-hidden max-w-[500px]">
      {preview.image ? (
        <div className="h-[260px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img 
            src={preview.image} 
            alt="OG image" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='500' height='260' viewBox='0 0 500 260'%3e%3crect fill='%23f0f0f0' width='500' height='260'/%3e%3ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3eImage not available%3c/text%3e%3c/svg%3e";
            }}
          />
        </div>
      ) : (
        <div className="h-[260px] bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 font-medium">No image available</span>
        </div>
      )}
      
      <div className="p-3 bg-white border-t">
        <div className="text-xs uppercase text-gray-500 mb-1">{new URL(preview.url || "https://example.com").hostname}</div>
        <div className="font-bold line-clamp-2 text-gray-900">
          {preview.title || "No title available"}
        </div>
        <div className="text-sm text-gray-500 mt-1 line-clamp-3">
          {preview.description || "No description available"}
        </div>
      </div>
      
      <div className="px-3 py-2 text-xs text-gray-400 bg-gray-50">
        Facebook recommends images of at least 1200×630 pixels with a ratio of 1.91:1
      </div>
    </div>
  );
};

const TwitterPreview = ({ preview }: { preview: Preview }) => {
  return (
    <div className="border rounded-md overflow-hidden max-w-[500px]">
      {preview.image ? (
        <div className="h-[260px] bg-gray-100 overflow-hidden">
          <img 
            src={preview.image} 
            alt="Twitter image" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='500' height='260' viewBox='0 0 500 260'%3e%3crect fill='%23f0f0f0' width='500' height='260'/%3e%3ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3eImage not available%3c/text%3e%3c/svg%3e";
            }}
          />
        </div>
      ) : (
        <div className="h-[260px] bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 font-medium">No image available</span>
        </div>
      )}
      
      <div className="p-3 bg-white">
        <div className="font-bold line-clamp-1 text-gray-900">
          {preview.title || "No title available"}
        </div>
        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
          {preview.description || "No description available"}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {new URL(preview.url || "https://example.com").hostname}
        </div>
      </div>
      
      <div className="px-3 py-2 text-xs text-gray-400 bg-gray-50">
        Twitter supports several card types, with 'summary_large_image' being the most common
      </div>
    </div>
  );
};

export default PreviewSection;