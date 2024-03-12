import { Camera, useFrame } from "@react-three/fiber";
import { Ref, RefObject, createElement, useEffect, useRef, useState } from "react";
import { MainRoad, MainRoadTwo, PickupTruck } from "../../GLTFModelsLoader";
import { Box3, BufferGeometry, Group, Material, Mesh, NormalBufferAttributes, Object3D, Object3DEventMap, Vector3 } from "three";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import {
  Obstacle1,
  Obstacle2,
  Obstacle3,
  Obstacle4,
  Obstacle5,
  Obstacle6,
  Obstacle7,
} from "./Obstacles";

export function RaceScene() {
  const [roadSizeOnZAxis, setRoadSizeOnZAxis] = useState(0);
  const [isHeadStart, setIsHeadStart] = useState(false);
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);

  let tweenLeft: Tween<Vector3>;
  let tweenRight: Tween<Vector3>;

  let activeObstacleOne = useRef<Group<Object3DEventMap>>(null);
  let activeObstacleTwo = useRef<Group<Object3DEventMap>>(null);
  

  let playerBoxCollider = new Box3(new Vector3(), new Vector3());
  
let obstacleOneBoxCollider= new Box3(new Vector3(), new Vector3());
let obstacleTwoBoxCollider= new Box3(new Vector3(), new Vector3());


  const obstacleRefs = Array.from({ length: 7 }, () => useRef<Group>(null));

  const getRandomPooledObstacle = () => {
    const availableItems = obstacleRefs.filter(
      (item) => !item.current?.visible
    );
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return availableItems[randomIndex];
  };

  const spawnObstacleOne = () => {
    const activeObstacle = getRandomPooledObstacle();
    activeObstacle.current!.position.z = -14;
    activeObstacle.current!.visible = true;

    activeObstacleOne = activeObstacle;
   
  };

  const spawnObstacleTwo = () => {
      const activeObstacle = getRandomPooledObstacle();
      activeObstacle.current!.position.z = activeObstacleOne?.current!.position.z - 12
      activeObstacle.current!.visible = true;
    activeObstacleTwo = activeObstacle
     
   
  };

  const moveObstacleOne = (delta: number) => {
    if (activeObstacleOne?.current) {
      if ((activeObstacleOne.current.visible = true)) {
        activeObstacleOne.current.position.z += 5 * delta;
        if (activeObstacleOne.current.position.z > 9) {
          activeObstacleOne.current.position.z = -14;
          activeObstacleOne.current.visible = false;
          spawnObstacleOne();
        }
      }
    }
  };

  const moveObstacleTwo = (delta: number) => {
    if (activeObstacleTwo?.current) {
      if ((activeObstacleTwo.current.visible = true)) {
        activeObstacleTwo.current.position.z += 5 * delta;
        if (activeObstacleTwo.current.position.z > 9) {
          activeObstacleTwo.current.position.z = -14;
          activeObstacleTwo.current.visible = false;
          spawnObstacleTwo();
        }
      }
    }
  };

  const gameOver = () => {
    console.log('gameOver')
  }

  const detectCollisionWithObstacleOne = () => {
    if (activeObstacleOne.current) {
       for (let i = 0; i < activeObstacleOne.current!.children.length; i += 1) {
      obstacleOneBoxCollider.setFromObject(activeObstacleOne.current.children[i]);
      if (playerBoxCollider.intersectsBox(obstacleOneBoxCollider)) {
        gameOver();
      }
    }
    }
  }
  const detectCollisionWithObstacleTwo = () => {
    if (activeObstacleTwo.current) {
       for (let i = 0; i < activeObstacleTwo.current!.children.length; i += 1) {
      obstacleTwoBoxCollider.setFromObject(activeObstacleTwo.current.children[i]);
      if (playerBoxCollider.intersectsBox(obstacleTwoBoxCollider)) {
        gameOver();
      }
    }
    }
  }
  useEffect(() => {
   // playerBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleOneBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleTwoBoxCollider = new Box3(new Vector3(), new Vector3());
    const timer = setTimeout(() => {
      spawnObstacleOne();
      spawnObstacleTwo();

      setIsHeadStart(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
    pickupTruckRef.current?.scale.set(0.07, 0.07, 0.07);
    pickupTruckRef.current?.position.set(0.14, -0.33, 3.8);

    if (mainRoadRef.current && mainRoadTwoRef.current) {
      const mainRoadboundingBox = new Box3().setFromObject(mainRoadRef.current);
      setRoadSizeOnZAxis(
        mainRoadboundingBox.max.z - mainRoadboundingBox.min.z - 0.01
      );
      mainRoadTwoRef.current.position.set(0, -0.4, -15);
    }
  }, []);

  tweenLeft = new TWEEN.Tween(pickupTruckRef.current?.position);
  tweenRight = new TWEEN.Tween(pickupTruckRef.current?.position);

  const move = (camera: Camera, direction: "left" | "right") => {
    const isLeft = direction === "left";
    const position = pickupTruckRef.current!.position.x;
    const limit = isLeft ? -0.46 : 0.44;
    if (position !== limit) {
      const tweenCamera = new Tween(camera.position)
        .to({ x: camera.position.x + (isLeft ? -0.21 : 0.21) }, 200)
        .easing(TWEEN.Easing.Quadratic.Out);

      pickupTruckRef.current!.rotation.y =
        (isLeft ? -165 : 165) * (Math.PI / 180);
      const resetRotation = new TWEEN.Tween(pickupTruckRef.current!.rotation)
        .to(
          {
            y:
              pickupTruckRef.current!.rotation.y +
              (isLeft ? -15 : 15) * (Math.PI / 180),
          },
          50
        )
        .easing(TWEEN.Easing.Quadratic.Out);

      const tween = new TWEEN.Tween(pickupTruckRef.current!.position)
        .to({ x: position + (isLeft ? -0.3 : 0.3) }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          resetRotation.start();
          pickupTruckRef.current!.position.x = Number(
            pickupTruckRef.current!.position.x.toFixed(2)
          );
        })
        .onUpdate(() => {
          if (isLeft ? position < limit : position > limit) {
            pickupTruckRef.current!.position.x = limit;
          }
          if (isLeft ? camera.position.x < -0.42 : camera.position.x > 0.21) {
            camera.position.x = isLeft ? -0.42 : 0.21;
          }
        });

      if ((isLeft ? tweenRight : tweenLeft).isPlaying()) {
        (isLeft ? tweenRight : tweenLeft).stop();
      }

      tween.start();
      tweenCamera.start();
    }
  };

  useFrame((state, delta) => {
    TWEEN.update();
    document.onkeydown = (e) => {
      if (e.key === " ") {
        if (state.clock.running) {
          state.clock.stop();
        } else {
          state.clock.start();
        }
      }
      if (e.key === "ArrowLeft") {
        move(state.camera, "left");
      }
      if (e.key === "ArrowRight") {
        move(state.camera, "right");
      }
    };

    if (mainRoadRef.current) {
      mainRoadRef.current.position.z += 5 * delta;
      if (mainRoadRef.current.position.z > 19.5) {
        mainRoadRef.current.position.z =
          mainRoadTwoRef.current!.position.z - roadSizeOnZAxis;
      }
    }
    if (mainRoadTwoRef.current) {
      mainRoadTwoRef.current.position.z += 5 * delta;
      if (mainRoadTwoRef.current.position.z > 19.5) {
        mainRoadTwoRef.current.position.z =
          mainRoadRef.current!.position.z - roadSizeOnZAxis;
      }
    }
     if (pickupTruckRef.current) {
           playerBoxCollider.setFromObject(pickupTruckRef.current);
    } 

    if (isHeadStart) {
      moveObstacleOne(delta);
      moveObstacleTwo(delta);
      detectCollisionWithObstacleOne();
      detectCollisionWithObstacleTwo();
    }
   

    // moveVisibleObstacles(delta);
    // hideObstacles();
    //spawnObstacles();
  });

  return (
    <>
      <mesh ref={mainRoadRef}>
        <MainRoad />
      </mesh>
      <mesh ref={mainRoadTwoRef}>
        <MainRoadTwo />
      </mesh>
      <mesh ref={pickupTruckRef} rotation={[0, 180 * (Math.PI / 180), 0]}>
        <PickupTruck />
      </mesh>
      <group ref={activeObstacleOne}>
        
      </group>
      <group ref={activeObstacleTwo}>
        
</group>
      {obstacleRefs.map((ref, i) => (
        <group ref={ref} position={[0, 0, -14]} visible={false} key={i}>
          {createElement(
            [
              Obstacle1,
              Obstacle2,
              Obstacle3,
              Obstacle4,
              Obstacle5,
              Obstacle6,
              Obstacle7,
            ][i]
          )}
        </group>
      ))}

 {/* <mesh ref={playerBoxCollider}
     
     
        scale={[0.1, 0.1, 0.1]}
        position={[0,0,0]}
     >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>  */}
    </>
  );
}