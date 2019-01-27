import { Quaternion, Vector3, Mesh } from 'three';
import { cubesObject } from './object';

const totalTime = 500;
const config = {
  l:["x",50]
}
const halfCicle =  90 * Math.PI / 180;
const cubes = cubesObject.cubes;
let isRotating = false;

function filterCube(cubes:Mesh[],action:string){
  return cubes.filter((cube) => {
    return cube.position[config[action.toLocaleLowerCase()][0]] === config[action.toLocaleLowerCase()][1]
  })
}

export function rotateAnimation(action:string,currentTime:number,startTime:number,lastTime:number = 0){
  if(startTime === 0){
    startTime = currentTime;
    lastTime = currentTime;
  }
  if(currentTime - startTime >= totalTime){
    currentTime = startTime + totalTime;
    isRotating = false;
  }
  switch(action){
    case "l":{
      filterCube(cubes,action).forEach((cube) => {
        rotateAroundAxisX(cube,halfCicle * (currentTime - lastTime) / totalTime)
      })
      break;
    }
    case "L":{
       filterCube(cubes,action).forEach((cube) => {
        rotateAroundAxisX(cube,-halfCicle * (currentTime - lastTime) / totalTime)
      })
      break;
    }
  }
  if(currentTime - startTime < totalTime)
  window.requestAnimationFrame((time) => {
    rotateAnimation(action,time,startTime,currentTime)
  })
}

export function rotateAroundAxisX(element:any,rad:number){
  const z0 = element.position.z;
  const y0 = element.position.y
  let quaternion = new Quaternion();
  quaternion.setFromAxisAngle(new Vector3(1,0,0),rad);
  element.quaternion.premultiply(quaternion);
  element.position.y = Math.cos(rad)* y0 - Math.sin(rad) * z0;
  element.position.z = Math.cos(rad)* z0 + Math.sin(rad) * y0;
}

function handleEvent(action:string){
  const dom = document.querySelector('.' + action);
  if(dom){
    dom.addEventListener('click',() => {
      if(isRotating){
        return;
      }
      isRotating = true;
      window.requestAnimationFrame((time) => {
        rotateAnimation(action,time,0)
      })
    },false);
  }
}


const moveActionList = ['l','L']
export default function initAtions(){
  moveActionList.forEach((action) => {
    handleEvent(action);
  })
}