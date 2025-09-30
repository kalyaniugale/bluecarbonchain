import { useEffect, useState } from "react";
import Icon from "../AppIcon"; // your existing icon wrapper

const storageKey = "bcc:theme"; // 'light' | 'dark'

const ThemeToggleFancy = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("forest-dark");
      localStorage.setItem(storageKey, "dark");
    } else {
      root.classList.remove("forest-dark");
      localStorage.setItem(storageKey, "light");
    }
  }, [dark]);

  return (
    <label className="theme-toggle cursor-pointer" title="Toggle theme">
      {/* Hidden checkbox controls the CSS animation state */}
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(!dark)}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      />
      <span className="track">
        <span className="icon sun">
          <Icon name="Sun" size={14} />
        </span>
        <span className="icon moon">
          <Icon name="Moon" size={14} />
        </span>
        <span className="knob" />
      </span>
    </label>
  );
};

export default ThemeToggleFancy;
