import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  FaceColors,
  MeshBasicMaterial
} from "three";
import scene from "./scene";

const cubeParams = {
  lenth: 50
};

const colorCodes = {
  R: 0xff0000,
  G: 0x008000,
  Y: 0xffff00,
  O: 0xffa500,
  B: 0x0000ff,
  W: 0xffffff,
  P: 0xffc0cb, //pink
  Pu: 0x9400d3, //紫色
  Ru: 0xa55d35, //
  inside: 0xffffff
};

const faceColor = ["O", "R", "Y", "W", "G", "B"];

export function initAxis() {
  const axesHelper = new AxesHelper(300);
  return axesHelper;
}

export function initCube() {
  const cubeGeometry = new BoxGeometry(
    cubeParams.lenth,
    cubeParams.lenth,
    cubeParams.lenth
  );

  let mats: MeshBasicMaterial[] = [];

  Array(6).fill(0).map((face, i) => {
    const material = new MeshBasicMaterial({
      color: colorCodes[faceColor[i]],
      vertexColors: FaceColors
    });
    mats.push(material);
  });
  const cube = new Mesh(cubeGeometry, mats);
  return cube;
}

export default function initObject() {
  scene.add(initAxis());
  scene.add(initCube());
}
