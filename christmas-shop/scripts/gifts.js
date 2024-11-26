import generateCards from "./generate-cards.js";

const container = document.querySelector(".gift-cards-container");
const tabs = document.querySelectorAll(".tabs__item");

generateCards(container, 36);

const allCards = container.querySelectorAll(".gift-card");
const workCards = container.querySelectorAll("[data-type='for-work']");
const healthCards = container.querySelectorAll("[data-type='for-health']");
const harmonyCards = container.querySelectorAll("[data-type='for-harmony']");

function showCardsByTab(tab) {
  const currentTab = tab.target.id;

  allCards.forEach((e) => (e.style.display = "none"));
  switch (currentTab) {
    case "tabs__work":
      workCards.forEach((e) => (e.style.display = "block"));
      break;
    case "tabs__health":
      healthCards.forEach((e) => (e.style.display = "block"));
      break;
    case "tabs__harmony":
      harmonyCards.forEach((e) => (e.style.display = "block"));
      break;
    case "tabs__all":
      allCards.forEach((e) => (e.style.display = "block"));
      break;
  }
}

function switchActiveTab(tab) {
  const currentTab = tab.target;

  tabs.forEach((e) => e.classList.remove("active"));
  currentTab.classList.add("active");
}

tabs.forEach((e) =>
  e.addEventListener("click", (tab) => {
    showCardsByTab(tab);
    switchActiveTab(tab);
  })
);
