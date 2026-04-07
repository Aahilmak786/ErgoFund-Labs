/** Prefer `PUBLIC_API_URL` in production; empty uses same-origin `/api` (dev proxy). */
export function apiUrl(path: string): string {
  const raw = import.meta.env.PUBLIC_API_URL;
  const b = typeof raw === 'string' ? raw.replace(/\/$/, '') : '';
  if (b) return `${b}${path}`;
  return path;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}
