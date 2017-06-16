export default (targetElement, domElement) => {
  targetElement.innerHTML = ``;
  targetElement.appendChild(domElement);
};
