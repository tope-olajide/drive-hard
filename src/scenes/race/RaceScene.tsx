import { Camera, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MainRoad, MainRoadTwo, PickupTruck } from "../../GLTFModelsLoader";
import { Box3, Group, Mesh, Vector3 } from "three";

import TWEEN, { Tween } from "@tweenjs/tween.js";
import {
  Ambulance,
  Bus,
  Firetruck,
  Limousine,
  Taxi,
  Van,
} from "../../FBXModelLoader";

export function RaceScene() {
  const [roadSizeOnZAxis, setRoadSizeOnZAxis] = useState(0);

  //  const roadBox = new Box3().setFromObject(road.scene);
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);
  const taxiRef = useRef<Mesh>(null);
  const limoRef = useRef<Mesh>(null);
  const firetruckRef = useRef<Mesh>(null);
  const vanRef = useRef<Mesh>(null);
  const busRef = useRef<Mesh>(null);
  const ambulanceRef = useRef<Mesh>(null);

  let tweenLeft: Tween<Vector3>;
  let tweenRight: Tween<Vector3>;

  const obstacle1Ref = useRef<Group>(null);
  const obstacle2Ref = useRef<Group>(null);

  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);

    pickupTruckRef.current?.scale.set(0.07, 0.07, 0.07);
    pickupTruckRef.current?.position.set(0.14, -0.33, 3.8);
    //pickupTruckRef.current?.rotateY(180 * (Math.PI / 180));

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
  const moveLeft = (camera: Camera) => {
    if (pickupTruckRef.current!.position.x !== -0.46) {
      const tweenCameraLeft = new Tween(camera.position)
        .to({ x: camera.position.x - 0.21 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out);

      pickupTruckRef.current!.rotation.y = -165 * (Math.PI / 180);
      const resetRotation = new TWEEN.Tween(pickupTruckRef.current!.rotation)
        .to(
          { y: pickupTruckRef.current!.rotation.y - 15 * (Math.PI / 180) },
          50
        )
        .easing(TWEEN.Easing.Quadratic.Out);

      tweenLeft = new TWEEN.Tween(pickupTruckRef.current!.position)
        .to({ x: pickupTruckRef.current!.position.x - 0.3 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          resetRotation.start();
          pickupTruckRef.current!.position.x = Number(
            pickupTruckRef.current!.position.x.toFixed(2)
          );
        })
        .onUpdate(() => {
          if (pickupTruckRef.current!.position.x < -0.46) {
            pickupTruckRef.current!.position.x = -0.46;
          }

          if (camera.position.x < -0.42) {
            camera.position.x = -0.42;
          }
        });
      if (tweenRight.isPlaying()) {
        tweenRight.stop();
      }

      tweenLeft.start();
      tweenCameraLeft.start();
    }
  };

  const moveRight = (camera: Camera) => {
    if (pickupTruckRef.current!.position.x !== 0.44) {
      pickupTruckRef.current!.rotation.y = 165 * (Math.PI / 180);
      const resetRotation = new TWEEN.Tween(pickupTruckRef.current!.rotation)
        .to(
          { y: pickupTruckRef.current!.rotation.y + 15 * (Math.PI / 180) },
          50
        )
        .easing(TWEEN.Easing.Quadratic.Out);

      const tweenCameraRight = new Tween(camera.position)
        .to({ x: camera.position.x + 0.21 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out);
      tweenCameraRight.start();

      tweenRight = new TWEEN.Tween(pickupTruckRef.current!.position)
        .to({ x: pickupTruckRef.current!.position.x + 0.3 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          resetRotation.start();

          pickupTruckRef.current!.position.x = Number(
            pickupTruckRef.current!.position.x.toFixed(2)
          );
        })
        .onUpdate(() => {
          if (pickupTruckRef.current!.position.x > 0.44) {
            pickupTruckRef.current!.position.x = 0.44;
          }
          if (camera.position.x > 0.21) {
            camera.position.x = 0.21;
          }
        });
      if (tweenLeft.isPlaying()) {
        tweenLeft.stop();
      }
      tweenRight.start();
    }
  };

  useFrame((state, delta) => {
    /*  const time = state.clock.getDelta();
    setDelta(time); */

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
        /*  */
        moveLeft(state.camera);
        console.log(state.camera.position.x);
      }

      if (e.key === "ArrowRight") {
        //   console.log(pickupTruckRef.current!.position.x)

        moveRight(state.camera);
        console.log(state.camera.position.x);
      }
    };

    // useArrowKeyPress(handleArrowKeyPress);

    /* if (mainRoadTwoRef.current) {
      mainRoadTwoRef.current.position.z += delta * 0.009;
    } */
    if (mainRoadRef.current) {
      mainRoadRef.current.position.z += 5 * delta;
      if (mainRoadRef.current.position.z > 19.5) {
        mainRoadRef.current.position.z =
          mainRoadTwoRef.current!.position.z - roadSizeOnZAxis;
      }
    }
    if (mainRoadTwoRef.current) {
      mainRoadTwoRef.current.position.z += 5 * delta;
      //console.log(mainRoadTwoRef.current.position.z)
      if (mainRoadTwoRef.current.position.z > 19.5) {
        mainRoadTwoRef.current.position.z =
          mainRoadRef.current!.position.z - roadSizeOnZAxis;
      }
    }

       if (obstacle2Ref.current) {
      obstacle2Ref.current.position.z += 5 * delta;

      if (obstacle2Ref.current.position.z > 9) {
        obstacle2Ref.current.position.z = -10;
      }
    } 
  });

  return (
    <>
      {/*  <mesh rotation={[delta, delta, 0]} position={[0,0,0]}>
        <boxGeometry />
        <meshBasicMaterial color="royalblue" />
        </mesh> */}

      <mesh ref={mainRoadRef}>
        <MainRoad />
      </mesh>
      <mesh ref={mainRoadTwoRef}>
        <MainRoadTwo />
      </mesh>
      <mesh ref={pickupTruckRef} rotation={[0, 180 * (Math.PI / 180), 0]}>
        <PickupTruck />
      </mesh>

      {/*   <group ref={obstacle1Ref} position={[0, 0, -10]}>
        <mesh
          ref={vanRef}
          position={[-0.45, -0.34, -4]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>
        <mesh
          ref={vanRef}
          position={[0.45, -0.34, -4]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>

        <mesh
          ref={vanRef}
          position={[0.45, -0.34, -1]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>

        <mesh
          ref={taxiRef}
          position={[-0.45, -0.34, 3.8]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Taxi />
        </mesh>
        <mesh
          ref={limoRef}
          position={[0.45, -0.34, 3.8]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Limousine />
        </mesh>
        <mesh
          ref={busRef}
          position={[-0.16, -0.34, -2]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Bus />
        </mesh>
        <mesh
          ref={busRef}
          position={[0.14, -0.34, 0]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Taxi />
        </mesh>
        <mesh
          ref={firetruckRef}
          position={[-0.16, -0.34, 3.8]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Firetruck />
        </mesh>

        <mesh
          ref={ambulanceRef}
          position={[0.45, -0.34, 3]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Ambulance />
        </mesh>
      </group> 
 */}
      <group ref={obstacle2Ref}>
        <mesh
          ref={vanRef}
          position={[0.45, -0.34, 3]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>
        <mesh
          ref={vanRef}
          position={[-0.45, -0.34, 3]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>

        <mesh
          ref={vanRef}
          position={[-0.45, -0.34, 2]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Van />
        </mesh>

        <mesh
          ref={vanRef}
          position={[-0.45, -0.34, 1]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Limousine />
        </mesh>
        
        <mesh
          ref={firetruckRef}
          position={[-0.16, -0.34, 2]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Firetruck />
        </mesh>

        <mesh
          ref={firetruckRef}
          position={[-0.16, -0.34, 3]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Firetruck />
        </mesh>
        <mesh
          ref={busRef}
          position={[0.14, -0.34, 0]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Bus />
        </mesh>
        <mesh
          ref={busRef}
          position={[0.14, -0.34, -4]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Taxi />
        </mesh>
        <mesh
          ref={busRef}
          position={[0.45, -0.34, -4]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Taxi />
        </mesh>
        <mesh
          ref={busRef}
          position={[-0.45, -0.34, -4]}
          scale={[0.0006, 0.0006, 0.0006]}
        >
          <Limousine />
        </mesh>
      </group>

      <group>
        
      </group>
    </>
  );
}
