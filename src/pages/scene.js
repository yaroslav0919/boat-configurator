import MSelect from "./MSelect";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Scene = ({ state }) => {
    const canvasRef = useRef(null);
    const { nodes, materials } = useGLTF("/boat.gltf");

    useEffect(() => {
        console.log("kkk", state.columns["column-1"].taskIds);
    }, [state]);
    const nodeNames = [];
    state.columns["column-1"].taskIds.forEach((id) => {
        nodeNames.push(state.tasks[id].nodeName);
    });
    console.log(nodes);
    return (
        <Canvas
            className="render-canvas"
            ref={canvasRef}
            camera={{
                fov: 60,
                position: [-5, 2, -3],
                near: 1.0,
                far: 10000,
                aspect: window.innerWidth / window.innerHeight,
            }}
            shadows
        >
            <gridHelper />
            <OrbitControls />
            <hemisphereLight intensity={0.5} />
            <directionalLight intensity={0.8} position={[5, 10, 5]} />
            <directionalLight intensity={0.8} position={[5, -10, 5]} />
            <directionalLight intensity={0.8} position={[0, -10, -5]} />

            <spotLight
                intensity={2}
                color={0xffeedf}
                position={[-20, 20, 20]}
                castShadow
                shadow-mapSize-height={1024 * 8}
                shadow-mapSize-width={1024 * 8}
                shadow-bias={-0.0001}
                shadow-radius={5}
                shadow-blurSamples={50}
            />

            <group>
                <primitive object={nodes.anytec_base_mesh} />
                {nodeNames.map((name, index) => (
                    <primitive key={`modelPart${index}`} object={nodes[name]} />
                ))}
            </group>

            {/* <Marker
                pos={[-1.5, 0.8, -1.1]}
                text={"Public Library"}
                modalNumber={1}
            /> */}
            {/* <Marker
                        pos={[-0, 0.4, -1.1]}
                        text={"Bus Stop"}
                        modalNumber={2}
                    />
                    <Marker
                        pos={[0.5, 1, -3]}
                        text={"Train Station"}
                        modalNumber={3} 
                    />*/}
        </Canvas>
    );
};

export default Scene;
