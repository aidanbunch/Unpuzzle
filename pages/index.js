import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";
import {
  Flex,
  Center,
  Text,
  Input,
  Spacer,
  VStack,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  const [userToken, setUserToken] = React.useState("");

  const handleClick = (event) => {
    event.preventDefault();
    console.log(userToken);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setUserToken(value);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {/* <Center> */}
      <VStack spacing="30px">
        <Text fontSize="4xl">Type your Edpuzzle User Token</Text>
        <Input value={userToken} onChange={onChange} placeholder="User token" />
        <Button
          colorScheme="blue"
          size="lg"
          width="200px"
          isDisabled={userToken === "" ? true : false}
        >
          <Link href={`/classrooms/${userToken}`}>
            <a>Go</a>
          </Link>
        </Button>
      </VStack>
      {/* </Center> */}
    </Flex>
  );
}
