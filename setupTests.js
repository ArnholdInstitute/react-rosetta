// setup a requestAnimationFrame polyfill,
// required by react 16
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};
  
// Setup enzyme's react adapter
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });
