/**
 * Validates a URL string
 */
export function isValidUrl(url: string): boolean {
  // Basic validation
  if (!url || url.length < 3 || !url.includes(".")) {
    return false;
  }
  
  try {
    // Add protocol if missing
    const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
    new URL(urlWithProtocol);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Formats a URL for display (removes protocol, trailing slash)
 */
export function formatUrlForDisplay(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

/**
 * Prepares a URL for API requests (ensures it has a protocol)
 */
export function prepareUrlForApi(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Formats a timestamp into human-readable format
 */
export function formatTimestamp(timestamp: string): string {
  return timestamp;
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

/**
 * Creates a shareable URL for analysis results
 */
export function createShareableLink(url: string): string {
  const baseUrl = window.location.origin;
  const encodedUrl = encodeURIComponent(url);
  return `${baseUrl}?url=${encodedUrl}`;
}

/**
 * Exports analysis results as JSON
 */
export function exportAsJson(data: any, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}
