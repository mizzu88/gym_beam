import { getUsers } from './services/getPositions';
import { findShortestPath } from './utils/findPath';
import { createOutput } from './utils/createOutput';
import { createJsonFile } from './utils/createJsonFile';
interface Position {
  positionId:string;
  x: number;
  y: number;
  z: number;
  productId:string;
  quantity: number

}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface PickingItem {
  productId: string;
  positionId: string;
}

interface Output {
  pickingOrder: PickingItem[];
  distance: number;
}
/*
  interface pathResponse {
    path: { x: number; y: number; z: number }[]
    length: number;
  }
  */
const  users: string[] = [ 'product-1', 'product-2' ];
const initPosition = { x: 0, y: 0, z: 0 };
const positions: Position[] = await getUsers(users);
const newPositionArray: Point3D[] = positions.map(item => ({
  x: item.x,
  y: item.y,
  z: item.z,
}));

const positionWithInitial:Point3D[] = [ initPosition,...newPositionArray ];



const { path, length }= findShortestPath(positionWithInitial);
console.log('positions', path);
const output:Output = createOutput(path,positions,length);
console.log('output',output);
const outputPath:string = 'src/output/outputJson.json';
createJsonFile(output,outputPath);


