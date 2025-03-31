import axios from "axios";
import * as cheerio from "cheerio";
import { AnalysisResponse, Issue, Recommendation, Preview, Tag } from "@shared/schema";

/**
 * Analyzes a website for SEO meta tags
 */
export async function analyzeWebsite(url: string): Promise<AnalysisResponse> {
  // Fetch the website HTML
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; SEOMetaAnalyzer/1.0; +https://seo-analyzer.example.com)",
    },
    timeout: 15000,
  });

  const html = response.data;
  const $ = cheerio.load(html);
  
  // Extract and analyze meta tags
  const tags: Tag[] = [];
  const issues: Issue[] = [];
  
  // Title tag
  const titleTag = $("title").text();
  if (titleTag) {
    const titleStatus = 
      titleTag.length > 70 ? "warning" : 
      titleTag.length < 20 ? "warning" : "success";
    const titleStatusText = 
      titleStatus === "success" ? "Good" : "Needs Improvement";
    const titleRecommendation = 
      titleTag.length > 70 ? "Title tag is too long. Recommended length is 50-60 characters." : 
      titleTag.length < 20 ? "Title tag may be too short. Recommended length is 50-60 characters." : "";
    
    tags.push({
      id: "title",
      name: "Title Tag",
      value: `<title>${titleTag}</title>`,
      content: titleTag,
      status: titleStatus,
      statusText: titleStatusText,
      category: "essential",
      description: "Primary title that appears in search results",
      recommendation: titleRecommendation,
      info: titleTag.length > 70 ? `Length: ${titleTag.length} characters (Recommended: 50-60 characters)` : undefined
    });
    
    if (titleStatus === "warning") {
      issues.push({
        type: "warning",
        message: titleTag.length > 70 
          ? "Title tag is too long and may be truncated in search results."
          : "Title tag is too short and may not be descriptive enough."
      });
    }
  } else {
    tags.push({
      id: "title",
      name: "Title Tag",
      value: null,
      content: null,
      status: "error",
      statusText: "Missing",
      category: "essential",
      description: "Primary title that appears in search results",
      recommendation: "Add a title tag to your page. This is crucial for SEO."
    });
    
    issues.push({
      type: "error",
      message: "Missing title tag will severely impact SEO performance."
    });
  }
  
  // Meta description
  const metaDescription = $('meta[name="description"]').attr("content");
  if (metaDescription) {
    const descStatus = 
      metaDescription.length > 160 ? "warning" : 
      metaDescription.length < 50 ? "warning" : "success";
    const descStatusText = 
      descStatus === "success" ? "Good" : "Needs Improvement";
    const descRecommendation = 
      metaDescription.length > 160 ? "Meta description is too long. Recommended length is 150-160 characters." : 
      metaDescription.length < 50 ? "Meta description may be too short. Aim for 150-160 characters." : "";
    
    tags.push({
      id: "description",
      name: "Meta Description",
      value: `<meta name="description" content="${metaDescription}">`,
      content: metaDescription,
      status: descStatus,
      statusText: descStatusText,
      category: "essential",
      description: "Brief description that appears in search results",
      recommendation: descRecommendation,
      info: descStatus === "warning" ? `Length: ${metaDescription.length} characters (Recommended: 150-160 characters)` : undefined
    });
    
    if (descStatus === "warning") {
      issues.push({
        type: "warning",
        message: metaDescription.length > 160 
          ? "Meta description is too long and may be truncated in search results."
          : "Meta description is too short and may not be descriptive enough."
      });
    }
  } else {
    tags.push({
      id: "description",
      name: "Meta Description",
      value: null,
      content: null,
      status: "error",
      statusText: "Missing",
      category: "essential",
      description: "Brief description that appears in search results",
      recommendation: "Add a meta description tag with a compelling summary of your page content. Keep it between 150-160 characters and include relevant keywords."
    });
    
    issues.push({
      type: "error",
      message: "Missing meta description may affect click-through rates from search results."
    });
  }
  
  // Canonical URL
  const canonicalUrl = $('link[rel="canonical"]').attr("href");
  if (canonicalUrl) {
    tags.push({
      id: "canonical",
      name: "Canonical URL",
      value: `<link rel="canonical" href="${canonicalUrl}">`,
      content: canonicalUrl,
      status: "success",
      statusText: "Implemented",
      category: "essential",
      description: "Specifies the preferred version of a page"
    });
  } else {
    tags.push({
      id: "canonical",
      name: "Canonical URL",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "essential",
      description: "Specifies the preferred version of a page",
      recommendation: "Add a canonical URL tag to indicate the preferred version of this page, especially if your site has multiple URLs that access the same content."
    });
    
    issues.push({
      type: "warning",
      message: "No canonical URL specified which might lead to duplicate content issues."
    });
  }
  
  // Viewport
  const viewport = $('meta[name="viewport"]').attr("content");
  if (viewport) {
    tags.push({
      id: "viewport",
      name: "Viewport",
      value: `<meta name="viewport" content="${viewport}">`,
      content: viewport,
      status: "success",
      statusText: "Implemented",
      category: "essential",
      description: "Controls how the page is displayed on mobile devices",
      info: "The viewport meta tag is correctly configured for mobile responsiveness, which is important for mobile-first indexing and user experience."
    });
  } else {
    tags.push({
      id: "viewport",
      name: "Viewport",
      value: null,
      content: null,
      status: "error",
      statusText: "Missing",
      category: "essential",
      description: "Controls how the page is displayed on mobile devices",
      recommendation: "Add a viewport meta tag for proper mobile rendering. Recommended value: width=device-width, initial-scale=1.0"
    });
    
    issues.push({
      type: "error",
      message: "Missing viewport meta tag will cause mobile display issues."
    });
  }
  
  // Open Graph tags (Social)
  const ogTitle = $('meta[property="og:title"]').attr("content");
  if (ogTitle) {
    tags.push({
      id: "og:title",
      name: "OG:Title",
      value: `<meta property="og:title" content="${ogTitle}">`,
      content: ogTitle,
      status: "success",
      statusText: "Implemented",
      category: "social",
      description: "Title used when sharing on social media"
    });
  } else {
    tags.push({
      id: "og:title",
      name: "OG:Title",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "social",
      description: "Title used when sharing on social media",
      recommendation: "Add an Open Graph title tag for better social media sharing. This can be the same as your page title."
    });
  }
  
  const ogDescription = $('meta[property="og:description"]').attr("content");
  if (ogDescription) {
    tags.push({
      id: "og:description",
      name: "OG:Description",
      value: `<meta property="og:description" content="${ogDescription}">`,
      content: ogDescription,
      status: "success",
      statusText: "Implemented",
      category: "social",
      description: "Description used when sharing on social media"
    });
  } else {
    tags.push({
      id: "og:description",
      name: "OG:Description",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "social",
      description: "Description used when sharing on social media",
      recommendation: "Add an Open Graph description tag for better social media sharing. This can be the same as your meta description."
    });
  }
  
  const ogImage = $('meta[property="og:image"]').attr("content");
  if (ogImage) {
    tags.push({
      id: "og:image",
      name: "OG:Image",
      value: `<meta property="og:image" content="${ogImage}">`,
      content: ogImage,
      status: "success",
      statusText: "Implemented",
      category: "social",
      description: "Image displayed when sharing on social media"
    });
  } else {
    tags.push({
      id: "og:image",
      name: "OG:Image",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "social",
      description: "Image displayed when sharing on social media",
      recommendation: "Add an Open Graph image tag with dimensions of at least 1200×630 pixels for optimal social media sharing."
    });
    
    issues.push({
      type: "warning",
      message: "Missing OG:Image may result in poor presentation when shared on social media."
    });
  }
  
  // Twitter Card
  const twitterCard = $('meta[name="twitter:card"]').attr("content");
  if (twitterCard) {
    tags.push({
      id: "twitter:card",
      name: "Twitter Card",
      value: `<meta name="twitter:card" content="${twitterCard}">`,
      content: twitterCard,
      status: "success",
      statusText: "Implemented",
      category: "social",
      description: "Controls Twitter card type when shared"
    });
  } else {
    tags.push({
      id: "twitter:card",
      name: "Twitter Card",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "social",
      description: "Controls Twitter card type when shared",
      recommendation: "Add a Twitter card meta tag. Recommended value: summary_large_image"
    });
  }
  
  // Robots
  const robots = $('meta[name="robots"]').attr("content");
  if (robots) {
    let robotsStatus: "success" | "warning" | "error" = "success";
    let robotsStatusText = "Implemented";
    let robotsRecommendation = "";
    
    if (robots.includes("noindex") || robots.includes("nofollow")) {
      robotsStatus = "warning";
      robotsStatusText = "Restrictive";
      robotsRecommendation = "Your robots meta tag is blocking search engines. Only use noindex/nofollow if you intentionally want to restrict search engines.";
      
      issues.push({
        type: "warning",
        message: `Robots meta tag contains restrictive directives: ${robots}`
      });
    }
    
    tags.push({
      id: "robots",
      name: "Robots Meta Tag",
      value: `<meta name="robots" content="${robots}">`,
      content: robots,
      status: robotsStatus,
      statusText: robotsStatusText,
      category: "essential",
      description: "Controls search engine crawling and indexing",
      recommendation: robotsRecommendation
    });
  } else {
    tags.push({
      id: "robots",
      name: "Robots Meta Tag",
      value: null,
      content: null,
      status: "success", // Default is to allow indexing, so not having it is often fine
      statusText: "Default",
      category: "essential",
      description: "Controls search engine crawling and indexing",
      info: "No robots meta tag found. Default behavior allows all search engines to index and follow links."
    });
  }
  
  // Keywords (largely deprecated but still used sometimes)
  const keywords = $('meta[name="keywords"]').attr("content");
  if (keywords) {
    tags.push({
      id: "keywords",
      name: "Meta Keywords",
      value: `<meta name="keywords" content="${keywords}">`,
      content: keywords,
      status: "warning",
      statusText: "Legacy",
      category: "other",
      description: "Keywords related to page content (largely ignored by search engines)",
      info: "Meta keywords are largely ignored by major search engines and provide limited SEO value."
    });
  } else {
    tags.push({
      id: "keywords",
      name: "Meta Keywords",
      value: null,
      content: null,
      status: "success", // Not having it is good
      statusText: "Not Used",
      category: "other",
      description: "Keywords related to page content (largely ignored by search engines)",
      info: "Meta keywords are not used, which is fine as they are largely ignored by modern search engines."
    });
  }
  
  // H1 heading (not a meta tag but important for SEO)
  const h1 = $("h1").first().text().trim();
  if (h1) {
    tags.push({
      id: "h1",
      name: "H1 Heading",
      value: `<h1>${h1}</h1>`,
      content: h1,
      status: "success",
      statusText: "Implemented",
      category: "other",
      description: "Primary heading on the page (important for SEO)"
    });
  } else {
    tags.push({
      id: "h1",
      name: "H1 Heading",
      value: null,
      content: null,
      status: "error",
      statusText: "Missing",
      category: "other",
      description: "Primary heading on the page (important for SEO)",
      recommendation: "Add an H1 heading tag that clearly describes the page content."
    });
    
    issues.push({
      type: "error",
      message: "Missing H1 heading may negatively impact SEO and content hierarchy."
    });
  }
  
  // Language
  const htmlLang = $("html").attr("lang");
  if (htmlLang) {
    tags.push({
      id: "html-lang",
      name: "HTML Language",
      value: `<html lang="${htmlLang}">`,
      content: htmlLang,
      status: "success",
      statusText: "Implemented",
      category: "other",
      description: "Specifies the language of the document"
    });
  } else {
    tags.push({
      id: "html-lang",
      name: "HTML Language",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "other",
      description: "Specifies the language of the document",
      recommendation: "Add a lang attribute to the HTML tag to specify the content language."
    });
    
    issues.push({
      type: "warning",
      message: "Missing HTML language attribute may affect accessibility and search engine understanding."
    });
  }
  
  // Charset
  const charset = $('meta[charset]').attr("charset") || $('meta[http-equiv="Content-Type"]').attr("content");
  if (charset) {
    tags.push({
      id: "charset",
      name: "Character Set",
      value: charset.includes("charset") 
        ? `<meta http-equiv="Content-Type" content="${charset}">`
        : `<meta charset="${charset}">`,
      content: charset,
      status: "success",
      statusText: "Implemented",
      category: "other",
      description: "Defines the character encoding for the document"
    });
  } else {
    tags.push({
      id: "charset",
      name: "Character Set",
      value: null,
      content: null,
      status: "warning",
      statusText: "Missing",
      category: "other",
      description: "Defines the character encoding for the document",
      recommendation: "Add a charset meta tag. Recommended value: UTF-8"
    });
    
    issues.push({
      type: "warning",
      message: "Missing character set declaration may cause character rendering issues."
    });
  }
  
  // Calculate statistics
  const validCount = tags.filter(tag => tag.status === "success").length;
  const warningCount = tags.filter(tag => tag.status === "warning").length;
  const errorCount = tags.filter(tag => tag.status === "error").length;
  
  // Calculate overall score (simple algorithm: 100 - (warnings*5 + errors*15))
  let overallScore = 100 - (warningCount * 5 + errorCount * 15);
  // Clamp score between 0-100
  overallScore = Math.max(0, Math.min(100, overallScore));
  
  // Format current date
  const now = new Date();
  const lastUpdated = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  
  // Generate preview data
  const googlePreview = {
    title: titleTag || null,
    description: metaDescription || null,
    url: url,
    image: null,
  };
  
  const facebookPreview = {
    title: ogTitle || titleTag || null,
    description: ogDescription || metaDescription || null,
    url: url,
    image: ogImage || null,
  };
  
  const twitterPreview = {
    title: $('meta[name="twitter:title"]').attr("content") || ogTitle || titleTag || null,
    description: $('meta[name="twitter:description"]').attr("content") || ogDescription || metaDescription || null,
    url: url,
    image: $('meta[name="twitter:image"]').attr("content") || ogImage || null,
  };
  
  // Generate recommendations based on analysis
  const recommendations: Recommendation[] = [];
  
  // Check for missing or problematic title
  if (!titleTag) {
    recommendations.push({
      id: "title-missing",
      title: "Add a Title Tag",
      description: "Every page should have a unique, descriptive title tag that accurately represents the page content.",
      impact: "high",
      category: "technical",
    });
  } else if (titleTag.length < 20 || titleTag.length > 70) {
    recommendations.push({
      id: "title-length",
      title: "Optimize Title Tag Length",
      description: "Keep title tags between 50-60 characters to ensure they display properly in search results.",
      impact: "medium",
      category: "content",
    });
  }
  
  // Check for missing or problematic meta description
  if (!metaDescription) {
    recommendations.push({
      id: "meta-desc-missing",
      title: "Add a Meta Description",
      description: "Include a compelling meta description that summarizes page content and includes relevant keywords.",
      impact: "medium",
      category: "content",
    });
  } else if (metaDescription.length < 50 || metaDescription.length > 160) {
    recommendations.push({
      id: "meta-desc-length",
      title: "Optimize Meta Description Length",
      description: "Keep meta descriptions between 150-160 characters to prevent truncation in search results.",
      impact: "medium",
      category: "content",
    });
  }
  
  // Check for social media tags
  if (!ogTitle || !ogDescription || !ogImage) {
    recommendations.push({
      id: "social-tags",
      title: "Add Open Graph Tags",
      description: "Implement Open Graph tags to control how your content appears when shared on social media platforms.",
      impact: "medium",
      category: "social",
    });
  }
  
  // Check for missing H1
  if (!h1) {
    recommendations.push({
      id: "h1-missing",
      title: "Add an H1 Heading",
      description: "Include a single H1 heading that clearly describes the page topic and includes relevant keywords.",
      impact: "medium",
      category: "content",
    });
  }
  
  // Check for mobile optimization
  if (!viewport) {
    recommendations.push({
      id: "viewport-missing",
      title: "Add Viewport Meta Tag",
      description: "Include a viewport meta tag to ensure proper rendering on mobile devices and improved mobile rankings.",
      impact: "high",
      category: "technical",
    });
  }
  
  // Check for canonical URL
  if (!canonicalUrl) {
    recommendations.push({
      id: "canonical-missing",
      title: "Add Canonical URL",
      description: "Implement a canonical URL tag to prevent duplicate content issues and consolidate ranking signals.",
      impact: "medium",
      category: "technical",
    });
  }
  
  // Check for language attribute
  if (!htmlLang) {
    recommendations.push({
      id: "lang-missing",
      title: "Add HTML Language Attribute",
      description: "Specify the language of your content using the lang attribute on the HTML tag for better accessibility and international SEO.",
      impact: "low",
      category: "technical",
    });
  }
  
  // Extract a sanitized version of raw HTML to limit size
  // This includes only the head section which contains meta tags
  const headContent = $.html($('head'));
  const rawHtml = headContent.length > 50000 ? headContent.substring(0, 50000) + '... (truncated)' : headContent;
  
  return {
    url,
    overallScore,
    validCount,
    warningCount,
    errorCount,
    tags,
    issues,
    recommendations,
    googlePreview,
    facebookPreview,
    twitterPreview,
    rawHtml,
    lastUpdated,
  };
}
