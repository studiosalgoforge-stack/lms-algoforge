// cache.js
const cache = new Map();

export function setCache(key, data, ttl = 600000) { // 10 min
  cache.set(key, { data, expiry: Date.now() + ttl });
}

export function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}
