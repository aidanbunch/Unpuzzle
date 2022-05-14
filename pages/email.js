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
  useToast,
} from "@chakra-ui/react";
import {
  BsEnvelopeFill,
  BsFillChatLeftFill,
  BsPlayBtnFill,
  BsDiscord,
} from "react-icons/bs";
import Footer from "../components/Footer";
import { supabase } from "../utils/supabaseClient";

export default function ContactFormWithSocialButtons() {
  const [firstName, setFirstName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')

  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false)

  const insertMessageIntoDatabase = async (event, firstName, email, subject, message) => {
    event.preventDefault();

    setIsLoading(true)

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          firstName: `${firstName}`,
          emailAddress: `${email}`,
          subject: `${subject}`,
          message: `${message}`,
        }
      ])

    if (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: "Error sending message.",
        description: "Sorry, we ran into some trouble sending your message.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setIsLoading(false)

      setFirstName("")
      setEmail("")
      setSubject("")
      setMessage("")

      toast({
        title: "Sent message.",
        description: "We've received your feedback!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
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
            <Box as="form" mb={6} rounded="lg" shadow="xl"
            onSubmit={(event) =>
              (insertMessageIntoDatabase(
                event,
                firstName,
                email,
                subject,
                message))
              }
            >
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
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Flex>
                  <Input
                    onChange={(event) => { setFirstName(event.target.value) }}
                    value={firstName}
                    mt={0}
                    type="text"
                    placeholder="First Name"
                    required={true}
                  />
                </Flex>
                <Flex>
                  <Input
                    onChange={(event) => { setEmail(event.target.value) }}
                    value={email}
                    mt={0}
                    type="email"
                    placeholder="Email Address"
                    required={true}
                  />
                </Flex>
                <Flex>
                  <Input
                    onChange={(event) => { setSubject(event.target.value) }}
                    value={subject}
                    mt={0}
                    type="text"
                    placeholder="Subject"
                    required={true}
                  />
                </Flex>
                <Flex>
                  <Input
                    onChange={(event) => { setMessage(event.target.value) }}
                    value={message}
                    mt={0}
                    type="text"
                    placeholder="Message"
                    required={true}
                  />
                </Flex>
                <Button
                  colorScheme="blue"
                  w="full"
                  py={2}
                  loadingText="Sending message..."
                  isLoading={isLoading}
                  type={"submit"}
                >
                  Send
                </Button>
              </SimpleGrid>
            </Box>
            <Center>
              <HStack spacing={"5"}>
                <IconButton
                  onClick={() =>
                    window
                      .open(
                        "https://www.youtube.com/channel/UCcowS8MwbwWz7Mrhg81b5aQ",
                        "_blank"
                      )
                      .focus()
                  }
                  aria-label="youtube"
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
                  onClick={() =>
                    (parent.location = "mailto:unpuzzledsoftware@gmail.com")
                  }
                  aria-label="email"
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
                  onClick={() =>
                    window
                      .open("https://discord.com/invite/7hvgXrfS5f", "_blank")
                      .focus()
                  }
                  aria-label="discord"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  icon={<BsDiscord />}
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
