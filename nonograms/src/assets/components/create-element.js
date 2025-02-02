export function createElem(options) {
  const {
    tag = 'div', parent, classes, text = ''
  } = options;
  const elem = document.createElement(tag);

  if (classes) {
    elem.classList.add(...classes);
  }

  if (parent) {
    parent.appendChild(elem);
  }

  elem.textContent = text;

  return elem;
}
