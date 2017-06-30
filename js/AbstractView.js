class AbstractView {
  get template() {
  }
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
  render() {
    return this.create(this.template);
  }
  create() {
    return new DOMParser().parseFromString(this.template, `text/html`).body.firstChild;
  }
  bind() {
  }
}

export default AbstractView;
