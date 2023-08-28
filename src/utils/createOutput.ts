import fs from 'fs';
interface Position {
  x: number;
  y: number;
  z: number;
}

interface SecondArrayItem {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

interface PickingItem {
  productId: string;
  positionId: string;
}

interface Output {
  pickingOrder: PickingItem[];
  distance: number;
}

export function createOutput(
  firstArray: Position[],
  secondArray: SecondArrayItem[],
  distance: number
): Output {
  const pickingOrder: PickingItem[] = [];

  firstArray.forEach((firstItem) => {
    const matchingSecondItem = secondArray.find(
      (secondItem) =>
        secondItem.x === firstItem.x &&
        secondItem.y === firstItem.y &&
        secondItem.z === firstItem.z
    );

    if (matchingSecondItem) {
      pickingOrder.push({
        productId: matchingSecondItem.productId,
        positionId: matchingSecondItem.positionId,
      });
    }
  });

  return { pickingOrder, distance };
}
export function createFolder(folderName: string): void {
  try {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created successfully.`);
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
  }
}

