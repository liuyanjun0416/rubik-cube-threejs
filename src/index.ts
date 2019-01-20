import renderer from "./renderer";
import scene from './scene';
import camera from './camera';
import init from './init';


window.onload = function() {
  init();
  render();
};

function render() {
  renderer.clear();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}
