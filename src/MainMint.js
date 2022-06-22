import { ethers } from "ethers";
import SkulltoonsGenesis from "./SkulltoonsGenesis.json";
import { Box, Button, Text, Flex, useToast, useMediaQuery } from "@chakra-ui/react";

const contractAddress = "0x76fd13efe1Ef70e0Dfa490174876Fc59ED8C4F8C";
let contract;
let phase = "NOT_ACTIVE";
const MainMint = ({ accounts, setAccounts, wlProof, setWlProof, slProof, setSlProof }) => {
  const isConnected = accounts && accounts[0];
  const toast = useToast();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, SkulltoonsGenesis.abi, signer);
    getPhase().then((p) => (phase = p));
  }

  async function getPhase() {
    return await contract.getCurrentPhase();
  }

  async function handleMint() {
    phase = await getPhase();
    try {
      switch (phase) {
        case "NOT_ACTIVE":
          break;
        case "PRE_SALE": {
          await contract.preSaleMint(wlProof);
          break;
        }
        case "SKULL_TOON_HOLDERS_MINT": {
          await contract.tokenHoldersMint();
          break;
        }
        case "PUBLIC": {
          await contract.publicMint();
          break;
        }
        default:
          break;          
      }      
      return toast({          
          description: "Your transaction is processing - please check your wallet for confirmation",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })                                  
    } catch (err) {
      return toast({          
          description:err.message.split("reverted:").pop().split('"')[0],
          status: 'error',
          duration: 9000,
          isClosable: true,
        })                                 
    }
  }

  return (
    <Box justify="center" align="center" height="50vh" paddingBottom="10rem">
      <Box width="50wh">
        <Flex justify="center" marginTop={"-150px"}>
          <img width={isSmallScreen ? '70%': '20%'}  src={"/logo.png"} alt="skulltoons logo"></img>
        </Flex>        
        <Text marginTop={'2rem'} fontSize={isSmallScreen ? '20px': '30px'}>1777 new NFTs imagined by Theodoru</Text>
        <Text fontSize={isSmallScreen ? '20px': '30px'}>The Skulltoons GENESIS collection brings to life</Text> 
        {isConnected ? (
          <div>
            <Button
              disabled={phase === "NOT_ACTIVE"}
              _disabled={{ background: "#8e8e8e" }}
              _hover={phase === "NOT_ACTIVE" ? { background: "#8e8e8e" } : { background: "#dda0d8" }}
              margin="3rem"
              width="12rem"
              color={phase === "NOT_ACTIVE" ? "#555555" : "#FFFFFF"}
              height="3rem"
              fontSize="2rem"
              className="btn-theme"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <Text marginTop={'3rem'} fontSize={isSmallScreen ? '15px': '20px'}>You must be connected to mint</Text>
        )}
      </Box>
    </Box>
  );
};

export default MainMint;
