import Router, { createRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import {AiFillChrome} from "react-icons/ai"
import {
  Flex,
  Center,
  Heading,
  Input,
  VStack,
  Button,
  Box,
  Stack,
  useColorModeValue,
  Text,
  Icon,
  chakra,
  HStack,
  Link,
} from "@chakra-ui/react";
import HorizontalAd from "../components/HorizontalAd";
import Footer from "../components/Footer";
import { useUser } from "../context/user";

export default function Edpuzzle() {
  const { user } = useUser();
  useEffect(() => {
    if (user == null) {
      Router.push("/");
    }
  });

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

  const sendUserToVideo = (e) => {
    e.preventDefault();

    if (/\bCrOS\b/.test(navigator.userAgent)) {
      window
        .open("https://www.youtube.com/watch?v=GzPwb-8fPtk", "_blank")
        .focus();
    } else {
      var isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(
          !window["safari"] ||
          (typeof safari !== "undefined" && window["safari"].pushNotification)
        );
      if (isSafari) {
        window
          .open("https://www.youtube.com/watch?v=P1fChOsTJqk", "_blank")
          .focus();
        // is mac
      } else {
        // is windows
        window
          .open("https://www.youtube.com/watch?v=oT9rZfq4kp8", "_blank")
          .focus();
      }
    }
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
      <Flex
        minHeight="70vh"
        alignItems="center"
        justifyContent="center"
        mx={10}
      >
        <VStack>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
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
          </Stack>
          <Text
            color={useColorModeValue("gray.400", "gray.500")}
            fontWeight={"semibold"}
          >
            Need help?{" "}
            <Link onClick={sendUserToVideo} color={"blue.400"}>
              {" "}
              Watch this
            </Link>
          </Text>
          <Text
            color={useColorModeValue("gray.400", "gray.500")}
            fontWeight={"semibold"}
          >
            or use our{" "}
            <Link
              onClick={() =>
                window
                  .open(
                    "https://chrome.google.com/webstore/detail/unpuzzle/bkhmfdnoifikoinnhgbalpejgdakdlpc?",
                    "_blank"
                  )
                  .focus()
              }
              color={"blue.400"}
              target={"_blank"}
            >
              {" "}
            
              Chrome Extension
              
            </Link>
          </Text>
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
