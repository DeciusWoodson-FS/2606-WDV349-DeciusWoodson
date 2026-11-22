import { useEffect, useState } from "react";

// Becomes true once `active` has stayed true for `delay` ms. Used to explain long waits,
// like the API's free host waking up after a quiet period.
export function useSlowLoading(active, delay = 4000) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!active) return undefined;
    const timer = setTimeout(() => setSlow(true), delay);
    return () => {
      clearTimeout(timer);
      setSlow(false);
    };
  }, [active, delay]);

  return active && slow;
}
