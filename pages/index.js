import Router from "next/router";
import React from "react";
import {
  Flex,
  Center,
  Heading,
  Text,
  Input,
  Spacer,
  VStack,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  const [userToken, setUserToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    Router.push(`/classrooms/${userToken}`);
    setIsLoading(true);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setUserToken(value);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="30px">
        <Heading fontSize="4xl">Type your Edpuzzle User Token</Heading>
        <Input value={userToken} onChange={onChange} placeholder="User token" />
        <Button
          isLoading={isLoading}
          loadingText='Logging you in...'
          colorScheme="blue"
          size="lg"
          width="200px"
          isDisabled={userToken === "" ? true : false}
          onClick={(e) => handleClick(e)}
        >
          Go
        </Button>
      </VStack>
    </Flex>
  );
}
