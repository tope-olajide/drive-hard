import { Camera, useFrame } from "@react-three/fiber";
import {
  Ref,
  RefObject,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainRoad, MainRoadTwo, PickupTruck } from "../../GLTFModelsLoader";
import {
  Box3,
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3D,
  Object3DEventMap,
  Vector3,
} from "three";
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

import {
  CoinGroupLane1,
  CoinGroupLane1_2,
  CoinGroupLane1_2_3,
  CoinGroupLane1_2_3_4,
  CoinGroupLane2,
  CoinGroupLane3,
  CoinGroupLane4,
} from "./Coins";

import { useGlobalState } from "../../store/GlobalStore";

export function RaceScene() {
  const { pauseGame, resumeGame, isGamePausedRef, coins, increaseCoins , isGameOverRef, setGameOver} =
    useGlobalState();
  const [roadSizeOnZAxis, setRoadSizeOnZAxis] = useState(0);
  const [isHeadStart, setIsHeadStart] = useState(false);
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);

  let tweenLeft: Tween<Vector3>;
  let tweenRight: Tween<Vector3>;

  let activeObstacleOne = useRef<Group<Object3DEventMap>>(null);
  let activeObstacleTwo = useRef<Group<Object3DEventMap>>(null);

  let activeCoinOne = useRef<Group<Object3DEventMap>>(null);
  let activeCoinTwo = useRef<Group<Object3DEventMap>>(null);

  let playerBoxCollider = new Box3(new Vector3(), new Vector3());

  let obstacleOneBoxCollider = new Box3(new Vector3(), new Vector3());
  let obstacleTwoBoxCollider = new Box3(new Vector3(), new Vector3());

  let coinOneBoxCollider = new Box3(new Vector3(), new Vector3());
  let coinTwoBoxCollider = new Box3(new Vector3(), new Vector3());

  let scores = 0;

  let speed = 2;

  const obstacleRefs = Array.from({ length: 7 }, () => useRef<Group>(null));
  const coinRefs = Array.from({ length: 7 }, () => useRef<Group>(null));

  const getRandomPooledObstacle = () => {
    const availableItems = obstacleRefs.filter(
      (item) => !item.current?.visible
    );
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return availableItems[randomIndex];
  };

  const getRandomCoinsGroup = () => {
    const availableItems = coinRefs.filter((item) => !item.current?.visible);
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
    activeObstacle.current!.position.z =
      activeObstacleOne?.current!.position.z - 12;
    activeObstacle.current!.visible = true;
    activeObstacleTwo = activeObstacle;
  };

  const spawnCoinOne = () => {
    const activeCoinGroup = getRandomCoinsGroup();
    activeCoinGroup.current!.position.z = -14;
    activeCoinGroup.current!.visible = true;
    activeCoinOne = activeCoinGroup;
  };
  const spawnCoinTwo = () => {
    const activeCoin = getRandomCoinsGroup();
    activeCoin.current!.position.z = activeCoinOne?.current!.position.z - 12;
    activeCoin.current!.visible = true;
    activeCoinTwo = activeCoin;
  };

  const moveActiveObstacleOne = (delta: number) => {
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

  const moveActiveObstacleTwo = (delta: number) => {
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

  const displayHiddenCoinsChildren = (parent: Object3D) => {
    for (let i = 0; i < parent.children.length; i += 1) {
      if (!parent.children[i].visible) {
        parent.children[i].visible = true;
      }
    }
  };

  const moveActiveCoinOne = (delta: number) => {
    if (activeCoinOne?.current) {
      if ((activeCoinOne.current.visible = true)) {
        activeCoinOne.current.position.z += 5 * delta;
        if (activeCoinOne.current.position.z > 9) {
          displayHiddenCoinsChildren(activeCoinOne.current);
          activeCoinOne.current.position.z = -14;
          activeCoinOne.current.visible = false;
          spawnCoinOne();
        }
      }
    }
  };

  const moveActiveCoinTwo = (delta: number) => {
    if (activeCoinTwo?.current) {
      if ((activeCoinTwo.current.visible = true)) {
        activeCoinTwo.current.position.z += 5 * delta;
        if (activeCoinTwo.current.position.z > 9) {
          displayHiddenCoinsChildren(activeCoinOne.current);
          activeCoinTwo.current.position.z = -14;
          activeCoinTwo.current.visible = false;
          spawnCoinTwo();
        }
      }
    }
  };

  const gameOver = () => {
    
    setGameOver()

  };


  const detectCollisionWithObstacleOne = () => {
    if (activeObstacleOne.current) {
      for (let i = 0; i < activeObstacleOne.current!.children.length; i += 1) {
        obstacleOneBoxCollider.setFromObject(
          activeObstacleOne.current.children[i]
        );
        if (playerBoxCollider.intersectsBox(obstacleOneBoxCollider)) {
          gameOver();
        }
      }
    }
  };
  const detectCollisionWithObstacleTwo = () => {
    if (activeObstacleTwo.current) {
      for (let i = 0; i < activeObstacleTwo.current!.children.length; i += 1) {
        obstacleTwoBoxCollider.setFromObject(
          activeObstacleTwo.current.children[i]
        );
        if (playerBoxCollider.intersectsBox(obstacleTwoBoxCollider)) {
          gameOver();
        }
      }
    }
  };

  const detectCollisionWithCoinOne = () => {
    if (activeCoinOne.current) {
      for (let i = 0; i < activeCoinOne.current!.children.length; i += 1) {
        coinOneBoxCollider.setFromObject(activeCoinOne.current.children[i]);
        if (playerBoxCollider.intersectsBox(coinOneBoxCollider)) {
          if (!isGamePausedRef.current && !isGameOverRef.current) {
            activeCoinOne.current.children[i].position.z += 100;
            activeCoinOne.current.children[i].visible = false;
            increaseCoins();
            (
              document.querySelector(".coins-count") as HTMLElement
            ).innerHTML = `${coins.current}`;
          }
          setTimeout(() => {
            activeCoinOne.current!.children[i].position.z -= 100;
          }, 200);
        }
      }
    }
  };

  const detectCollisionWithCoinTwo = () => {
    if (activeCoinTwo.current) {
      for (let i = 0; i < activeCoinTwo.current!.children.length; i += 1) {
        coinTwoBoxCollider.setFromObject(activeCoinTwo.current.children[i]);
        if (playerBoxCollider.intersectsBox(coinTwoBoxCollider)) {
          if (!isGamePausedRef.current && !isGameOverRef.current) {
            activeCoinTwo.current.children[i].position.z += 100;
            activeCoinTwo.current.children[i].visible = false;
            increaseCoins();
            (
              document.querySelector(".coins-count") as HTMLElement
            ).innerHTML = `${coins.current}`;
          }
          setTimeout(() => {
            activeCoinTwo.current!.children[i].position.z -= 100;
          }, 200);
        }
      }
    }
  };
 
  const handlePause = () => {
   
    pauseGame();
  };
  const handleResume = () => {
    resumeGame();
  };

  useEffect(() => {
    const pauseButton = document.getElementById("pauseGameButton");
    const resumeButton = document.getElementById("resumeGameButton");

    if (pauseButton && resumeButton) {

      pauseButton.addEventListener("click", handlePause);
      resumeButton.addEventListener("click", handleResume);

      return () => {
        pauseButton.removeEventListener("click", handlePause);
        resumeButton.removeEventListener("click", handleResume);
      };
    }
  }, []);

  useEffect(() => {
    // playerBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleOneBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleTwoBoxCollider = new Box3(new Vector3(), new Vector3());
    const timer = setTimeout(() => {
      /*  spawnObstacleOne();
      spawnObstacleTwo();
 */
      spawnCoinOne();
      spawnCoinTwo();
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
          //state.clock.stop();
          pauseGame();
        } else {
          // state.clock.start();
          resumeGame();
        }
      }
      if (e.key === "ArrowLeft") {
        move(state.camera, "left");
      }
      if (e.key === "ArrowRight") {
        move(state.camera, "right");
      }
    };
    if (isGamePausedRef.current) {
      state.clock.stop();
    } else {
      state.clock.start();
    }

    if (isGameOverRef.current) {
      state.clock.stop();
    } else {
      state.clock.start();
    }

    if (!isGamePausedRef.current && !isGameOverRef.current ) {
      scores += Math.round(speed * delta + 1);
      (document.querySelector(".scores-count") as HTMLElement).innerHTML =
        scores.toString();
    }
    if (mainRoadRef.current) {
      mainRoadRef.current.position.z += speed * delta;
      if (mainRoadRef.current.position.z > 19.5) {
        mainRoadRef.current.position.z =
          mainRoadTwoRef.current!.position.z - roadSizeOnZAxis;
      }
    }
    if (mainRoadTwoRef.current) {
      mainRoadTwoRef.current.position.z += speed * delta;
      if (mainRoadTwoRef.current.position.z > 19.5) {
        mainRoadTwoRef.current.position.z =
          mainRoadRef.current!.position.z - roadSizeOnZAxis;
      }
    }
    if (pickupTruckRef.current) {
      playerBoxCollider.setFromObject(pickupTruckRef.current);
    }

    if (isHeadStart) {
        moveActiveObstacleOne(delta);
      moveActiveObstacleTwo(delta);
      detectCollisionWithObstacleOne();
      detectCollisionWithObstacleTwo(); 
      moveActiveCoinOne(delta);
      moveActiveCoinTwo(delta);
      detectCollisionWithCoinOne();
      detectCollisionWithCoinTwo();
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
      <group ref={activeObstacleOne}></group>
      <group ref={activeObstacleTwo}></group>

      <group ref={activeCoinOne}></group>
      <group ref={activeCoinTwo}></group>

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
      {coinRefs.map((ref, i) => (
        <group ref={ref} position={[0, 0, -14]} visible={false} key={i}>
          {createElement(
            [
              CoinGroupLane1,
              CoinGroupLane2,
              CoinGroupLane3,
              CoinGroupLane4,
              CoinGroupLane1_2,
              CoinGroupLane1_2_3,
              CoinGroupLane1_2_3_4,
            ][i]
          )}
        </group>
      ))}

      {/* <Html fullscreen>
        <Modal />
      </Html> */}

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
