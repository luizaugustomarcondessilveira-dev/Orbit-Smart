import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safely decodes base64 string across browser and Node environments
function decodeBase64(str: string): string {
  try {
    const cleanStr = str.replace(/-/g, '+').replace(/_/g, '/');
    if (typeof atob === 'function') {
      return atob(cleanStr);
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(cleanStr, 'base64').toString('utf8');
    }
  } catch {
    // ignore
  }
  return '';
}

// Extracts project reference (e.g. 'cciyvzmweyriokxfihut') from a Supabase JWT token
function extractProjectRefFromJwt(token?: string): string | null {
  if (!token || typeof token !== 'string') return null;
  const trimmed = token.trim();
  if (!trimmed.startsWith('eyJ')) return null;

  try {
    const parts = trimmed.split('.');
    if (parts.length < 2) return null;
    const jsonStr = decodeBase64(parts[1]);
    if (!jsonStr) return null;
    const payload = JSON.parse(jsonStr);
    if (payload && typeof payload.ref === 'string' && payload.ref.length > 5) {
      return payload.ref;
    }
  } catch {
    return null;
  }
  return null;
}

function sanitizeSupabaseUrl(url?: string, key?: string): string | null {
  // If the user pasted the anon JWT key into the URL field
  if (url && url.trim().startsWith('eyJ')) {
    const ref = extractProjectRefFromJwt(url.trim());
    if (ref) return `https://${ref}.supabase.co`;
  }

  // If the URL is missing or empty, but the key is a JWT, infer the project URL from the key's ref
  if ((!url || !url.trim() || url.trim().startsWith('YOUR_') || url.trim().startsWith('MY_')) && key && key.trim().startsWith('eyJ')) {
    const ref = extractProjectRefFromJwt(key.trim());
    if (ref) return `https://${ref}.supabase.co`;
  }

  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Ignore placeholder strings injected by templates or env managers
  if (
    /^(YOUR_|MY_|CHANGE_ME|REPLACE_ME|<)/i.test(trimmed) ||
    trimmed.toLowerCase() === 'placeholder' ||
    trimmed.toLowerCase() === 'undefined' ||
    trimmed.toLowerCase() === 'null'
  ) {
    return null;
  }

  // If user pasted just project reference (e.g. 20 chars alphanumeric like 'cciyvzmweyriokxfihut')
  if (/^[a-z0-9]{20}$/i.test(trimmed)) {
    return `https://${trimmed}.supabase.co`;
  }

  // Ensure protocol
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      parsed.hostname &&
      parsed.hostname.includes('.') &&
      !parsed.hostname.startsWith('eyJ')
    ) {
      return withProtocol;
    }
  } catch {
    return null;
  }

  return null;
}

function sanitizeSupabaseKey(key?: string, url?: string): string | null {
  if (key && typeof key === 'string') {
    const trimmed = key.trim();
    if (trimmed.startsWith('eyJ')) return trimmed;
    if (
      !/^(YOUR_|MY_|CHANGE_ME|REPLACE_ME|<)/i.test(trimmed) &&
      trimmed.toLowerCase() !== 'placeholder' &&
      trimmed.toLowerCase() !== 'undefined'
    ) {
      return trimmed;
    }
  }

  // Fallback: if rawUrl was accidentally the JWT token
  if (url && typeof url === 'string') {
    const trimmed = url.trim();
    if (trimmed.startsWith('eyJ')) return trimmed;
  }

  return null;
}

const validUrl = sanitizeSupabaseUrl(rawUrl, rawKey);
const validKey = sanitizeSupabaseKey(rawKey, rawUrl);

export const isSupabaseConfigured = Boolean(validUrl && validKey);

// Fallback coordinates to prevent constructor crashes while waiting for user credentials
const SAFE_FALLBACK_URL = 'https://placeholder-project.supabase.co';
const SAFE_FALLBACK_KEY = 'placeholder-anon-key';

let supabaseClient: SupabaseClient;

try {
  supabaseClient = createClient(
    validUrl || SAFE_FALLBACK_URL,
    validKey || SAFE_FALLBACK_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
} catch (error) {
  console.warn('[Orbit Supabase] Inicializando cliente em modo de segurança:', error);
  supabaseClient = createClient(SAFE_FALLBACK_URL, SAFE_FALLBACK_KEY);
}

export const supabase = supabaseClient;
export const resolvedSupabaseUrl = validUrl;
