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
          setWlProof(wlProof);
        }
      }
    }
  }

  return (
    <div className="navbar">
      <Flex justify="flex-end" align="center">
        {/* Connect */}
        {isConnected ? (
          <Box margin="0 2rem" fontSize="30px">
            Connected
          </Box>
        ) : (
          <Button width="10rem" marginRight={'2rem'}  _hover={{ background: "#dda0d8" }} height="2.5rem" fontSize="30px" className="btn-theme" onClick={connectAccount}>
            Connect
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default NavBar;
