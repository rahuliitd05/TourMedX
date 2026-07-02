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
        const nextData = await fetchCollection(endpoint, fallbackValue);
        if (mounted) {
          setData(Array.isArray(nextData) ? nextData : fallbackValue);
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
