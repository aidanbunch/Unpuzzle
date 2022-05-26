import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Router from "next/router";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Answers</title>
      </Head>
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
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, blue.400, blue.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"gray.500"} mb={6}>
              {"The page you're looking for does not seem to exist."}
            </Text>

            <Button
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
              color="white"
              variant="solid"
              onClick={function () {
                Router.back();
                Router.back();
              }}
            >
              Go to Previous Page
            </Button>
          </Box>
        </Flex>
        <Footer />
      </Box>
    </>
  );
}
