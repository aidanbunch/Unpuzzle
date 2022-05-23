import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { FaGit, FaGithub } from "react-icons/fa";
import { useUser } from "../context/user";

export default function GithubAuthButton() {
  const { loginWithGithub } = useUser();

  return (
    <Button
      onClick={() => {
        loginWithGithub();
      }}
      leftIcon={<FaGithub />}
      color={"white"}
      bg={"gray"}
      variant="solid"
    >
      Sign in with GitHub
    </Button>
  );
}
