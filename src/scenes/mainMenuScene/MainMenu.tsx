import { Canvas } from "@react-three/fiber"
import { MainRoad, MainRoadTwo, PickupTruck, SkyBox } from "../../GLTFModelsLoader"
import { useEffect, useRef, useState } from "react";
import { Box3, Mesh } from "three";
import Button from "../../ui-components/Components";

const MainMenu = () => {

    const mainRoadRef = useRef<Mesh>(null);
    const mainRoadTwoRef = useRef<Mesh>(null);
    const pickupTruckRef = useRef<Mesh>(null);
    const [roadSizeOnZAxis, setRoadSizeOnZAxis] = useState(0);
    useEffect(() => {
        mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
        mainRoadRef.current?.position.set(0, -0.4, 0);
        mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
        pickupTruckRef.current?.scale.set(0.09, 0.09, 0.09);
        pickupTruckRef.current?.position.set(0, -0.33, 3.8);
    
        if (mainRoadRef.current && mainRoadTwoRef.current) {
          const mainRoadboundingBox = new Box3().setFromObject(mainRoadRef.current);
          setRoadSizeOnZAxis(
            mainRoadboundingBox.max.z - mainRoadboundingBox.min.z - 0.01
          );
          mainRoadTwoRef.current.position.set(0, -0.4, -15);
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
                
                <mesh ref={pickupTruckRef} rotation={[0, 20 * (Math.PI / 180), 0]} scale={[0.09, 0.09, 0.09]}>
        <PickupTruck />
      </mesh>
        
      </>
    )
}

export default MainMenu