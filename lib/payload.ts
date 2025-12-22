// For server-side rendering, we need absolute URL
// Use a function instead of constant to ensure it's computed correctly
function getApiUrl(): string {
  // If explicitly set, use it (should already include /api)
  if (process.env.NEXT_PUBLIC_PAYLOAD_URL) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    // Ensure it ends with /api
    return url.endsWith("/api") ? url : `${url}/api`;
  }

  // For server-side, construct absolute URL
  if (typeof window === "undefined") {
    // Server-side: use environment variable or default to localhost
    // In Docker, we might be on the same container, so use localhost
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      "http://localhost:3000";
    // Always append /api
    const apiUrl = `${baseUrl}/api`;
    console.log("Server-side API URL:", apiUrl);
    return apiUrl;
  }

  // Client-side: use relative path
  return "/api";
}

export async function getPayloadClient() {
  return getApiUrl();
}

export async function fetchPayload<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/${cleanEndpoint}`;

  console.log("Fetching from Payload API:", url);
  console.log("API Base URL:", apiUrl);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store", // Disable caching for development - always fetch fresh data
    // next: { revalidate: 60 }, // Revalidate every 60 seconds (for production)
  });

  console.log("Response status:", response.status, response.statusText);

  if (!response.ok) {
    // Don't throw for 404, return null instead
    if (response.status === 404) {
      console.log("404 - Endpoint not found:", url);
      return null as T;
    }
    const errorText = await response.text();
    console.error("API Error response:", errorText);
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.statusText} (${response.status})`
    );
  }

  const jsonData = await response.json();

  return jsonData as T;
}

// Fetch home page data (now a Global)
export async function getHomePage() {
  try {
    const endpoint = "globals/home?depth=3";
    const apiUrl = getApiUrl();
    const url = `${apiUrl}/${endpoint}`;
    console.log("Fetching home page from:", url);
    console.log("API Base URL:", apiUrl);

    const data = await fetchPayload<{
      title: string;
      metaDescription?: string;
      heroSection?: Record<string, unknown>;
      aboutSection?: Record<string, unknown>;
      aboutMentorSection?: Record<string, unknown>;
      guestsSection?: Record<string, unknown>;
      servicesSection?: Record<string, unknown>;
      advantagesSection?: Record<string, unknown>;
      informationCampSection?: Record<string, unknown>;
    } | null>(endpoint);

    if (!data) {
      console.log("No data returned from API (null response)");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching home page:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}
export async function getHeader() {
  try {
    const data = await fetchPayload<{
      menu?: Array<{
        label: string;
        url?: string;
        anchor?: string;
        id?: string;
      }>;
    } | null>("globals/header");

    return data;
  } catch (error) {
    console.error("Error fetching header:", error);
    return null;
  }
}

// Fetch footer data
export async function getFooter() {
  try {
    const data = await fetchPayload<{
      contactInfo: {
        phone?: string;
        email?: string;
        telegram?: string;
        instagram?: string;
      };
      copyright?: string;
      description?: string;
      additionalLinks?: Array<{ label: string; url: string }>;
    } | null>("globals/footer");

    return data;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
}

// Fetch blog posts
export async function getBlogPosts(params?: {
  limit?: number;
  page?: number;
  where?: Record<string, unknown>;
}) {
  try {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.where)
      queryParams.append("where", JSON.stringify(params.where));
    queryParams.append("depth", "2");
    queryParams.append("sort", "-publishedAt");

    const data = await fetchPayload<{
      docs: Array<Record<string, unknown>>;
      totalDocs: number;
      limit: number;
      totalPages: number;
      page: number;
    } | null>(`blog-posts?${queryParams.toString()}`);

    if (!data) {
      return { docs: [], totalDocs: 0, limit: 10, totalPages: 0, page: 1 };
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { docs: [], totalDocs: 0, limit: 10, totalPages: 0, page: 1 };
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await fetchPayload<{
      docs: Array<Record<string, unknown>>;
    } | null>(`blog-posts?where[slug][equals]=${slug}&depth=2&limit=1`);

    if (!data || !data.docs || data.docs.length === 0) {
      return null;
    }

    return data.docs[0] || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Fetch blog categories
export async function getBlogCategories() {
  try {
    const data = await fetchPayload<{
      docs: Array<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        color?: string;
      }>;
    } | null>("blog-categories?limit=100");

    if (!data || !data.docs) {
      return [];
    }

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

// Get base URL for media
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use current origin
    return window.location.origin;
  }
  // Server-side: use environment variable or default
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000"
  );
}

// Get media URL - always returns absolute URL for Next.js Image component
export function getMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") {
    // If it's already an absolute URL, return as is
    if (media.startsWith("http://") || media.startsWith("https://")) {
      return media;
    }
    // If it's a relative path, make it absolute
    const baseUrl = getBaseUrl();
    return media.startsWith("/") ? `${baseUrl}${media}` : `${baseUrl}/${media}`;
  }
  if (typeof media === "object" && media !== null) {
    const mediaObj = media as Record<string, unknown>;

    // If url exists, use it (Payload provides the correct URL)
    if (typeof mediaObj.url === "string") {
      const url = mediaObj.url;
      // Always return absolute URL for Next.js Image
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      // Convert relative path to absolute
      const baseUrl = getBaseUrl();
      return url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }

    // Fallback: construct URL from filename
    if (typeof mediaObj.filename === "string") {
      const filename = mediaObj.filename;
      const baseUrl = getBaseUrl();
      return `${baseUrl}/api/media/file/${filename}`;
    }
  }
  return "";
}
