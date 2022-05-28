import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Footer from "../components/Footer";
import { useUser } from "../context/user";
import Router from "next/router";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function PriceWrapper({ children }) {
  return (
    <Box
    maxWidth={"300px"}
      mb={4}
      shadow="base"
      borderWidth="1px"
      // p={5}
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  const { user } = useUser();

  const sendCheckoutPostRequest = async (planID) => {

    const res = await fetch("api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planID: planID,
        stripeCustomerID: user.stripe_customer,
      }),
    });
    const body = await res.json();
    window.location.href = body.url;
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Donate</title>
      </Head>
      <Box
        minHeight={{
          base: ["-webkit-fill-available", "fill-available", "-moz-available"],
          lg: "100vh",
        }}
        display="flex"
        flexDirection="column"
      >
        <Stack spacing={0}>
          <Box py={10}>
            <VStack spacing={2} textAlign="center">
              <Heading as="h1" fontSize="4xl">
                Premium Tiers
              </Heading>
              <Text fontSize="lg" color={"gray.500"}>
                Your donations help keep Unpuzzle free and accessible for
                everyone!
              </Text>
            </VStack>
            <Stack
              direction={{ base: "column", md: "row" }}
              textAlign="center"
              justify="center"
              spacing={{ base: 4, lg: 10 }}
              py={10}
              flex={1}
            >
              <PriceWrapper>
                <Box py={4} px={12}>
                  <Text fontWeight="600" fontSize="2xl">
                    Bronze
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      $
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      4.99
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={4}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>

                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Bronze Badge
                    </ListItem>
                    <ListItem opacity={"0.0"}>Placeholder</ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    {user ? (
                      <Button
                        onClick={() => {
                          sendCheckoutPostRequest(
                            "price_1L3vVbKCwqQTCCtFlJsmcfnb"
                          );
                        }}
                        w="full"
                        colorScheme="blue"
                      >
                        Buy
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          Router.push("/login");
                        }}
                        w="full"
                        colorScheme="blue"
                      >
                        Log in First
                      </Button>
                    )}
                  </Box>
                </VStack>
              </PriceWrapper>

              <PriceWrapper>
                <Box position="relative">
                  <Box
                    position="absolute"
                    top="-16px"
                    left="50%"
                    style={{ transform: "translate(-50%)" }}
                  >
                    <Text
                      textTransform="uppercase"
                      bg={useColorModeValue("blue.300", "blue.700")}
                      px={3}
                      py={1}
                      color={useColorModeValue("white", "gray.300")}
                      fontSize="sm"
                      fontWeight="600"
                      rounded="xl"
                    >
                      Best Deal
                    </Text>
                  </Box>
                  <Box py={4} px={12}>
                    <Text fontWeight="600" fontSize="2xl">
                      Gold
                    </Text>
                    <HStack justifyContent="center">
                      <Text fontSize="3xl" fontWeight="600">
                        $
                      </Text>
                      <Text fontSize="5xl" fontWeight="900">
                        9.99
                      </Text>
                    </HStack>
                  </Box>
                  <VStack
                    bg={useColorModeValue("gray.50", "gray.700")}
                    py={4}
                    borderBottomRadius={"xl"}
                  >
                    <List spacing={3} textAlign="start" px={12}>
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        No Ads
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        Gold Badge
                      </ListItem>
                    <ListItem opacity={"0.0"}>Placeholder</ListItem>
                    </List>
                    <Box w="80%" pt={7}>
                      {user ? (
                        <Button
                          onClick={() => {
                            sendCheckoutPostRequest(
                              "price_1Kz5X5KCwqQTCCtFIPGQL9L6"
                            );
                          }}
                          w="full"
                          colorScheme="blue"
                        >
                          Buy
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            Router.push("/login");
                          }}
                          w="full"
                          colorScheme="blue"
                        >
                          Log in First
                        </Button>
                      )}
                    </Box>
                  </VStack>
                </Box>
              </PriceWrapper>
              <PriceWrapper>
                <Box py={4} px={12}>
                  <Text fontWeight="600" fontSize="2xl">
                    Platinum
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      $
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      14.99
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={4}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      No Ads
                    </ListItem>

                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                       Platinum Badge
                    </ListItem>

                  </List>
                  <Box w="80%" pt={7}>
                    {user ? (
                      <Button
                        onClick={() => {
                          sendCheckoutPostRequest(
                            "price_1Kz5XqKCwqQTCCtFOfkN5qqs"
                          );
                        }}
                        w="full"
                        colorScheme="blue"
                      >
                        Buy
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          Router.push("/login");
                        }}
                        w="full"
                        colorScheme="blue"
                      >
                        Log in First
                      </Button>
                    )}
                  </Box>
                </VStack>
              </PriceWrapper>
            </Stack>
          </Box>
        </Stack>
        <Footer />
      </Box>
    </>
  );
}
