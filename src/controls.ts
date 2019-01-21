import camera from './camera';
import { OrbitControls } from 'three-orbitcontrols-ts';

const controls = (function initControls(){
  const orbitControls = new OrbitControls(camera);
  return orbitControls;
})();

export default controls