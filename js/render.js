function render(domElement) {
  const main = document.querySelector(`.app .main`);
  main.innerHTML = ``;
  main.appendChild(domElement);
}

export default render;
