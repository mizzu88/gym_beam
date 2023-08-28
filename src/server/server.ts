import express from 'express';
import { getProducts } from '../services/getPositions';
import { findShortestPath } from '../utils/findPath';
import { createOutput } from '../utils/createOutput';
//import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.json'; // Adjust the path to the swagger.json file

interface Position {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
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

interface ServerInput {
  products: string[];
  startingPoint: Point3D;
}

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST: string = 'localhost';


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));


// Serve the Swagger UI

app.use(express.json());


app.post('/calculatPickingOrders', async (req, res) => {
  try {
    const inputData: ServerInput = req.body;
    const { products, startingPoint } = inputData;

    console.info('Getting infos for selected products.');
    const productsInfos: Position[] = await getProducts(products);
    console.info('Selected products infos', productsInfos);

    // Creating array of positions for selected products
    const newPositionArray: Point3D[] = productsInfos.map(item => ({
      x: item.x,
      y: item.y,
      z: item.z,
    }));

    // Add starting position into position array
    const positionWithInitial: Point3D[] = [ startingPoint, ...newPositionArray ];

    // Finding shortest way implement Knn algorithm
    const { path, length } = findShortestPath(positionWithInitial);

    console.info('Shortest path in sorted array of positions:', path);
    console.info('Distance traveled:', length);

    // Creating output object
    const output: Output = createOutput(path, productsInfos, length);

    console.info('Created output object', output);

    const response = {
      status: 200,
      message: 'Calculation successful',
      data: {
        ...output,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      const response = {
        status: 400,
        message: 'Invalid JSON data',
        error: error.message,
      };
      res.status(400).json(response);
    } else {
      const response = {
        status: 500,
        message: 'Internal Server Error',
      };
      res.status(500).json(response);
    }
  }
});

app.use((req, res) => {
  const response = {
    status: 404,
    message: 'Not Found',
  };
  res.status(404).json(response);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Export the server instance to be used elsewhere if needed
export default app;