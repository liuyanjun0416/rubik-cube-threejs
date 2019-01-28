import { Quaternion, Vector3, Mesh } from "three";
import { cubesObject } from "./object";

const totalTime = 500;
const config = {
  l: ["x", -50],
  r: ["x", 50],
  u: ["y", 50],
  d: ["y", -50],
  f: ["z",50],
  b:["z",-50]
};
const halfCicle = (90 * Math.PI) / 180;

let isRotating = false;

function filterCube(cubes: Mesh[], action: string) {
  return cubes.filter(cube => {
    return (
      Math.round(cube.position[config[action.toLocaleLowerCase()][0]]) ===
      config[action.toLocaleLowerCase()][1]
    );
  });
}

export function rotateAnimation(
  action: string,
  currentTime: number,
  startTime: number,
  lastTime: number = 0
) {
  if (startTime === 0) {
    startTime = currentTime;
    lastTime = currentTime;
  }
  if (currentTime - startTime >= totalTime) {
    currentTime = startTime + totalTime;
    isRotating = false;
  }
  switch (action) {
    case "R":
    case "l": {
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisX(
          cube,
          (-halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
    case "r":
    case "L": {
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisX(
          cube,
          (halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
    case "d":
    case "U": {
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisY(
          cube,
          (-halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
    case "D":
    case "u": {
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisY(
          cube,
          (halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
    case 'B':
    case 'f':{
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisZ(
          cube,
          (halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
    case 'b':
    case 'F':{
      filterCube(cubesObject.cubes, action).forEach(cube => {
        rotateAroundAxisZ(
          cube,
          (-halfCicle * (currentTime - lastTime)) / totalTime
        );
      });
      break;
    }
  }
  if (currentTime - startTime < totalTime)
    window.requestAnimationFrame(time => {
      rotateAnimation(action, time, startTime, currentTime);
    });
}

export function rotateAroundAxisX(element: Mesh, rad: number) {
  const z0 = element.position.z;
  const y0 = element.position.y;
  let quaternion = new Quaternion();
  quaternion.setFromAxisAngle(new Vector3(1, 0, 0), rad);
  element.quaternion.premultiply(quaternion);
  element.position.y = Math.cos(rad) * y0 - Math.sin(rad) * z0;
  element.position.z = Math.cos(rad) * z0 + Math.sin(rad) * y0;
}

export function rotateAroundAxisY(element: Mesh, rad: number) {
  const x0 = element.position.x;
  const z0 = element.position.z;
  let quaternion = new Quaternion();
  quaternion.setFromAxisAngle(new Vector3(0, 1, 0), rad);
  element.quaternion.premultiply(quaternion);
  element.position.x = Math.cos(rad) * x0 + Math.sin(rad) * z0;
  element.position.z = Math.cos(rad) * z0 - Math.sin(rad) * x0;
}

export function rotateAroundAxisZ(element: Mesh, rad: number) {
  const x0 = element.position.x;
  const y0 = element.position.y;
  let quaternion = new Quaternion();
  quaternion.setFromAxisAngle(new Vector3(0, 0, 1), rad);
  element.quaternion.premultiply(quaternion);
  element.position.x = Math.cos(rad) * x0 - Math.sin(rad) * y0;
  element.position.y = Math.cos(rad) * y0 + Math.sin(rad) * x0;
}

function rotate(action: string) {
  if (isRotating) {
    return;
  }
  isRotating = true;
  window.requestAnimationFrame(time => {
    rotateAnimation(action, time, 0);
  });
}

function handleEvent(action: string) {
  const dom = document.querySelector("." + action);
  if (dom) {
    dom.addEventListener(
      "click",
      () => {
        rotate(action);
      },
      false
    );
  }
}

const moveActionList = ["l", "L", "r", "R", "u", "U", "d", "D","f","F","B","b"];
export default function initAtions() {
  moveActionList.forEach(action => {
    handleEvent(action);
  });
}
