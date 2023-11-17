import { useEffect } from "react";
import { act } from "react-dom/test-utils";

export function useKey(key, action) {
  useEffect(() => {
    const callback = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
