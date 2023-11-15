
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


const button = document.querySelector(".themechange");
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





let cursorcontainer = document.getElementById("cursorwrap");

let myDiv = document.getElementById("cursordiv");
//Detect touch device
function isTouchDevice() {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error
    cursorcontainer.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

const move = (e) => {
  //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
  try {
    //PageX and PageY return the position of client's cursor from top left of screen
    var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (e) {}
  //set left and top of div based on mouse position
 
if(myDiv) {
  myDiv.style.left = x - 50 + "px";
  myDiv.style.top = y - 50 + "px";
}
};
//For mouse
cursorcontainer.addEventListener("mousemove", (e) => {
  move(e);
});
//For touch
cursorcontainer.addEventListener("touchmove", (e) => {
  move(e);
});



function hideScroll() {
   var element = document.getElementById("pagebody");
   element.classList.toggle("noscroll");
}










