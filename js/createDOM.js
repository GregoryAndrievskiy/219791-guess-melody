function elementCreator(template) {
  let content = document.createElement(`div`);
  content.innerHTML = template;
  return content.innerHTML;
}

export default elementCreator;
