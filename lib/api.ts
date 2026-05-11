// Centralized API client for the Casa de Flora admin pages.
//
// Reads NEXT_PUBLIC_API_URL (e.g. http://localhost:5000) and forwards an
// admin token from localStorage when present, so the few endpoints that
// require `authenticate` work once an admin is signed in.

const TOKEN_KEY         = 'adminToken';
const REFRESH_TOKEN_KEY = 'adminRefreshToken';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:5000';

export interface ApiError {
  status: number;
  message: string;
  errors?: { path: string; message: string }[];
}

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setAdminToken = (token: string | null) => {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else       window.localStorage.removeItem(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string | null) => {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
  else       window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const clearSession = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem('adminUser');
  window.dispatchEvent(new Event('casa-flora:auth-changed'));
};

// Deduplicates concurrent refresh attempts so only one request goes out.
let _refreshPromise: Promise<string> | null = null;

async function doRefreshToken(): Promise<string> {
  const rt = getRefreshToken();
  if (!rt) throw new Error('No refresh token');

  const res = await fetch(`${API_URL}/api/users/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: rt }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = (await res.json()) as { accessToken: string; refreshToken?: string };
  setAdminToken(data.accessToken);
  if (data.refreshToken) setRefreshToken(data.refreshToken);
  return data.accessToken;
}

async function refreshOnce(): Promise<string> {
  if (!_refreshPromise) {
    _refreshPromise = doRefreshToken().finally(() => {
      _refreshPromise = null;
    });
  }
  return _refreshPromise;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  _isRetry = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...init,
    headers,
  });

  let payload: unknown = null;
  if (res.status !== 204) {
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
  }

  if (!res.ok) {
    // On 401, attempt a silent token refresh once, then retry the request.
    if (res.status === 401 && typeof window !== 'undefined' && !_isRetry) {
      try {
        await refreshOnce();
        return apiFetch<T>(path, init, true);
      } catch {
        clearSession();
      }
    } else if (res.status === 401 && typeof window !== 'undefined') {
      clearSession();
    }

    const body = (payload ?? {}) as Partial<ApiError> & { message?: string };
    const err: ApiError = {
      status:  res.status,
      message: body.message ?? res.statusText ?? 'Request failed',
      errors:  body.errors,
    };
    throw err;
  }

  return payload as T;
}

export const api = {
  get:    <T>(path: string)               => apiFetch<T>(path),
  post:   <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'PUT',    body: JSON.stringify(body) }),
  patch:  <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete: <T>(path: string)               => apiFetch<T>(path, { method: 'DELETE' }),
};
