
function getCurrentTheme({ localStorageTheme, systemThemeDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemThemeDark.matches) {
    return "dark";
  }

  return "light";
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "☼" : "☾";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}


function setThemeOnHtml({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}


/**
* On page load:
*/


const button = document.querySelector(".themeChange");
const localStorageTheme = localStorage.getItem("theme");
const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");


let currentTheme = getCurrentTheme({ localStorageTheme, systemThemeDark });

updateButton({ buttonEl: button, isDark: currentTheme === "dark" });
setThemeOnHtml({ theme: currentTheme });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  setThemeOnHtml({ theme: newTheme });

  currentTheme = newTheme;
}); 