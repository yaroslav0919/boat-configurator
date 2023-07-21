import MSelect from "./MSelect";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Stats,
    useProgress,
    Billboard,
    Html,
    OrbitControls,
    Loader,
    Environment,
    softShadows,
    Sky,
    MapControls,
    TransformControls,
    useGLTF,
} from "@react-three/drei";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

const Scene = () => {
    const canvasRef = useRef(null);
    // const gltf = useLoader(GLTFLoader, "/boat.gltf");
    const { nodes, materials } = useGLTF("/boat.gltf");
    console.log(nodes);
    return (
        <Canvas
            className="render-canvas"
            ref={canvasRef}
            camera={{
                fov: 60,
                position: [0, 0, 10],
                near: 1.0,
                far: 10000,
                aspect: window.innerWidth / window.innerHeight,
            }}
            shadows

            // gl={{
            //     antialias: true,
            //     toneMapping: THREE.ACESFilmicToneMapping,
            // }}

            // onCreated={({ gl, scene }) => {
            //     gl.toneMapping = THREE.ACESFilmicToneMapping;
            //     gl.toneMappingExposure = 1;
            //     gl.shadowMap.type = THREE.VSMShadowMap;
            //     // const helper = new THREE.CameraHelper(lightRef.current.shadow.camera);
            //     // scene.add(helper);
            // }}
        >
            <gridHelper />
            <OrbitControls />
            <hemisphereLight intensity={0.5} />
            <directionalLight intensity={0.8} position={[5, 10, 5]} />
            <directionalLight intensity={0.8} position={[5, -10, 5]} />
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
                {/* <primitive object={nodes.anytec_bowthruster} />
                <primitive object={nodes.anytec_coushins} />
                <primitive object={nodes.anytec_windlass} />
                <primitive object={nodes.anytec_zipwake} /> */}
                {/* <primitive object={nodes.anytec_mercury_engine} /> */}
                <primitive object={nodes.anytec_yamaha_engine} />
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
