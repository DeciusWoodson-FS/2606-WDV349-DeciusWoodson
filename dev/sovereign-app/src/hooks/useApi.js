import { useCallback, useEffect, useState } from "react";

// Loads data on mount and tracks its loading and error state.
// `fetcher` must keep the same identity between renders, like the functions in lib/api.js.
// `loading` only covers the first load, so `reload` refreshes without a loading flash.
export function useApi(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(
    () =>
      fetcher()
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    [fetcher]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
