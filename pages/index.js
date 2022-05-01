import { useRouter } from "next/router";
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
  const router = useRouter;

  const [userToken, setUserToken] = React.useState("");

  const handleClick = (event) => {
    e.preventDefault();
    router.push(`/classroom/${userToken}`);
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
          <Link
            onClick={(e) => handleClick(e)}
            href={`/classrooms/${userToken}`}
          >
            Go
          </Link>
        </Button>
      </VStack>
      {/* </Center> */}
    </Flex>
  );
}
