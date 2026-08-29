/**
 * Limite de débit en mémoire, fenêtre glissante.
 *
 * Limite connue : le compteur vit dans le processus. Il repart de zéro à chaque
 * redéploiement et n'est pas partagé entre instances — suffisant contre les bots
 * et les envois répétés, inefficace contre une attaque distribuée.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

const globalForRateLimit = globalThis as typeof globalThis & {
  __sunuRateLimitHits?: Map<string, number[]>;
};

const hits =
  globalForRateLimit.__sunuRateLimitHits ??
  (globalForRateLimit.__sunuRateLimitHits = new Map<string, number[]>());

/** `true` si la requête passe, `false` si le quota est dépassé. */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const threshold = now - WINDOW_MS;

  // Purge des entrées expirées pour que la Map ne grossisse pas indéfiniment.
  for (const [entryKey, timestamps] of hits) {
    const fresh = timestamps.filter((time) => time > threshold);
    if (fresh.length === 0) hits.delete(entryKey);
    else hits.set(entryKey, fresh);
  }

  const recent = hits.get(key) ?? [];
  if (recent.length >= MAX_REQUESTS) return false;

  hits.set(key, [...recent, now]);
  return true;
}

/** IP de l'appelant derrière le proxy de l'hébergeur. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
