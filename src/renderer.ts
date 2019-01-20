import {WebGLRenderer} from "three";
import { WIDTH, HEIGHT, BGCOLOR } from './const';

const renderer = (function initRenderer(){
    const renderer = new WebGLRenderer({
        antialias:true
    })
    renderer.setSize(WIDTH,HEIGHT);

    renderer.setClearColor(BGCOLOR,1.0);

    return renderer;
})();

export default renderer;