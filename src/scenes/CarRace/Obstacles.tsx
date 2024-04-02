import { Vector3 } from "@react-three/fiber";
import {
  Ambulance,
  Bus,
  Firetruck,
  Limousine,
  Taxi,
  Van,
} from "../../FBXModelLoader";

const components = [
  <Van />,
  <Firetruck />,
  <Limousine />,
  <Taxi />,
  <Bus />,
  <Ambulance />,
];
const getRandomComponent = () => {
  const randomIndex = Math.floor(Math.random() * components.length);
  return components[randomIndex];
};

export const Obstacle1 = () => {


    const positions: Vector3[] = [
        [-0.45, -0.34, -4],
        [0.45, -0.34, -4],
        [0.45, -0.34, -1],
        [-0.45, -0.34, 3.8],
        [0.45, -0.34, 3.8],
        [-0.16, -0.34, -2],
        [0.14, -0.34, 0],
        [-0.16, -0.34, 3.8],
        [0.45, -0.34, 3],
    ];

    return (
        <>
            {positions.map((position, index) => (
                <mesh
                    key={index}
                    position={position}
                    scale={[0.0006, 0.0006, 0.0006]}
                >
                    {getRandomComponent()}
                </mesh>
            ))}
        </>
    );
};
export const Obstacle2 = () => {

    const positions: Vector3[] = [
        [0.45, -0.34, 3],
        [-0.45, -0.34, 3],
        [-0.45, -0.34, 2],
        [-0.45, -0.34, 1],
        [-0.16, -0.34, 2],
        [-0.16, -0.34, 3],
        [0.14, -0.34, 0],
        [0.14, -0.34, -4],
        [0.45, -0.34, -4],
        [-0.45, -0.34, -4],
    ];

    return (
        <>
            {positions.map((position, index) => (
                <mesh
                    key={index}
                    position={position}
                    scale={[0.0006, 0.0006, 0.0006]}
                >
                    {getRandomComponent()}
                </mesh>
            ))}
        </>
    );
};
export const Obstacle3 = () => {

    const positions: Vector3[] = [
        [-0.16, -0.34, 3.8],
        [-0.16, -0.34, 2.8],
        [-0.16, -0.34, 1.8],
        [-0.16, -0.34, 0],
        [0.45, -0.34, 3.8],
        [0.45, -0.34, 2.8],
        [0.45, -0.34, 1.8],
        [0.45, -0.34, 0],
        [0.14, -0.34, -3.8],
        [-0.45, -0.34, -3.8],
    ];

    return (
        <>
            {positions.map((position, index) => (
                <mesh
                    key={index}
                    position={position}
                    scale={[0.0006, 0.0006, 0.0006]}
                >
                    {getRandomComponent()}
                </mesh>
            ))}
        </>
    );
};

export const Obstacle4 = () => {
    const positions: Vector3[] = [
        [0.14, -0.34, 3.8],
        [-0.14, -0.34, 3.8],
        [0.45, -0.34, 3.8],
        [-0.45, -0.34, 1.5],
        [-0.45, -0.34, 0],
        [-0.45, -0.34, -2],
        [-0.14, -0.34, 0.5],
        [0.14, -0.34, -1.0],
        [0.45, -0.34, -4],
        [-0.16, -0.34, -4],
        [-0.45, -0.34, -4],
    ];

    return (
        <>
            {positions.map((position, index) => (
                <mesh
                    key={index}
                    position={position}
                    scale={[0.0006, 0.0006, 0.0006]}
                >
                    {getRandomComponent()}
                </mesh>
            ))}
        </>
    );
};

export const Obstacle5 = () => {


    const positions: Vector3[] = [
        [0.45, -0.34, 3.8],
        [0.45, -0.34, 3],
        [-0.45, -0.34, 3.8],
        [0.14, -0.34, 3],
        [-0.14, -0.34, 1.5],
        [-0.45, -0.34, 1.5],
        [-0.45, -0.34, 0],
        [-0.14, -0.34, 0],
        [-0.14, -0.34, -4],
        [0.14, -0.34, -3.3],
        [0.45, -0.34, -3],
    ];

    return (
        <>
            {positions.map((position, index) => (
                <mesh
                    key={index}
                    position={position}
                    scale={[0.0006, 0.0006, 0.0006]}
                >
                    {getRandomComponent()}
                </mesh>
            ))}
        </>
    );
};
export const Obstacle6 = () => {
  const positions: Vector3[] = [
    [-0.45, -0.34, 3.8],
    [-0.45, -0.34, 3.0],
    [-0.16, -0.34, 3.4],
    [0.14, -0.34, 3.1],
    [0.45, -0.34, 1.2],
    [0.45, -0.34, 0.5],
    [0.14, -0.34, 0],
    [-0.14, -0.34, -0.8],
    [-0.45, -0.34, -3.2],
    [-0.16, -0.34, -3.5],
    [0.16, -0.34, -4],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <mesh key={index} position={position} scale={[0.0006, 0.0006, 0.0006]}>
          {getRandomComponent()}
        </mesh>
      ))}
    </>
  );
};

export const Obstacle7 = () => {
  const positions: Vector3[] = [
    [-0.45, -0.34, 3.8],
    [-0.45, -0.34, 1.5],
    [-0.16, -0.34, 3.8],
    [-0.16, -0.34, 3],
    [0.16, -0.34, 0.5],
    [0.16, -0.34, 2],
    [0.45, -0.34, 4],
    [0.45, -0.34, -2.5],
    [0.14, -0.34, -4],
    [-0.45, -0.34, -3.8],
    [-0.45, -0.34, -2.3],
    [-0.45, -0.34, -1],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <mesh key={index} position={position} scale={[0.0006, 0.0006, 0.0006]}>
          {getRandomComponent()}
        </mesh>
      ))}
    </>
  );
};
