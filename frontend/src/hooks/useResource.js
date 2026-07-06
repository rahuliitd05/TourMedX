import { useEffect, useState } from 'react';
import { fetchCollection } from '../services/api';

export function useResource(endpoint, fallbackValue = []) {
  const [data, setData] = useState(fallbackValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const nextData = await fetchCollection(endpoint, null);

        // API returns paginated { items, page, total } or plain array
        const apiItems = Array.isArray(nextData)
          ? nextData
          : Array.isArray(nextData?.items)
          ? nextData.items
          : null;

        if (mounted) {
          if (!apiItems) {
            // API failed entirely — use fallback
            setData(fallbackValue);
          } else {
            // Merge: DB items (with _id) take priority.
            // Show fallback items not yet in DB alongside DB items.
            const apiKeySet = new Set(
              apiItems
                .map((i) => i.slug || i.name || i.title || i.packageName)
                .filter(Boolean)
            );
            const fallbackOnly = (fallbackValue || []).filter((f) => {
              const key = f.slug || f.name || f.title || f.packageName;
              return !apiKeySet.has(key);
            });
            setData([...apiItems, ...fallbackOnly]);
          }
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || 'Unable to load resource');
          setData(fallbackValue);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [endpoint, fallbackValue]);

  return { data, loading, error, setData };
}
