const leftBtn = document.getElementById("slider-button-left");
const rightBtn = document.getElementById("slider-button-right");
const slider = document.querySelector(".slider");
const wrapper = document.querySelector(".wrapper");

const sliderWidth = slider.scrollWidth;
const sliderStyles = window.getComputedStyle(slider);
let sliderVisibleWidth = slider.offsetWidth;

let clicksCount = 0;

function slideRight() {
  const currentX = parseInt(sliderStyles.getPropertyValue("--x"));

  let sliderVisibleWidth = slider.offsetWidth;

  if (wrapper.clientWidth > 768 && clicksCount < 3) {
    const step = Math.round(
      (sliderWidth -
        sliderVisibleWidth +
        parseInt(sliderStyles.getPropertyValue("margin-left"))) /
        3
    );
    slider.style.setProperty("--x", `${currentX - step}px`);
    clicksCount += 1;
  } else if (wrapper.clientWidth < 768 && clicksCount < 6) {
    const step = (sliderWidth - sliderVisibleWidth) / 6;
    slider.style.setProperty("--x", `${currentX - step}px`);
    clicksCount += 1;
  }
}

function slideLeft() {
  const currentX = parseInt(sliderStyles.getPropertyValue("--x"));

  let sliderVisibleWidth = slider.offsetWidth;

  if (wrapper.clientWidth > 768 && clicksCount > 0) {
    const step = Math.round(
      (sliderWidth -
        sliderVisibleWidth +
        parseInt(sliderStyles.getPropertyValue("margin-left"))) /
        3
    );
    slider.style.setProperty("--x", `${currentX + step}px`);
    clicksCount -= 1;
  } else if (wrapper.clientWidth <= 768 && clicksCount > 0) {
    const step = (sliderWidth - sliderVisibleWidth) / 6;
    slider.style.setProperty("--x", `${currentX + step}px`);
    clicksCount -= 1;
  }
}

function rightClick() {
  slideRight(slider.scrollWidth - slider.offsetWidth);
  leftBtn.classList.remove("inactive");

  if (wrapper.clientWidth > 768 && clicksCount > 2) {
    rightBtn.classList.add("inactive");
  } 
}

function leftClick() {
  slideLeft(slider.scrollWidth - slider.offsetWidth);
  rightBtn.classList.remove("inactive");

  if (wrapper.clientWidth > 768 && clicksCount < 1) {
    leftBtn.classList.add("inactive");
  }
}

rightBtn.addEventListener("click", () => {
  rightClick();
});
leftBtn.addEventListener("click", () => {
  leftClick();
});

window.addEventListener("resize", () => {
  slider.style.setProperty("--x", `0px`);
  clicksCount = 0;
  leftBtn.classList.add("inactive");
  rightBtn.classList.remove("inactive");
});
