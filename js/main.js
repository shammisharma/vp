
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

 


new Glide('#glide4', {
  type: 'carousel',
  startAt: 0,
  autoplay: 2000,
  hoverpause: true,
  gap: 20,
  // animationTimingFunc: ease,
  perView: 5,
  breakpoints: {
    800: {
      perView: 4
    },
  600: {
      perView: 2
    }
  }
}).mount();


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



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');



function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize",setupCanvas())

 window.addEventListener("load",   function (){
 

let strokewidth = canvas.width;
let strokeheight = canvas.height;


// for intro motion
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0); 
 
const gradient = ctx.createLinearGradient(0, 0, strokewidth, strokeheight);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "red");


    ctx.strokeStyle = gradient; // Green color for the cursor trail

function update(t) {

    // for intro motion
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    
    window.requestAnimationFrame(update);
}

	})

