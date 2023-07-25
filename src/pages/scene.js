import MSelect from "./MSelect";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { initState } from "../constants";
const Scene = ({ state }) => {
    const canvasRef = useRef(null);
    const { nodes, materials } = useGLTF("/boat.gltf");

    const getList = (id) => {
        const listArray = [];
        listArray.push(id);
        state.columns["column-2"].taskIds.forEach((initId) => {
            if (initId.split("-")[0] === id.split("-")[0]) {
                listArray.push(initId);
            }
        });
        return listArray;
    };

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
            style={{ cursor: "grab" }}
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
            />

            <group>
                <primitive object={nodes.anytec_base_mesh} />
                {state.columns["column-1"].taskIds.map((id, index) => (
                    <primitive
                        key={`modelPart${index}`}
                        object={nodes[initState.tasks[id].nodeName]}
                    >
                        <Html>
                            <MSelect
                                className="Hotspot"
                                data-visibility-attribute="visible"
                                list={getList(id)}
                                // deleteConfiguration={deleteConfiguration}
                            />
                        </Html>
                    </primitive>
                ))}
            </group>
        </Canvas>
    );
};

export default Scene;
