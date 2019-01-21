import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  FaceColors,
  MeshBasicMaterial,
  BoxHelper,
  Color
} from "three";
import scene from "./scene";

const cubeParams = {
  length: 50
};

const pockerCubeConfig = {
  num: 2
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
  const len = cubeParams.length;
  const cubeGeometry = new BoxGeometry(len, len, len);

  let mats: MeshBasicMaterial[] = [];

  Array(6)
    .fill(0)
    .forEach((face, i) => {
      const material = new MeshBasicMaterial({
        color: colorCodes[faceColor[i]],
        vertexColors: FaceColors
      });
      mats.push(material);
    });
  const cube = new Mesh(cubeGeometry, mats);
  return cube;
}


export function initPocketCube() {
  let cubes = [];
  let borders = [];
  const num = pockerCubeConfig.num;
  const len = cubeParams.length;
  for (let i = 0; i < num; i++) {
    for (var j = 0; j < num * num; j++) {
      const cube = initCube();
      cube.position.x = - len / 2 + (j % 2 * len)
      cube.position.y = -len / 2 + Math.floor(j / 2) * len
      cube.position.z = len / 2 - i * len
      cubes.push(cube);
      const border = new BoxHelper(cube, new Color(0x000000));
      borders.push(border);
    }
  }
  return {cubes,borders};
}

export default function initObject() {
  scene.add(initAxis());
  const pocketCube = initPocketCube();
  pocketCube.cubes.forEach((cubes,i) => {
    scene.add(cubes);
    scene.add(pocketCube.borders[i]);
  })
}
