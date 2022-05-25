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
} from "@chakra-ui/react";
import AppleAuthButton from "../components/AppleAuthButton";
import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";
import GithubAuthButton from "../components/GithubAuthButton";
import DiscordAuthButton from "../components/DiscordAuthButton";
import { useToast } from "@chakra-ui/react";
import { user, useUser } from "../context/user";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const toast = useToast();
  const toastIdRef = useRef();

  const { loginWithEmail } = useUser();

  function addToast(isSuccessful, errorMessage) {
    if (isSuccessful) {
      toastIdRef.current = toast({
        title: "Logged In!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toastIdRef.current = toast({
        title: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const loginEmail = async () => {
    const error = await loginWithEmail(mail, pass);
    if (!error) {
      addToast(true);
    } else {
      addToast(false, error.message);
    }

    // error ? console.log(error) : Router.push("/")
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
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Log in
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
              {/* <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => setMail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setPass(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
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
              </FormControl> */}
              <Stack spacing={10} pt={2}>
                {/* <Button
                  onClick={() => loginEmail}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Log in
                </Button> */}
                <AppleAuthButton />
                <GoogleAuthButton />
                <DiscordAuthButton />
                <GithubAuthButton />
              </Stack>

              {/* <Stack pt={6}>
                <Text align={"center"}>
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup"} color={"blue.400"}>
                    Sign Up
                  </Link>
                </Text>
              </Stack> */}
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </Box>
  );
}
