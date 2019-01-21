import renderer from "./renderer";
import scene from "./scene";
import camera from "./camera";
import init from "./init";
import controls from './controls';

window.onload = function() {
  init();
  render();
};

function render() {
  renderer.clear();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}

if (module.hot) {
  module.hot.accept(function() {
    window.location.reload();
  })
}