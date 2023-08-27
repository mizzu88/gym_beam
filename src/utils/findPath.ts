interface Point3D {
  x: number;
  y: number;
  z: number;
}

function calculateDistance(point1: Point3D, point2: Point3D): number {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = point1.z - point2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findNearestNeighbor(currentPoint: Point3D, unvisitedPoints: Point3D[]): Point3D | null {
  let minDistance = Infinity;
  let nearestPoint: Point3D | null = null;

  for (const point of unvisitedPoints) {
    const distance = calculateDistance(currentPoint, point);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = point;
    }
  }

  return nearestPoint;
}

export function findShortestPath(points: Point3D[]): { path: Point3D[], length: number } {
  const startPoint: Point3D = points[0];
  const unvisitedPoints: Point3D[] = points.slice(1); // Exclude the starting point
  const path: Point3D[] = [ startPoint ];
  let totalLength = 0;

  while (unvisitedPoints.length > 0) {
    const nearestPoint = findNearestNeighbor(path[path.length - 1], unvisitedPoints);
    if (nearestPoint) {
      totalLength += calculateDistance(path[path.length - 1], nearestPoint);
      path.push(nearestPoint);
      unvisitedPoints.splice(unvisitedPoints.indexOf(nearestPoint), 1);
    }
  }


  return { path, length: totalLength };
}


