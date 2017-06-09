export default (template) => {
  return new DOMParser().parseFromString(template, `text/html`).body.firstChild;
};
