import { useState, useEffect } from "preact/hooks";

export default function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
  }, []);

  return isDark;
}
