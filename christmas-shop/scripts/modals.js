const giftCardsArr = document.querySelectorAll('.gift-card')
const modalWindow = document.querySelector('.modal-cards')
const closeButton = document.querySelector('.close-button')

console.log(giftCardsArr)

function openModal(card) {
  modalWindow.classList.remove('hidden')
}

function closeModal() {
  modalWindow.classList.add('hidden')
}

// giftCardsArr.forEach(item => item.addEventListener('click', () => openModal(item.childNodes[3].childNodes[3])))
giftCardsArr.forEach(item => item.addEventListener('click', () => openModal(item)))

closeButton.addEventListener('click', () => closeModal())
