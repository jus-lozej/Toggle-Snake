import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  const intervalId = useRef(null);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      if (intervalId != null) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      return;
    }

    intervalId.current = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [delay]);
}
