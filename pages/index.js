import Router from "next/router";
import Head from "next/head";
import React from "react";
import {
  Flex,
  Center,
  Heading,
  Input,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HorizontalAd from "../components/HorizontalAd";
import Footer from "../components/Footer";

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
    <Box
      minHeight={{
        base: ["-webkit-fill-available", "fill-available", "-moz-available"],
        lg: "100vh",
      }}
      display="flex"
      flexDirection="column"
    >
      {/* <Head>
      <script
        id="Adsense-id"
        data-ad-client="ca-pub-4915743237608302"
        async="true"
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
       </Head>  */}
      <Navbar currentPage={"home"} />
      <Flex height="50vh" alignItems="center" justifyContent="center" mx={10}>
        <VStack spacing="30px">
          <Heading textAlign="center" fontSize="4xl">
            Type your Edpuzzle User Token
          </Heading>
          <Input
            value={userToken}
            onChange={onChange}
            placeholder="User token"
          />
          <Button
            isLoading={isLoading}
            loadingText="Logging you in..."
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
      <Center>
        <HorizontalAd />
      </Center>
      {/* <Box position="relative" bottom="0" width="100%" height="100px"> */}
      <Footer />
    </Box>
  );
}
