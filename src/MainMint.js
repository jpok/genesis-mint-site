import { ethers } from "ethers";
import SkulltoonsGenesis from "./SkulltoonsGenesis.json";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

const contractAddress = "0x81d36DB796778ffEFbA057deE09c379146B9101E";
let contract;
let phase = "NOT_ACTIVE";
const MainMint = ({ accounts, setAccounts, wlProof, setWlProof, slProof, setSlProof }) => {
  const isConnected = accounts && accounts[0];

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, SkulltoonsGenesis.abi, signer);
    getPhase().then(p => phase = p);
  }  
  
  async function getPhase() {
    return await contract.getCurrentPhase();
  }

  async function handleMint() {
    let response;    
    try {
      switch(phase) {
        case 'NOT_ACTIVE': break;
        case 'PRE_SALE': {          
           response = await contract.preSaleMint(wlProof);  
           break;        
        }
        case 'SKULL_TOON_HOLDERS_MINT': {
          response = await contract.tokenHoldersMint();
          break;
        }
        case 'PUBLIC': {
          response = await contract.publicMint();
          break;
        }
        default:
          return;
      }      
    } catch (err) {
      window.alert(err.message.split("reverted:").pop().split('"')[0]);
    }
  }

  return (
    <Box justify="center" align="center" height="50vh" paddingBottom="10rem">
      <Box width="50wh">
        <Flex justify="center" marginTop={"-150px"}>
          <img className="logo" src={"/logo.png"} alt="skulltoons logo"></img>
        </Flex>
        <Text fontSize="30px">The Skulltoons GENESIS collection brings to life 1777 new NFTs imagined by Theodoru</Text>
        {isConnected ? (
          <div>
            <Button
              disabled={phase === "NOT_ACTIVE"}
              _disabled={{ background: "#8e8e8e" }}
              _hover={phase === "NOT_ACTIVE" ? { background: "#8e8e8e" } : { background: "#dda0d8" }}
              margin="1rem"
              width="12rem"
              color={phase === "NOT_ACTIVE" ? "#555555"  : "#FFFFFF" }
              height="3rem"
              fontSize="2rem"
              className="btn-theme"
              onClick={handleMint}
            >              
              Mint Now
            </Button>
          </div>
        ) : (
          <Text fontSize="20px">You must be connected to mint</Text>
        )}
      </Box>
    </Box>
  );
};

export default MainMint;
