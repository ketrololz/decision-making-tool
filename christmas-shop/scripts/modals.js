import giftsJson from '../gifts.json' with { type: 'json' };

const giftCardsArr = document.querySelectorAll(".gift-card");
const modalWindow = document.querySelector(".modal-cards");
const closeButton = document.querySelector(".close-button");
const body = document.querySelector("body");
const blackout = document.querySelector(".blackout");
const outside = document.querySelector(".outside");

function openModal(card) {
  changeData(card);
  modalWindow.classList.remove("hidden");
  body.classList.add("no-scroll");
  blackout.classList.remove("hidden");
}

function closeModal() {
  modalWindow.classList.add("hidden");
  body.classList.remove("no-scroll");
  blackout.classList.add("hidden");
}

function changeData(card) {
  const currentCardObj = giftsJson.find(
    (item) => item.name === getCardName(card)
  );
  const modalImg = document.getElementById("modal-image");
  const modalType = document.getElementById("modal-type");
  const modalName = document.getElementById("modal-name");
  const modalDescription = document.getElementById("modal-description");
  const modalLive = document.getElementById("modal-live");
  const modalCreate = document.getElementById("modal-create");
  const modalLove = document.getElementById("modal-love");
  const modalDream = document.getElementById("modal-dream");

  switch (currentCardObj.category) {
    case "For Work":
      modalImg.classList.remove("for-health-image");
      modalImg.classList.remove("for-harmony-image");
      modalImg.classList.add("for-work-image");
      break;
    case "For Health":
      modalImg.classList.remove("for-work-image");
      modalImg.classList.remove("for-harmony-image");
      modalImg.classList.add("for-health-image");
      break;
    case "For Harmony":
      modalImg.classList.remove("for-health-image");
      modalImg.classList.remove("for-work-image");
      modalImg.classList.add("for-harmony-image");
      break;
  }

  switch (currentCardObj.category) {
    case "For Work":
      modalType.classList.remove("for-health");
      modalType.classList.remove("for-harmony");
      modalType.classList.add("for-work");
      modalType.innerHTML = "For Work";
      break;
    case "For Health":
      modalType.classList.remove("for-work");
      modalType.classList.remove("for-harmony");
      modalType.classList.add("for-health");
      modalType.innerHTML = "For Health";
      break;
    case "For Harmony":
      modalType.classList.remove("for-health");
      modalType.classList.remove("for-work");
      modalType.classList.add("for-harmony");
      modalType.innerHTML = "For Harmony";
      break;
  }

  modalName.innerHTML = currentCardObj.name;
  modalDescription.innerHTML = currentCardObj.description;
  modalLive.innerHTML = currentCardObj.superpowers.live;
  modalCreate.innerHTML = currentCardObj.superpowers.create;
  modalLove.innerHTML = currentCardObj.superpowers.love;
  modalDream.innerHTML = currentCardObj.superpowers.dream;
  clearSnowflakes();
  fillSnowflakes();
}

function fillSnowflakes() {
  const stats = document.querySelectorAll(".stats-list__item");

  stats.forEach((item) => {
    const count = +item.children[1].innerHTML / 100;
    const snowflakes = item.childNodes[5];

    for (let i = 0; i < count; i++) {
      snowflakes.children[i].classList.add("filled");
    }
  });
}

function clearSnowflakes() {
  const filledSnowflakes = document.querySelectorAll(".filled");

  filledSnowflakes.forEach((item) => item.classList.remove("filled"));
}

function getCardName(card) {
  return card.querySelector("h3").innerHTML;
}

giftCardsArr.forEach((item) =>
  item.addEventListener("click", () => openModal(item))
);

outside.addEventListener("click", () => closeModal());

closeButton.addEventListener("click", () => closeModal());