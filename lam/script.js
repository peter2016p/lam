var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)
var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
})
var myCarousel = document.getElementById('myCarousel')

myCarousel.addEventListener('slide.bs.carousel', function () {
  // do something...
})
function openMulti() {
  if (document.querySelector(".selectWrapper").style.pointerEvents == "all") {
    document.querySelector(".selectWrapper").style.opacity = 0;
    document.querySelector(".selectWrapper").style.pointerEvents = "none";
    resetAllMenus();
  } else {
    document.querySelector(".selectWrapper").style.opacity = 1;
    document.querySelector(".selectWrapper").style.pointerEvents = "all";
  }
}
function nextMenu(e) {
  menuIndex = eval(event.target.parentNode.id.slice(-1));
  document.querySelectorAll(".multiSelect")[menuIndex].style.transform =
    "translateX(-100%)";
  // document.querySelectorAll(".multiSelect")[menuIndex].style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
  document.querySelectorAll(".multiSelect")[menuIndex].style.clipPath =
    "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
  document.querySelectorAll(".multiSelect")[menuIndex + 1].style.transform =
    "translateX(0)";
  document.querySelectorAll(".multiSelect")[menuIndex + 1].style.clipPath =
    "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
}
function prevMenu(e) {
  menuIndex = eval(event.target.parentNode.id.slice(-1));
  document.querySelectorAll(".multiSelect")[menuIndex].style.transform =
    "translateX(100%)";
  document.querySelectorAll(".multiSelect")[menuIndex].style.clipPath =
    "polygon(0 0, 0 0, 0 100%, 0% 100%)";
  document.querySelectorAll(".multiSelect")[menuIndex - 1].style.transform =
    "translateX(0)";
  document.querySelectorAll(".multiSelect")[menuIndex - 1].style.clipPath =
    "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
}
function resetAllMenus() {
  setTimeout(function () {
    var x = document.getElementsByClassName("multiSelect");
    var i;
    for (i = 1; i < x.length; i++) {
      x[i].style.transform = "translateX(100%)";
      x[i].style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
    }
    document.querySelectorAll(".multiSelect")[0].style.transform =
      "translateX(0)";
    document.querySelectorAll(".multiSelect")[0].style.clipPath =
      "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
  }, 300);
}
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s `;
      }
    });
    burger.classList.toggle("toggle");
  });
  //
};

navSlide();
const pointCount = 7;
const circleRadius = 160;
const startAnimDelta = 5;
const circumference = Math.PI * circleRadius * 2;

var selectedItemIndex = -1;

var circlePath = document.getElementById('mask-circle');

/**
 * @description On Mouse Leave event handler for points
 */
const onMouseLeave = () => {
  let index = (selectedItemIndex !== -1) ? selectedItemIndex : 0;
  calculateOffset(index);
};

/**
 * @description On Click event handler for points
 * @param {Number} index - Index of list item
 */
const onClick = (index) => {
  //If already selected, deselect
  selectedItemIndex = (selectedItemIndex === index) ? -1 : index;
  calculateOffset(index);
  
  //Find active item, deselect
  let activeListItem = document.querySelectorAll('.navigation-circle-list-item.active');
  if (activeListItem.length > 0) activeListItem[0].classList.remove('active');
  
  //Find new item by index, select
  let listItem = document.querySelectorAll('.navigation-circle-list-item:nth-of-type(' + selectedItemIndex + ')');
  if (listItem.length > 0) listItem[0].classList.add('active');
};

/**
 * @description - Calculate offset for circle path by index of list item
 * @param {Number} index - Index of list item
 */
const calculateOffset = (index=0) => {
  let offset = 0;

  if (index !== 0) offset = (circumference / pointCount) * (pointCount - index);
  
  circlePath.style.strokeDashoffset = `${offset}px`;
};

// INTRO

let buffer = 500;
let delay = 1000 * (1 + (pointCount / startAnimDelta) - (1 / startAnimDelta)) + buffer;

setTimeout(() => onClick(1), delay);