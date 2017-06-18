class AbstractView {
  get template() {
  }
  render() {
    return this.create(this.template);
  }
  bind() {
  }
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
  create(template) {
    return new DOMParser().parseFromString(template, `text/html`).body.firstChild;
  }
}

export default AbstractView;
