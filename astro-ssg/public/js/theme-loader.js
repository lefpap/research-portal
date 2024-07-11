const getThemePreference = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (document, theme) => {
  const isDark = theme === "dark";
  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
};

const setupObserver = (document) => {
  console.log("Setting up observer");

  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

const loadTheme = (document) => {
  const IS_SERVER = typeof localStorage === "undefined";
  if (IS_SERVER) {
    console.warn(
      "localStorage is not available on the server, skipping theme setup.",
    );
  }

  const theme = getThemePreference();
  setupObserver(document);
  applyTheme(document, theme);
};

// Load the theme on initial page load
loadTheme(document);

// Listen for the `astro:before-swap` event and then set the theme on the incoming document
document.addEventListener("astro:before-swap", (ev) => {
  // Pass the incoming document to set the theme on it
  loadTheme(ev.newDocument);
});
