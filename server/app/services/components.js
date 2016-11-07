import config from '../../config';

const defaultComponents = require('../components');

const themeComponents = require(`${config.theme.themePath}/components`);

const combinedComponents = Object.assign({}, defaultComponents, themeComponents);

export function renderComponent(component) {
  if (Object.keys(combinedComponents).includes(component.name)) {
    return combinedComponents[component.name].render(component);
  }

  return null;
}

export function renderComponents(components = []) {
  const renderedComponents = [];
  for (const component of components) {
    renderedComponents.push(renderComponent(component));
  }
}
