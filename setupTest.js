import { shallow, render, mount } from 'enzyme';
import $ from 'jquery';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.$ = $;

console.originalError = console.error;
console.error = (msg) => {
  const ignoredPatterns = [
    "Failed prop type",
    "directly into document.body is discouraged",
    "Unknown prop",
    "Accessing PropTypes",
    "Shallow",
    "createClass"
  ];
  if (ignoredPatterns.some(p => msg.includes(p))) { return; }

  return console.originalError(msg)
};
