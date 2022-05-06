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
import Navbar from "../components/Navbar";

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
  return (
    <Box
      minHeight={{
        base: ["-webkit-fill-available", "fill-available", "-moz-available"],
        lg: "100vh",
      }}
      display="flex"
      flexDirection="column"
    >
      <Navbar />
      <Stack spacing={0}>
        <Box py={10}>
          <VStack spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl">
              Donations
            </Heading>
            <Text fontSize="lg" color={"gray.500"}>
              Help 2 high school developers pay for hosting and food
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
                  Mediocre
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
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Buy
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="blue" variant="outline">
                    Buy
                  </Button>
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
                    Most Popular
                  </Text>
                </Box>
                <Box py={4} px={12}>
                  <Text fontWeight="600" fontSize="2xl">
                    Ordinary
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
                      unlimited build minutes
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Lorem, ipsum dolor.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      5TB Lorem, ipsum dolor.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      5TB Lorem, ipsum dolor.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      5TB Lorem, ipsum dolor.
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="blue">
                      Buy
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="600" fontSize="2xl">
                  Wealthy
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
                    unlimited build minutes
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="blue" variant="outline">
                    Buy
                  </Button>
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