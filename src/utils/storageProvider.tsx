import { useEffect, useState } from "react";

function getStorageValue(key: string, defaultValue: string) {
  const saved = localStorage.getItem(key) || "";
  return saved === "" ? defaultValue : JSON.parse(saved);
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

// function getSessionStorageValue(key, defaultValue) {
//   const saved = sessionStorage.getItem(key);
//   const initial = JSON.parse(saved);
//   return initial || defaultValue;
// }

// export const useSessionStorage = (key, defaultValue) => {
//   const [value, setValue] = useState(() => {
//     return getSessionStorageValue(key, defaultValue);
//   });

//   useEffect(() => {
//     if (value !== undefined) {
//       sessionStorage.setItem(key, JSON.stringify(value));
//     }
//   }, [key, value]);

//   return [value, setValue];
// };
