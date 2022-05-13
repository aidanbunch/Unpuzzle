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
import { FaCheckCircle } from "react-icons/fa";
import Footer from "../components/Footer";
import {useUser} from "../context/user"
import Router from "next/router";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  const {user} = useUser();

  let buyButton;

  if(user) {
    buyButton = (
      <Button w="full" colorScheme="blue">
      Buy
    </Button>
    )
  } else {
    buyButton = (
      <Button onClick={() => {
        Router.push("/login")
      }} w="full" colorScheme="blue">
        Log in First
    </Button>
    )
  }


  return (
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
              Please donate to help 2 high school developers pay for hosting fees
            </Text>
          </VStack>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
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
                    1.99
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                <ListItem opacity={"0.0"}>
                    Placeholder

                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    No Ads
                  </ListItem>
               
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Special Sponsor Badge
                  </ListItem>
                  <ListItem opacity={"0.0"}>
                    Placeholder

                    </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  {buyButton}
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
                      No Ads
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Special Sponsor Badge
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Customer Support
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Early access to Features
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      1 free Essay per week
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    {buyButton}
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
                    Same Benefits as Gold
                  </ListItem>
              
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Special Platinum Badge 
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Name on Landing page
                  </ListItem>
     
            
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Unlimited Essays
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  {buyButton}
                </Box>
              </VStack>
            </PriceWrapper>
          </Stack>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
}
