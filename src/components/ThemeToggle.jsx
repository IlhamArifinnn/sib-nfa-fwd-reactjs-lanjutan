import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-slate-300" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
}
