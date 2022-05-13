import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { FaApple } from "react-icons/fa";
import { useUser } from "../context/user";

export default function AppleAuthButton() {
  const { loginWithApple } = useUser();
  const toast = useToast();
  function signinToast() {
    toast({
      title: "Signed in successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Button
      onClick={() => {
        loginWithApple();
      }}
      leftIcon={<FaApple />}
      color={"white"}
      bg={"black"}
      variant="solid"
    >
      Sign in with Apple
    </Button>
  );
}
