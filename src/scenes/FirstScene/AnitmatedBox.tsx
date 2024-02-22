import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export function AnimatedBox() {
    const [delta, setDelta] = useState(0)
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime()
      setDelta(a);
    })
    return (
      <>
      <mesh rotation={[delta, delta, 0]} position={[0,0,0]}>
        <boxGeometry />
        <meshBasicMaterial color="royalblue" />
      </mesh>
      </>
    )
  }