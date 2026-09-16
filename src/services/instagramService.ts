/**
 * Instagram Graph API Client & Feed Synchronizer
 * Connects to official Meta Instagram Basic Display / Graph API
 * to fetch live media, captions, permalinks, and timestamps.
 */

export interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_url: string;
    }>;
  };
}

export interface InstagramSyncResult {
  success: boolean;
  username?: string;
  items: InstagramMediaItem[];
  error?: string;
}

const CACHE_KEY = 'smriti_instagram_graph_media_cache';
const CACHE_EXPIRY_KEY = 'smriti_instagram_graph_media_expiry';
const CACHE_DURATION_MS = 1000 * 60 * 30; // 30 minutes cache to prevent rate limits

/**
 * Fetch media from Instagram Basic Display / Graph API
 * Supported endpoints:
 * 1. graph.instagram.com/me/media (Instagram Basic Display / User Token)
 * 2. graph.facebook.com/v19.0/{user-id}/media (Instagram Graph API for Business/Creator)
 */
export async function fetchInstagramGraphMedia(
  accessToken: string,
  userId?: string,
  forceRefresh = false
): Promise<InstagramSyncResult> {
  const token = accessToken.trim();
  if (!token) {
    return {
      success: false,
      items: [],
      error: 'Please enter a valid Instagram Access Token.',
    };
  }

  // Check cached results if not forced
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
      if (cached && expiry && Number(expiry) > Date.now()) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            success: true,
            items: parsed,
          };
        }
      }
    } catch {
      // Ignore cache read errors
    }
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_url}';
  
  // Decide endpoint: if custom numeric user ID is provided, or standard /me/media
  const baseUrl = userId && userId.trim()
    ? `https://graph.facebook.com/v19.0/${userId.trim()}/media`
    : `https://graph.instagram.com/me/media`;

  const url = `${baseUrl}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}&limit=25`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.error) {
      const msg = data.error?.message || `Instagram API error (${res.status})`;
      return {
        success: false,
        items: [],
        error: msg,
      };
    }

    if (data && Array.isArray(data.data)) {
      const items: InstagramMediaItem[] = data.data;

      // Save to cache
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(items));
        localStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION_MS));
      } catch {
        // storage full or disabled
      }

      return {
        success: true,
        items,
      };
    }

    return {
      success: false,
      items: [],
      error: 'No media items returned from Instagram API.',
    };
  } catch (err: any) {
    return {
      success: false,
      items: [],
      error: err?.message || 'Network error connecting to Instagram Graph API. Check your internet or token.',
    };
  }
}

/**
 * Get cached Instagram media if available
 */
export function getCachedInstagramMedia(): InstagramMediaItem[] {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // empty
  }
  return [];
}

/**
 * Clear cached Instagram media
 */
export function clearInstagramCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
  } catch {
    // empty
  }
}
