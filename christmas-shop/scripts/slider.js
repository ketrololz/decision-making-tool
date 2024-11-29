const leftBtn = document.getElementById("slider-button-left");
const rightBtn = document.getElementById("slider-button-right");
const slider = document.querySelector(".slider");
const wrapper = document.querySelector(".wrapper");

const sliderWidth = 1998;
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
  leftBtn.disabled = false;

  if (wrapper.clientWidth > 768 && clicksCount > 2) {
    rightBtn.disabled = true;
  } else if (wrapper.clientWidth <= 768 && clicksCount > 5) {
    rightBtn.disabled = true;
  }
}

function leftClick() {
  slideLeft(slider.scrollWidth - slider.offsetWidth);
  rightBtn.disabled = false;

  if (clicksCount < 1) {
    leftBtn.disabled = true;
  }
}

function resetSlider() {
  slider.style.setProperty("--x", `0px`);
  clicksCount = 0;
  leftBtn.disabled = true;
  rightBtn.disabled = false;
}

rightBtn.addEventListener("click", () => {
  rightClick();
});
leftBtn.addEventListener("click", () => {
  leftClick();
});

window.addEventListener("resize", () => resetSlider());
