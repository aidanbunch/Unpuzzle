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

  const handleClick = (e) => {
    e.preventDefault();
    console.log("CLICKED");
    Router.push(`/classrooms/${userToken}`);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setUserToken(value);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {/* <Center> */}
      <VStack spacing="30px">
        <Heading fontSize="4xl">Type your Edpuzzle User Token</Heading>
        <Input value={userToken} onChange={onChange} placeholder="User token" />
        <Button
          colorScheme="blue"
          size="lg"
          width="200px"
          isDisabled={userToken === "" ? true : false}
          onClick={(e) => handleClick(e)}
        >
          Go
          {/* <Link
            onClick={(e) => handleClick(e)}
            href={`/classrooms/${userToken}`}
          >
            Go
          </Link> */}
        </Button>
      </VStack>
      {/* </Center> */}
    </Flex>
  );
}
