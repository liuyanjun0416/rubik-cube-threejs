import { LineBasicMaterial, Geometry, Vector3, Line } from 'three';
import { ORIGPOINT } from './const';
import scene from './scene';

enum axisColor {
    x = 0xff0000,
    y = 0x00ff00,
    z = 0x0000ff
}

export function initXaxis(){
    const xmaterial = new LineBasicMaterial({color:axisColor.x})
    const xgeo = new Geometry();
    xgeo.vertices.push(ORIGPOINT,new Vector3(300,0,0));
    const xaxis = new Line(xgeo,xmaterial);
    return xaxis;
}

export function initYaxis(){
    const xmaterial = new LineBasicMaterial({color:axisColor.y})
    const xgeo = new Geometry();
    xgeo.vertices.push(ORIGPOINT,new Vector3(0,300,0));
    const xaxis = new Line(xgeo,xmaterial);
    return xaxis;
}

export function initZaxis(){
    const xmaterial = new LineBasicMaterial({color:axisColor.z})
    const xgeo = new Geometry();
    xgeo.vertices.push(ORIGPOINT,new Vector3(0,0,300));
    const xaxis = new Line(xgeo,xmaterial);
    return xaxis;
}

export default function initObject(){
     const objects = {
        xaxis:initXaxis(),
        yaxis:initYaxis(),
        zaxis:initZaxis()
     }
     Object.keys(objects).forEach((k) => {
         scene.add(objects[k])
     })
}
