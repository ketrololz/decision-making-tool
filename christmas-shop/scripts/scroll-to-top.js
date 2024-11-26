const scrollBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.innerWidth < 769 && window.scrollY > 300) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 769) {
    scrollBtn.classList.add("hidden");
  } else if (window.scrollY > 300) {
    scrollBtn.classList.remove("hidden");
  }
});
