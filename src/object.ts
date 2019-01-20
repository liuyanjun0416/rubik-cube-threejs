import { LineBasicMaterial, Geometry, Vector3, Line } from "three";
import { ORIGPOINT } from "./const";
import scene from "./scene";

enum axisColor {
  x = 0xff0000,
  y = 0x00ff00,
  z = 0x0000ff
}

export function initAxis(color:number,point:Vector3) {
  const material = new LineBasicMaterial({ color: color });
  const geo = new Geometry();
  geo.vertices.push(ORIGPOINT, point);
  const xaxis = new Line(geo, material);
  return xaxis;
}

export default function initObject() {
  const objects = {
    xaxis: initAxis(axisColor.x,new Vector3(300,0,0)),
    yaxis: initAxis(axisColor.y,new Vector3(0,300,0)),
    zaxis: initAxis(axisColor.z,new Vector3(0,0,300))
  };
  Object.keys(objects).forEach(k => {
    scene.add(objects[k]);
  });
}
