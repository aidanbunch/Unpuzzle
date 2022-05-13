import React from "react";
import { Button } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { useUser } from "../context/user";

export default function DiscordAuthButton() {
  const { loginWithDiscord } = useUser();

  return (
    <Button
      onClick={() => {
        loginWithDiscord();
      }}
      leftIcon={<FaDiscord />}
      colorScheme={"purple"}
    //   color={"white"}
    //   bg={"gray"}
    //   variant="solid"
    >
      Sign in with Discord
    </Button>
  );
}
