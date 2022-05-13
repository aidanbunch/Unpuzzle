import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../context/user";

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useUser();

  return (
    <Button
      onClick={loginWithGoogle}
      leftIcon={<FaGoogle />}
      colorScheme={"teal"}
      variant="solid"
    >
      Sign in with Google
    </Button>
  );
}
