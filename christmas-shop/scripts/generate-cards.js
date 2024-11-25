import giftsJson from '../gifts.json' with { type: 'json' };

function createCard(container, type, typeImage, typeColor, name) {
  const card = document.createElement("article");
  container.append(card);
  card.classList.add("gift-card");
  card.innerHTML = `
    <div class="gift-card__image ${typeImage}"></div>
              <div class="gift-card__text">
                <h4 class="${typeColor}">${type}</h4>
                <h3>${name}</h3>
              </div>
  `;
}

giftsJson.sort(() => Math.random() - 0.5);

function generateCards(container, count) {

  for (let i = 0; i < count; i++) {
    const type = giftsJson[i].category;
    const name = giftsJson[i].name;
    let typeColor;

    switch (giftsJson[i].category) {
      case "For Work":
        typeColor = "for-work";
        break;
      case "For Health":
        typeColor = "for-health";
        break;
      case "For Harmony":
        typeColor = "for-harmony";
        break;
    }

    const typeImage = typeColor + "-image";

    createCard(container, type, typeImage, typeColor, name);
  }
}

export default generateCards;
