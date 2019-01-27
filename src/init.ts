import initObject from "./object";
import renderer from "./renderer";
import initAtions from './actions';

export default function init() {
  initObject();
  initAtions();
  const main = document.querySelector(".main");
  if (main) {
    main.appendChild(renderer.domElement);
  }
}
