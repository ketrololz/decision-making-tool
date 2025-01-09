export function createElem(options) {
  const { tag = 'div', text = '', classes, id } = options;
  const elem = document.createElement(tag);

  elem.textContent = text;
  
  if (id) {
    elem.id = id;
  }

  if (classes) {
    elem.classList.add(...classes);
  }

  return elem;
}