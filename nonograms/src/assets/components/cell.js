export class Cell {

  element = null;
  state = 0;
  position = 0;

  constructor(parent, size = 1, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }

    cell.style.width = `${size}vmin`;
    cell.style.height = `${size}vmin`;
    parent.append(cell);

    this.element = cell;
  }

  paint() {
    if (this.state === 1) {
      if (this.element.classList.contains('painted')) this.element.classList.add('hide');

      this.element.addEventListener('animationend', (e) => {
        if(e.animationName === 'hide') {
          this.element.classList.remove('hide');
          this.element.classList.remove('painted');
        }
      })

      this.state = 0;
      return this.state;
    }

    this.element.classList.add('painted');
    this.element.classList.remove('cross');
    this.state = 1;
    return this.state;
  }

  markWithCross() {
    this.element.classList.remove('painted');
    
    if (this.element.classList.contains('cross')) this.element.classList.add('hide');
    
    this.element.addEventListener('animationend', (e) => {
      if(e.animationName === 'hide' || e.animationName === 'hide-dark') {
        this.element.classList.remove('hide');
        this.element.classList.remove('cross');
      }
    })
    
    this.element.classList.add('cross');
    if (this.state === 1) {
      this.state = 0;
      return this.state;
    }
  }
}