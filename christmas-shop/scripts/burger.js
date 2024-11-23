const burgerButton = document.querySelector('.burger')
const burgerIcon = document.querySelector('.burger__line')
const menu = document.querySelector('.nav')
const menuLinks = document.querySelectorAll('.nav__list .links')
const wrapper = document.querySelector('.wrapper')

burgerButton.addEventListener('click', () => {
  burgerIcon.classList.toggle('active')
  menu.classList.toggle('active')
  console.log(menuLinks)
})

function closeMenu(width = 769) {
  if (wrapper.clientWidth > width && menu.classList.contains('active')) {
    menu.classList.remove('active')
    burgerIcon.classList.remove('active')
  }
}

window.addEventListener('resize', () => closeMenu())

menuLinks.forEach((item) => item.addEventListener('click', () => {
  if(!item.classList.contains('active')) { closeMenu(1) }
}))