import { OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Experience = () => {

    const texture = useTexture("app-background.png");
    const viewport = useThree((state) => state.viewport);

    return(
        <>
            <OrbitControls 
                enableZoom={false} 
                enableRotate={false} 
                enablePan={false} 
            />
            <mesh>
                <planeGeometry args={[viewport.width, viewport.height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    )
}