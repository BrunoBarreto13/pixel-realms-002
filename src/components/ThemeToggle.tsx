import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { PixelButton } from "./PixelButton";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      root.classList.toggle("dark", savedTheme === "dark");
    } else {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    window.document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <PixelButton
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      title={theme === "dark" ? "Modo Floresta" : "Modo Caverna"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </PixelButton>
  );
}
