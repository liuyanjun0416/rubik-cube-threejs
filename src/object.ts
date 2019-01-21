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

const cubeConfig = {
  num: 6
};

const colorCodes = {
  R: 0xd92b2c,
  G: 0x26b143,
  Y: 0xe6e621,
  O: 0xff7800,
  B: 0x2f55cf,
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

export function initRubikCube(num:number) {
  let cubes = [];
  let borders = [];
  const len = cubeParams.length;
  for (let x = 0; x < num; x++) {
    for (let y = 0; y < num; y++) {
      for (let z = 0; z < num; z++) {
        const cube = initCube();
        cube.position.x = (x - (num/2 - 0.5)) * len;
        cube.position.y = (y - (num/2 - 0.5)) * len;
        cube.position.z = (z - (num/2 - 0.5)) * len;
        cubes.push(cube);
        const border = new BoxHelper(cube, new Color(0x000000));
        borders.push(border);
      }
    }
  }
  return { cubes, borders };
}

export default function initObject() {
  scene.add(initAxis());
  const pocketCube = initRubikCube(cubeConfig.num);
  pocketCube.cubes.forEach((cubes, i) => {
    scene.add(cubes);
    scene.add(pocketCube.borders[i]);
  });
}
