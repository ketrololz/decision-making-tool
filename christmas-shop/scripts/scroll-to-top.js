const scrollBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.innerWidth < 769) {
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none'
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 769) {
    scrollBtn.style.display = 'none'
  } else if (window.scrollY > 300) {
    scrollBtn.style.display = 'flex'
  }
})