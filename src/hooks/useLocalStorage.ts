import { useState } from 'react';

function useLocalStorage(key: string, initialValue: string | number) {
  const [value, setValue] = useState<string | number>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  const setStoredValue = (newValue: string | number) => {
    setValue(newValue);
    localStorage.setItem(key, newValue.toString());
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;