import fs from 'fs';

interface PickingItem {
  productId: string;
  positionId: string;
}

interface Output {
  pickingOrder: PickingItem[];
  distance: number;
}

export function createJsonFile(jsonObject: Output, filePath: string): void {
  const jsonString = JSON.stringify(jsonObject, null, 2);

  fs.writeFileSync(filePath, jsonString);

  console.log(`JSON object has been written to ${filePath}`);
}



