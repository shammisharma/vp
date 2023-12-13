
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

let themeicon = document.getElementById('themeicon');

function updateButton({ buttonEl, isDark }) {
 
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
 
if(isDark) {
  themeicon.classList.add('icofont-sun');
  themeicon.classList.remove('icofont-moon');
}
else{
  themeicon.classList.add('icofont-moon');
  themeicon.classList.remove('icofont-sun');
}
   
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

 


// new Glide('#glide4', {
//   type: 'carousel',
//   startAt: 0,
//   autoplay: 2000,
//   hoverpause: true,
//   gap: 20,
//   perView: 5,
//   breakpoints: {
//     800: {
//       perView: 4
//     },
//   600: {
//       perView: 2
//     }
//   }
// }).mount();


new Glide('#testimonials', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  animationDuration: 150,
  dragThreshold: 1, 
  peek: { before: 80, after: 80 },
  gap: 15,
  breakpoints: {
  500: {
    peek: { before: 30, after: 30 }
    }
  }
}).mount();


 
function countUp(targetClass, durationInSeconds) {
  const counterElements = document.getElementsByClassName(targetClass);

  for (const counterElement of counterElements) {
    const targetNumber = parseInt(counterElement.getAttribute('count'), 10);
    const intervalDuration = durationInSeconds * 1000 / targetNumber; // Calculate interval dynamically
    let currentCount = 0;

    const intervalId = setInterval(() => {
      currentCount++;
      counterElement.innerText = currentCount;

      if (currentCount === targetNumber) {
        clearInterval(intervalId);
      }
    }, intervalDuration);
  }
}

// Start counting for all elements with the 'counter' class with a duration of 3 seconds

var target = document.getElementById("counterwrap");
var options = {
root: null,
threshold: [1],
rootMargin: "-50px",
};



const observer = new IntersectionObserver((entries, observer) => {
  // Check if the target element is intersecting
  if (entries[0].isIntersecting) {
      // Call your function with arguments
      countUp('counter', 3);
  }
}, options);

// Start observing the target element
observer.observe(target);