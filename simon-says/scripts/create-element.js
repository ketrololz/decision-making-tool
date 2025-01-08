export function createElem(options) {
  const { tag = 'div', text = '', classes = [] } = options;
  const elem = document.createElement(tag);

  elem.textContent = text;

  if (classes) {
    elem.classList.add(...classes);
  }

  return elem;
}