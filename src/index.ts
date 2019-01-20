import * as THREE from "three";

let scene:THREE.Scene;
let camera:THREE.PerspectiveCamera;
let renderer:THREE.WebGLRenderer;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerHeight / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
}

window.onload=function(){
    init();
    render();

}

function render(){
    renderer.clear();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
}
