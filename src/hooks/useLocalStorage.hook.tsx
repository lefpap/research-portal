import { useEffect, useState, useCallback } from "react";

function readValue<T>(key: string, initialValue: T | (() => T)) {
  let raw = window.localStorage.getItem(key);
  if (!raw) {
    if (initialValue instanceof Function) {
      return initialValue();
    }

    return initialValue;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return raw as T;
    }

    console.log(error);

    if (initialValue instanceof Function) {
      return initialValue();
    }

    return initialValue;
  }
}

function storeValue(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() =>
    readValue<T>(key, initialValue),
  );

  // useCallback to prevent unnecessary effect re-runs
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storeValue(key, valueToStore);
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue],
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(readValue(event.newValue, initialValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}

export { useLocalStorage };
