function render(domElement) {
  let app = document.querySelector(`.app`);
  let main = app.querySelector(`.main`);
  main.innerHTML = domElement;
}

export default render;
