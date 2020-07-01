/* eslint-disable class-methods-use-this */
export default class ComponentsOfCards {
  createElement(tag, ...className) {
    const element = document.createElement(tag);
    if (className) {
      element.className = `${className}`;
    }
    return element;
  }

  getElementByClass(selector) {
    const element = document.querySelector(selector);
    return element;
  }
}
