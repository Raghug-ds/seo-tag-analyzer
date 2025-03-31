import { useState } from "react";
import TagDetail from "./TagDetail";
import { Tag } from "../types/seo";

interface MetaTagsListProps {
  tags: Tag[];
}

const MetaTagsList = ({ tags }: MetaTagsListProps) => {
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
  
  const toggleTag = (tagId: string) => {
    const newExpandedTags = new Set(expandedTags);
    
    if (newExpandedTags.has(tagId)) {
      newExpandedTags.delete(tagId);
    } else {
      newExpandedTags.add(tagId);
    }
    
    setExpandedTags(newExpandedTags);
  };
  
  if (tags.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No tags found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <TagDetail
          key={tag.id}
          tag={tag}
          isExpanded={expandedTags.has(tag.id)}
          onToggle={() => toggleTag(tag.id)}
        />
      ))}
    </div>
  );
};

export default MetaTagsList;
