import { useEffect, useState } from "react";

export const useLocalState = (defaultValue: string | null, key: string) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
