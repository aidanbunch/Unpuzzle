import Confetti from "react-confetti";
import {
  Stack,
  VStack,
  Heading,
  Button,
  Flex,
  useColorModeValue,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useWindowSize } from "react-use";
import { useState, useEffect } from "react";

function Success() {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <Box
        minHeight={{
          base: ["-webkit-fill-available", "fill-available", "-moz-available"],
          lg: "100vh",
        }}
        display="flex"
        flexDirection="column"
      >
        <Flex
          minHeight="70vh"
          alignItems="center"
          justifyContent="center"
          mx={10}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"xl"}
            p={10}
            my={12}
          >
            <VStack spacing="30px">
              <CheckCircleIcon w={50} h={50} color="green.500" />
              <Heading
                textAlign="center"
                fontSize="5xl"
                bgGradient="linear(to-r, green.300, green.600)"
                backgroundClip="text"
              >
                Successful Payment
              </Heading>
              <Text fontWeight={"bold"} fontSize={"2xl"} color="green.400">
                Thank you for your donation!
              </Text>
              <Button
                background={
                  "linear-gradient(90deg, #68D391, #2F855A 51%, #68D391) var(--x, 0)/ 200%"
                }
                size="lg"
                textColor="white"
                transition="0.5s"
                _hover={{ "--x": "100%" }}
                width="200px"
                onClick={(e) => handleClick(e)}
              >
                Back to Home
              </Button>
            </VStack>
          </Stack>
        </Flex>
        <Footer />
      </Box>
      <Confetti width={width} height={height} />
    </>
  );
}

export default Success;
