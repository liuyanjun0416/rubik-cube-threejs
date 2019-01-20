import { PerspectiveCamera } from "three";
import {WIDTH,HEIGHT, ORIGPOINT} from './const';
const camera = (function initCamera(){
    const camera = new PerspectiveCamera(45,WIDTH/HEIGHT,0.1,1000);
    camera.position.set(200,400,600);
    camera.up.set(0,1,0);
    camera.lookAt(ORIGPOINT);
    return camera;
})()

export default camera;