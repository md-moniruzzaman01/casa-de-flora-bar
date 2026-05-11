// Admin session helpers — token + user info live in localStorage so they
// survive a refresh, with a tiny event bus so React components stay in sync.

import { useEffect, useState } from 'react';
import { api, setAdminToken, setRefreshToken } from './api';

const USER_KEY  = 'adminUser';
const EVENT     = 'casa-flora:auth-changed';

export interface AdminUser {
  id:    string;
  name:  string;
  email: string;
  role:  'SUPER_ADMIN' | 'ADMIN';
}

const isBrowser = () => typeof window !== 'undefined';

const readUser = (): AdminUser | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
};

const writeUser = (user: AdminUser | null) => {
  if (!isBrowser()) return;
  if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  else      window.localStorage.removeItem(USER_KEY);
};

const emit = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(EVENT));
};

export const getCurrentUser = (): AdminUser | null => readUser();

export const signOut = () => {
  setAdminToken(null);
  setRefreshToken(null);
  writeUser(null);
  emit();
};

// Step 1 of login — submit credentials, server emails an OTP.
export const requestOtp = (email: string, password: string) =>
  api.post<{ message: string }>('/api/users/login', { email, password });

// Step 2 — verify OTP, persist session, return the user.
export const verifyOtp = async (
  email: string,
  otp: string,
): Promise<AdminUser> => {
  const res = await api.post<{ accessToken: string; refreshToken?: string; user: AdminUser }>(
    '/api/users/verify-otp',
    { email, otp },
  );
  setAdminToken(res.accessToken);
  if (res.refreshToken) setRefreshToken(res.refreshToken);
  writeUser(res.user);
  emit();
  return res.user;
};

// React hook — renders authenticated state and re-renders on session change.
export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(() => readUser());

  useEffect(() => {
    const sync = () => setUser(readUser());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return { user, isAuthenticated: !!user };
};
