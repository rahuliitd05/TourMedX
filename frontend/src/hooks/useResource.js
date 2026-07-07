import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Derive a stable string key for an item regardless of model shape.
 * Treatments use slug, doctors/hospitals use name, packages use packageName.
 */
function itemKey(item) {
  return item.slug ?? item.name ?? item.title ?? item.packageName ?? item.question ?? null;
}

export function useResource(endpoint, fallbackValue = []) {
  const [data, setData] = useState(fallbackValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setError('');
        const response = await api.get(endpoint);
        const dataPayload = response.data;

        // API returns paginated { items, page, total } or a plain array
        const dbItems = Array.isArray(dataPayload)
          ? dataPayload
          : Array.isArray(dataPayload?.items)
          ? dataPayload.items
          : [];

        if (mounted) {
          // Build a set of keys from DB items so we can skip duplicates in fallback
          const dbKeySet = new Set(dbItems.map(itemKey).filter(Boolean));

          // Append fallback items that are not yet in the DB
          const unsynced = (fallbackValue ?? []).filter((f) => {
            const k = itemKey(f);
            return k != null && !dbKeySet.has(k);
          });

          setData([...dbItems, ...unsynced]);
        }
      } catch (loadError) {
        if (mounted) {
          const errMsg = loadError.response?.data?.message || loadError.message || 'Unable to load resource';
          setError(errMsg);
          setData(fallbackValue ?? []);
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
