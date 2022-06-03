import React from "react";
import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import { getAuthProofs } from "./services/AuthService";

const NavBar = ({ accounts, setAccounts, wlProof, setWlProof, slProof, setSlProof }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(accounts);       

      if (accounts && accounts[0]) {                
        const wlProof = await getAuthProofs(accounts[0]);                
        
        if (wlProof) {
          console.log(wlProof);
          setWlProof(wlProof);          
        }        
      }        
    }
  }

  return (
    <div className="navbar"> 
    <Flex justify="flex-end" align="center" padding={'1rem'}>          

      {/* Connect */}
      {isConnected ? (
        <Box margin="0 1rem" fontSize="30px">Connected</Box>
      ) : (
        <Button           
          width="10rem" marginRight={'.5rem'} _hover={{background: '#dda0d8'}} height="2.5rem" fontSize="30px" className="btn-theme" onClick={connectAccount}>Connect</Button>
      )}
    </Flex>
    </div>
  );
};

export default NavBar;
