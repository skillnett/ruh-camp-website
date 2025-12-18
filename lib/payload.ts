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
    next: { revalidate: 60 }, // Revalidate every 60 seconds
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
  console.log("API Response data:", JSON.stringify(jsonData, null, 2));
  return jsonData as T;
}

// Fetch home page data
export async function getHomePage() {
  try {
    const endpoint = "home-page?limit=1&depth=3";
    const apiUrl = getApiUrl();
    const url = `${apiUrl}/${endpoint}`;
    console.log("Fetching home page from:", url);
    console.log("API Base URL:", apiUrl);

    const data = await fetchPayload<{
      docs: Array<{
        id: string;
        title: string;
        metaDescription?: string;
        sections: Array<Record<string, unknown>>;
      }>;
    } | null>(endpoint);

    console.log("Home page API response:", JSON.stringify(data, null, 2));

    if (!data) {
      console.log("No data returned from API (null response)");
      return null;
    }

    if (!data.docs || data.docs.length === 0) {
      console.log("No docs in response. Data structure:", Object.keys(data));
      return null;
    }

    console.log("Found home page:", data.docs[0]?.title);
    return data.docs[0] || null;
  } catch (error) {
    console.error("Error fetching home page:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
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

// Get media URL
export function getMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const mediaObj = media as Record<string, unknown>;
    if (typeof mediaObj.url === "string") return mediaObj.url;
    if (typeof mediaObj.filename === "string") {
      const apiUrl = getApiUrl();
      const baseUrl = apiUrl.replace("/api", "");
      return `${baseUrl}/media/${mediaObj.filename}`;
    }
  }
  return "";
}
