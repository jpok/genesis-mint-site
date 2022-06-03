import { React, useState, useRef } from "react";

import "./App.css";
import MainMint from "./MainMint";
import NavBar from "./NavBar";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { Flex, Link, Image, Box } from "@chakra-ui/react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Stage } from "@react-three/drei";

import discord from "./assets/discord.png";
import twitter from "./assets/twitter.png";
import instagram from "./assets/instagram.png";

function Gavroche() {
  const { viewport } = useThree();
  const ref = useRef();
  useFrame(({ mouse }) => {
    const x = (0.05 * (mouse.x * viewport.width)) / 2;
    const y = (0.05 * (mouse.y * viewport.height)) / 2;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });
  const gltf = useLoader(GLTFLoader, "/gavroche/fbx.glb");
  return <primitive object={gltf.scene} ref={ref} />;
}

function App() {
  const [accounts, setAccounts] = useState([]);
  const [wlProof, setWlProof] = useState([]);
  const [slProof, setSlProof] = useState([]);
  // const gav = React.useRef();

  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} wlProof={wlProof} setWlProof={setWlProof} slProof={slProof} setSlProof={setSlProof} />
        <Flex height="70vh" width="100vw">
          <Canvas>
            <Stage shadows={false} contactShadow={false}>
              <Gavroche />
            </Stage>
          </Canvas>
        </Flex>
        <MainMint accounts={accounts} setAccounts={setAccounts} wlProof={wlProof} setWlProof={setWlProof} slProof={slProof} setSlProof={setSlProof} />
        <Box position={'absolute'} bottom="5" right="10">
          <Flex justify="space-around" width="15vw" align="center">
            <Link href="https://discord.gg/skulltoons">
              <Image className="social" src={discord}></Image>
            </Link>

            <Link href="https://twitter.com/SkulltoonsNFT">
              <Image className="social" src={twitter}></Image>
            </Link>

            <Link href="https://instagram.com/skulltoonsnft">
              <Image src={instagram} className="social"></Image>
            </Link>
          </Flex>
        </Box>
      </div>
    </div>
  );
}

export default App;
