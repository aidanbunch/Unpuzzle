import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Router from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function SignupCard() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const toastIdRef = React.useRef();

  function addToast() {
    toastIdRef.current = toast({
      title: "Account created!",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  // const signUp = async () => {
  // }

  const signup = async (e) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: mail,
      password: pass,
    });

    console.log(user);
    if (!error) {
      console.log(user);
      addToast();
      Router.push("/");
    } else {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
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
      <Flex
        minH={"100vh"}
        align={"top"}
        justify={"center"}
        // bg={useColorModeValue('white',)}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text
              fontSize={"lg"}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                onChange={(event) => setMail(event.target.value)}
                id="email"
                isRequired
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup onChange={(event) => setPass(event.target.value)}>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={5} pt={2}>
                <Button
                  onClick={signup}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
                <GoogleAuthButton onClick={loginWithGoogle} />
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </Box>
  );
}
