// 👇️ only necessary if running in Node.js version < 17.5
// (Remove this line if running in the browser)
import fetch from 'node-fetch';

interface Position {
  positionId:string;
  x: number;
  y: number;
  z: number;
  productId:string;
  quantity: number

}

export async function getProducts(users: string[]): Promise<Position[]> {
  try {
    const responseArray = await Promise.all(
      users.map(async (user) => {
        const response = await fetch(`https://dev.aux.boxpi.com/case-study/products/${user}/positions`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z',
          },
        });
        return (await response.json()) as Position[];
      })
    );

    const result: Position[] = responseArray.flat();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      throw error;
    } else {
      console.log('unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
}