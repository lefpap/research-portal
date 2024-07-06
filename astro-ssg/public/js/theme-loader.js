function loadTheme(document) {
  const isBrowser = typeof localStorage !== "undefined";

  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  const isDark = getThemePreference() === "dark";
  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
}

loadTheme(document);

document.addEventListener("astro:before-swap", (ev) => {
  // Pass the incoming document to set the theme on it
  loadTheme(ev.newDocument);
});
