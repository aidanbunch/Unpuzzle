import React from "react";
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Input,
  Text,
  Link,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import {
  BsEnvelopeFill,
  BsFillChatLeftFill,
  BsPlayBtnFill,
} from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactFormWithSocialButtons() {
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
      <Box px={8} py={24} mx="auto">
        <SimpleGrid
          alignItems="center"
          w={{ base: "full", xl: 11 / 12 }}
          columns={{ base: 1, lg: 11 }}
          gap={{ base: 0, lg: 24 }}
          mx="auto"
        >
          <GridItem
            colSpan={{ base: "auto", lg: 7 }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <chakra.h1
              mb={4}
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              lineHeight={{ base: "shorter", md: "none" }}
              color={useColorModeValue("gray.900", "gray.200")}
              letterSpacing={{ base: "normal", md: "tight" }}
            >
              Contact Us
            </chakra.h1>
            <chakra.p
              mb={{ base: 10, md: 4 }}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="normal"
              color="gray.500"
              letterSpacing="wider"
            >
              Want to get in touch? Contact us with any questions or concerns
              you may have.
            </chakra.p>
          </GridItem>
          <GridItem colSpan={{ base: "auto", md: 4 }}>
            <Box as="form" mb={6} rounded="lg" shadow="xl">
              <Center pb={0} color={useColorModeValue("gray.700", "white")}>
                <Text fontWeight={"extrabold"} fontSize="2xl">
                  Send a message
                </Text>
              </Center>
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Flex>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="First Name"
                    required="true"
                  />
                </Flex>
                <Flex>
                  <Input
                    mt={0}
                    type="email"
                    placeholder="Email Address"
                    required="true"
                  />
                </Flex>
                <Flex>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="Subject"
                    required="true"
                  />
                </Flex>
                <Flex>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="Message"
                    required="true"
                  />
                </Flex>
                <Button colorScheme="blue" w="full" py={2} type="submit">
                  Send
                </Button>
              </SimpleGrid>
            </Box>
            <Center>
              <HStack spacing={"5"}>
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsPlayBtnFill />}
                  _hover={{
                    bg: "blue.500",
                    color: useColorModeValue("white", "gray.700"),
                  }}
                  isRound
                />
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsEnvelopeFill />}
                  _hover={{
                    bg: "blue.500",
                    color: useColorModeValue("white", "gray.700"),
                  }}
                  isRound
                />
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsFillChatLeftFill />}
                  _hover={{
                    bg: "blue.500",
                    color: useColorModeValue("white", "gray.700"),
                  }}
                  isRound
                />
              </HStack>
            </Center>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}
