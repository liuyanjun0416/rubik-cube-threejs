import initObject from "./object";
import renderer from "./renderer";

export default function init() {
  initObject();
  document.body.appendChild(renderer.domElement);
}
