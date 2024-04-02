import { Camera, useFrame, useThree } from "@react-three/fiber";
import { createElement, useEffect, useRef } from "react";
import {
  BuildingBlockA,
  BuildingBlockB,
  BuildingBlockC,
  BuildingBlockD,
  Ferrari,
  MainRoad,
  MainRoadTwo,
  Offroad,
  PickupTruck,
  SUV,
  SkyBox,
} from "../../GLTFModelsLoader";
import { Box3, Group, Mesh, Object3D, Object3DEventMap, Vector3 } from "three";
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

export function CarRace() {

  const camera = useThree(state => state.camera)
  const { switchToMainMenuScene } = useGlobalState();

  const isGamePausedRef = useRef<boolean>(false);
  let coins = useRef(0);

  const isGameOverRef = useRef<boolean>(false);
  const increaseCoins = () => {
    coins.current += 1;
  };

  const pauseGame = () => {
    isGamePausedRef.current = true;
    document.getElementById("pauseModalContainer")!.style.display = "block";
    saveCoins();
    saveHighScore();
    accelerationSoundRef.current.pause();
    console.log({cameraPosition:camera.position})
    console.log({cameraRotation:camera.rotation})
  };

  const resumeGame = () => {
    isGamePausedRef.current = false;
    accelerationSoundRef.current.play();
    document.getElementById("pauseModalContainer")!.style.display = "none";
  };

  const setGameOver = () => {
    accelerationSoundRef.current.pause();

    accelerationSoundRef.current.currentTime = 0;
    isGameOverRef.current = true;
    const gameOverModalContainer = document.getElementById(
      "gameOverModalContainer"
    );
    if (gameOverModalContainer) {
      gameOverModalContainer.style.display = "block";
    }
    saveCoins();
    saveHighScore();
  };

  const setRestartGame = () => {
    accelerationSoundRef.current.play();
    isGameOverRef.current = false;
    const gameOverModalContainer = document.getElementById(
      "gameOverModalContainer"
    );
    if (gameOverModalContainer) {
      gameOverModalContainer.style.display = "none";
    }
  };
  let roadSizeOnZAxis = 0;
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);
  const SUVRef = useRef<Mesh>(null);
  const offroadRef = useRef<Mesh>(null);
  const ferrariRef = useRef<Mesh>(null);

  const BuildingBlockARef = useRef<Mesh>(null);
  const BuildingBlockBRef = useRef<Mesh>(null);
  const BuildingBlockCRef = useRef<Mesh>(null);
  const BuildingBlockDRef = useRef<Mesh>(null);

  const skyBoxRef = useRef<Mesh>(null);

  let buildingBlockASize = 0;
  let buildingBlockBSize = 0;
  let buildingBlockCSize = 0;
  let buildingBlockDSize = 0;

  const allCarsModels = [pickupTruckRef, SUVRef, offroadRef, ferrariRef];

  let savedGameCars;
  let activatedCarIndex = 0;

  let tweenLeft: Tween<Vector3>;
  let tweenRight: Tween<Vector3>;

  savedGameCars = JSON.parse(localStorage.getItem("savedCarData")!);
  activatedCarIndex = savedGameCars.findIndex(
    (car: { isActive: boolean }) => car.isActive === true
  );

  let playerCar = allCarsModels[activatedCarIndex];

  const accelerationSoundRef = useRef(
    new Audio("./assets/sounds/acceleration-1.mp3")
  );

  const coinSoundRef = useRef(new Audio("./assets/sounds/coin_2-89099.mp3"))
  const driftSoundRef = useRef(new Audio("./assets/sounds/drift-sound.mp3"));
  const crashSoundRef = useRef(new Audio("./assets/sounds/car-crash.mp3"));

  useEffect(() => {
    accelerationSoundRef.current.play();
    accelerationSoundRef.current.loop = true;
    driftSoundRef.current.volume = 0.8;
    driftSoundRef.current.volume = 0.08;
    return () => {
      accelerationSoundRef.current.pause();
      accelerationSoundRef.current.currentTime = 0;
    };
  }, []);
  useEffect(() => {
    playerCar.current!.visible = true;

    tweenLeft = new TWEEN.Tween(playerCar.current!.position);
    tweenRight = new TWEEN.Tween(playerCar.current!.position);
  }, []);

  let activeObstacleOne = useRef<Group<Object3DEventMap>>(null);
  let activeObstacleTwo = useRef<Group<Object3DEventMap>>(null);

  let activeCoinOne = useRef<Group<Object3DEventMap>>(null);
  let activeCoinTwo = useRef<Group<Object3DEventMap>>(null);

  let playerBoxCollider = new Box3(new Vector3(), new Vector3());
  let modifiedPlayerBoxCollider = new Box3(new Vector3(), new Vector3());

  let obstacleOneBoxCollider = new Box3(new Vector3(), new Vector3());
  let obstacleTwoBoxCollider = new Box3(new Vector3(), new Vector3());

  let coinOneBoxCollider = new Box3(new Vector3(), new Vector3());
  let coinTwoBoxCollider = new Box3(new Vector3(), new Vector3());

  let scores = 0;

  let speed = 2;

  const obstacleRefs = Array.from({ length: 7 }, () => useRef<Group>(null));
  const coinRefs = Array.from({ length: 7 }, () => useRef<Group>(null));

  const isHeadStartRef = useRef<boolean>(false);

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
          displayHiddenCoinsChildren(activeCoinTwo.current);
          activeCoinTwo.current.position.z = -14;
          activeCoinTwo.current.visible = false;
          spawnCoinTwo();
        }
      }
    }
  };

  const gameOver = () => {
    setGameOver();
  };

  const detectCollisionWithObstacleOne = () => {
    if (activeObstacleOne.current) {
      for (let i = 0; i < activeObstacleOne.current!.children.length; i += 1) {
        obstacleOneBoxCollider.setFromObject(
          activeObstacleOne.current.children[i]
        );
        if (modifiedPlayerBoxCollider.intersectsBox(obstacleOneBoxCollider)) {
          gameOver();
          activeObstacleOne.current.position.z = -20;
          crashSoundRef.current.play();
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
        if (modifiedPlayerBoxCollider.intersectsBox(obstacleTwoBoxCollider)) {
          gameOver();
          activeObstacleTwo.current.position.z = -50;
          crashSoundRef.current.play();
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
            coinSoundRef.current.currentTime = 0;
            coinSoundRef.current.play();
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
            coinSoundRef.current.currentTime = 0;
            coinSoundRef.current.play();

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

  const saveCoins = () => {
    const prevTotalCoins = localStorage.getItem("total-coins") || 0;
    const totalCoins = Number(prevTotalCoins) + coins.current;
    localStorage.setItem("total-coins", totalCoins.toString());
  };
  const saveHighScore = () => {
    const highScore = localStorage.getItem("high-score") || 0;
    if (Number(scores) > Number(highScore)) {
      localStorage.setItem("high-score", scores.toString());
    }
  };

  const handlePause = () => {
    pauseGame();
  };
  const handleResume = () => {
    resumeGame();
  };

  const handleGameRestart = () => {
    activeObstacleOne.current!.position.z = 20;
    activeObstacleTwo.current!.position.z = 20;
    activeObstacleOne.current!.visible = false;
    activeObstacleTwo.current!.visible = false;
    isHeadStartRef.current = false;
    setRestartGame();

    for (let i = 0; i < obstacleRefs.length; i += 1) {
      if (obstacleRefs[i].current!.visible) {
        obstacleRefs[i].current!.visible = false;
        obstacleRefs[i].current!.position.z = -14;
      }
    }

    for (let i = 0; i < coinRefs.length; i += 1) {
      if (coinRefs[i].current!.visible) {
        coinRefs[i].current!.visible = false;
      }
    }

    const timer = setTimeout(() => {
      spawnCoinOne();
      spawnCoinTwo();
      isHeadStartRef.current = true;
      clearTimeout(timer);
    }, 4000);
  };

  useEffect(() => {
    const pauseButton = document.getElementById("pauseGameButton");
    const resumeButton = document.getElementById("resumeGameButton");
    const restartGameButton = document.getElementById("restartGameButton");
    const quitGameButton = document.getElementById("quitGameButton");
    const quitGameButton2 = document.getElementById("quitGameButton2");

    if (
      pauseButton &&
      resumeButton &&
      restartGameButton &&
      quitGameButton &&
      quitGameButton2
    ) {
      pauseButton.addEventListener("click", handlePause);
      resumeButton.addEventListener("click", handleResume);
      restartGameButton.addEventListener("click", handleGameRestart);
      quitGameButton.addEventListener("click", switchToMainMenuScene);
      quitGameButton2.addEventListener("click", switchToMainMenuScene);

      return () => {
        pauseButton.removeEventListener("click", handlePause);
        resumeButton.removeEventListener("click", handleResume);
        restartGameButton.removeEventListener("click", handleGameRestart);
        quitGameButton.removeEventListener("click", switchToMainMenuScene);
        quitGameButton2.removeEventListener("click", switchToMainMenuScene);
      };
    }
  }, []);

  useEffect(() => {
    // playerBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleOneBoxCollider = new Box3(new Vector3(), new Vector3());
    obstacleTwoBoxCollider = new Box3(new Vector3(), new Vector3());
    isGameOverRef.current = false;
    isGamePausedRef.current = false;
    const timer = setTimeout(() => {
      //  spawnObstacleOne();
      // spawnObstacleTwo();

      spawnCoinOne();
      spawnCoinTwo();

      isHeadStartRef.current = true;
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);

    if (mainRoadRef.current && mainRoadTwoRef.current) {
      const mainRoadboundingBox = new Box3().setFromObject(mainRoadRef.current);

      roadSizeOnZAxis =
        mainRoadboundingBox.max.z - mainRoadboundingBox.min.z - 0.1;

      mainRoadTwoRef.current.position.set(0, -0.4, -15);
    }
  }, []);

  useEffect(() => {
    if (
      BuildingBlockARef.current &&
      BuildingBlockBRef.current &&
      BuildingBlockCRef.current &&
      BuildingBlockDRef.current
    ) {
      const buildingBlockABox = new Box3().setFromObject(
        BuildingBlockARef.current
      );
      const buildingBlockBBox = new Box3().setFromObject(
        BuildingBlockBRef.current
      );
      const buildingBlockCBox = new Box3().setFromObject(
        BuildingBlockCRef.current
      );
      const buildingBlockDBox = new Box3().setFromObject(
        BuildingBlockDRef.current
      );

      buildingBlockASize = buildingBlockABox.max.z - buildingBlockABox.min.z;
      buildingBlockBSize = buildingBlockBBox.max.z - buildingBlockBBox.min.z;
      buildingBlockCSize = buildingBlockCBox.max.z - buildingBlockCBox.min.z;
      buildingBlockDSize = buildingBlockDBox.max.z - buildingBlockDBox.min.z;
    }
  }, []);

  const moveLeft = (camera: Camera) => {
    if (playerCar.current!.position.x !== -0.46) {
      driftSoundRef.current.currentTime = 0;
      driftSoundRef.current.play();
      const tweenCameraLeft = new Tween(camera.position)
        .to({ x: camera.position.x - 0.21 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out);

      playerCar.current!.rotation.y = -165 * (Math.PI / 180);
      const resetRotation = new TWEEN.Tween(playerCar.current!.rotation)
        .to({ y: playerCar.current!.rotation.y - 15 * (Math.PI / 180) }, 50)
        .easing(TWEEN.Easing.Quadratic.Out);

      tweenLeft = new TWEEN.Tween(playerCar.current!.position)
        .to({ x: playerCar.current!.position.x - 0.3 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          resetRotation.start();
          playerCar.current!.position.x = Number(
            playerCar.current!.position.x.toFixed(2)
          );
        })
        .onUpdate(() => {
          if (playerCar.current!.position.x < -0.46) {
            playerCar.current!.position.x = -0.46;
          }

          if (camera.position.x < -0.42) {
            camera.position.x = -0.42;
          }
        });

      if (tweenRight?.isPlaying()) {
        tweenRight.stop();
      }

      tweenLeft.start();
      tweenCameraLeft.start();
    }
  };

  const moveRight = (camera: Camera) => {
    if (playerCar.current!.position.x !== 0.44) {
      driftSoundRef.current.currentTime = 0;
      driftSoundRef.current.play();
      playerCar.current!.rotation.y = 165 * (Math.PI / 180);
      const resetRotation = new TWEEN.Tween(playerCar.current!.rotation)
        .to({ y: playerCar.current!.rotation.y + 15 * (Math.PI / 180) }, 50)
        .easing(TWEEN.Easing.Quadratic.Out);

      const tweenCameraRight = new Tween(camera.position)
        .to({ x: camera.position.x + 0.21 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out);
      tweenCameraRight.start();

      tweenRight = new TWEEN.Tween(playerCar.current!.position)
        .to({ x: playerCar.current!.position.x + 0.3 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          resetRotation.start();

          playerCar.current!.position.x = Number(
            playerCar.current!.position.x.toFixed(2)
          );
        })
        .onUpdate(() => {
          if (playerCar.current!.position.x > 0.44) {
            playerCar.current!.position.x = 0.44;
          }
          if (camera.position.x > 0.21) {
            camera.position.x = 0.21;
          }
        });
      if (tweenLeft?.isPlaying()) {
        tweenLeft.stop();
      }
      tweenRight.start();
    }
  };



      document.onkeydown = (e) => {
      if (!isGameOverRef.current) {
        if (e.key === " ") {
          if (!isGamePausedRef.current) {
            pauseGame();
          } else {
            resumeGame();
          }
        }
        if (e.key === "ArrowLeft") {
          moveLeft(camera);
        }
        if (e.key === "ArrowRight") {
          moveRight(camera);
        }
      }
  };
  
  useFrame((state, delta) => {
    TWEEN.update();

    if (isGamePausedRef.current || isGameOverRef.current) {
      state.clock.stop();
    } else {
      state.clock.start();
    }

    /* */

    if (!isGamePausedRef.current && !isGameOverRef.current) {
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
    if (playerCar.current) {
      playerBoxCollider.setFromObject(playerCar.current);
      // Makes the playerCar collider smaller so it doesn't detect small or near miss collision
      modifiedPlayerBoxCollider.setFromObject(playerCar.current);
      modifiedPlayerBoxCollider.max.z -= 0.3; 
      modifiedPlayerBoxCollider.min.x += 0.06;
      modifiedPlayerBoxCollider.max.x -= 0.06;

    }

    if (isHeadStartRef.current) {
      moveActiveObstacleOne(delta);
      moveActiveObstacleTwo(delta);
       detectCollisionWithObstacleOne();
      detectCollisionWithObstacleTwo();
      moveActiveCoinOne(delta);
      moveActiveCoinTwo(delta);
      detectCollisionWithCoinOne();
      detectCollisionWithCoinTwo();
    }

    if (
      BuildingBlockARef.current &&
      BuildingBlockBRef.current &&
      BuildingBlockCRef.current &&
      BuildingBlockDRef.current
    ) {
      BuildingBlockARef.current.position.z += speed * delta;
      BuildingBlockBRef.current.position.z += speed * delta;
      BuildingBlockCRef.current.position.z += speed * delta;
      BuildingBlockDRef.current.position.z += speed * delta;

      if (BuildingBlockARef.current.position.z > 21) {
        BuildingBlockARef.current.position.z =
          BuildingBlockBRef.current.position.z - buildingBlockBSize;
      }

      if (BuildingBlockBRef.current.position.z > 21) {
        BuildingBlockBRef.current.position.z =
          BuildingBlockARef.current.position.z - buildingBlockASize;
      }

      if (BuildingBlockCRef.current.position.z > 21) {
        BuildingBlockCRef.current.position.z =
          BuildingBlockDRef.current.position.z - buildingBlockDSize;
      }
      if (BuildingBlockDRef.current.position.z > 21) {
        BuildingBlockDRef.current.position.z =
          BuildingBlockCRef.current.position.z - buildingBlockCSize;
      }
    }
    if (skyBoxRef.current) {
      skyBoxRef.current.rotation.y += 0.009 * delta;
    }
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isGameOverRef.current) {
        handlePause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);




 
  let touchstartX = 0;

  let touchendX = 0;

  let touchstartY = 0;

  let touchendY = 0;

  const handleTouch = () => {
    const pageWidth = window.innerWidth || document.body.clientWidth;
    const treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
    const limit = Math.tan(45 * (1.5 / 180) * Math.PI);
    const x = touchendX - touchstartX;
    const y = touchendY - touchstartY;
   
    const yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit) {
        if (x < 0) {
          moveLeft(camera);
       
        } else {
          
          moveRight(camera);
        }
      }
    }
};
  
useEffect(() => {
  const gestureZone = (document.getElementById('app') as HTMLElement);

   if (gestureZone){
    gestureZone.addEventListener('touchstart', (event) => {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    }, false);

    gestureZone.addEventListener('touchend', (event) => {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleTouch();
    }, false);

     return () => {
      gestureZone.removeEventListener('touchstart', (event) => {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      }, false);

      gestureZone.removeEventListener('touchend', (event) => {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleTouch();
      }, false);
       
     };
   }
}, []); 
  return (
    <>
      <mesh ref={mainRoadRef}>
        <MainRoad />
      </mesh>
      <mesh ref={mainRoadTwoRef}>
        <MainRoadTwo />
      </mesh>
      <mesh
        ref={pickupTruckRef}
        scale={0.07}
        position={[0.14, -0.33, 3.8]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        visible={false}
      >
        <PickupTruck />
      </mesh>

      <mesh
        ref={SUVRef}
        scale={0.07}
        position={[0.14, -0.33, 3.8]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        visible={false}
      >
        <SUV />
      </mesh>
      <mesh
        ref={ferrariRef}
        scale={0.07}
        position={[0.14, -0.33, 3.8]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        visible={false}
      >
        <Ferrari />
      </mesh>
      <mesh
        ref={offroadRef}
        scale={0.07}
        position={[0.14, -0.33, 3.8]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        visible={false}
      >
        <Offroad />
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

      <mesh scale={0.05} position={[-1.7, -0.33, -3]} ref={BuildingBlockBRef}>
        <BuildingBlockB />
      </mesh>
      <mesh scale={0.05} position={[-1.7, -0.33, 19]} ref={BuildingBlockARef}>
        <BuildingBlockA />
      </mesh>
      <mesh
        scale={0.05}
        position={[1.7, -0.33, 3]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        ref={BuildingBlockDRef}
      >
        <BuildingBlockD />
      </mesh>

      <mesh
        scale={0.05}
        position={[1.7, -0.33, -16]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
        ref={BuildingBlockCRef}
      >
        <BuildingBlockC />
      </mesh>
      <mesh ref={skyBoxRef}>
        <SkyBox />
      </mesh>
    </>
  );
}
