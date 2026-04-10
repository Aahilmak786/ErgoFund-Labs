/** Prefer `PUBLIC_API_URL` in production; empty uses same-origin `/api` (dev proxy). */
export function apiUrl(path: string): string {
  const raw = import.meta.env.PUBLIC_API_URL;
  const b = typeof raw === 'string' ? raw.replace(/\/$/, '') : '';
  if (b) return `${b}${path}`;
  return path;
}

/** Netlify/static hosts return HTML 404 bodies — never surface that as UI text. */
export function formatApiError(body: string, status: number): string {
  const t = body.trim();
  if (t.startsWith('<!DOCTYPE') || t.startsWith('<!doctype') || t.startsWith('<html')) {
    if (status === 404) {
      return 'API not found. Set PUBLIC_API_URL in Netlify to your backend URL (see project wiki).';
    }
    return 'Unexpected HTML response from server. Check PUBLIC_API_URL and CORS.';
  }
  if (t.length > 280) return `${t.slice(0, 280)}…`;
  return t || `Request failed (${status})`;
}

/** Prefer JSON `{ "reason": "..." }` from API (e.g. referral validation). */
function errorFromResponseBody(raw: string, status: number): Error {
  try {
    const j = JSON.parse(raw) as { reason?: string; message?: string };
    const r = j?.reason ?? j?.message;
    if (typeof r === 'string' && r.length) return new Error(r);
  } catch {
    /* fall through */
  }
  return new Error(formatApiError(raw, status));
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  const raw = await res.text();
  if (!res.ok) throw errorFromResponseBody(raw, res.status);
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw errorFromResponseBody(raw, res.status);
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const raw = await res.text();
  if (!res.ok) throw errorFromResponseBody(raw, res.status);
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw errorFromResponseBody(raw, res.status);
  }
}
