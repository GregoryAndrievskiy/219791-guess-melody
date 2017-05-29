function elementCreator(template) {
  return new DOMParser().parseFromString(template, `text/html`).body.firstChild;
}

export default elementCreator;
