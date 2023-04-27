import { useRef, useState } from "react";
import { Center, Container, Heading, HStack, ListItem, UnorderedList, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Input, Box, Button, Stack, Text } from '@chakra-ui/react'
import emailjs from "emailjs-com"
import {
  Select,
  Drawer,
  FormControl,
  FormLabel,
  Divider,
  Flex,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

export default function Apply() {
  const form = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [timezone, setTimezone] = useState("")


  const sendEmail = () => {

    const templateParams = {
      firstName: fName,
      lastName: lName,
      email: email,
      tiktok: tiktok,
      timezone: timezone
    }

    emailjs.send("service_aodvok2", "template_9ai7r8w", templateParams, "4G2DVS2SOh7KXRvEQ")
      .then(function(response) {
        // console.log('SUCCESS!', response.status, response.text);
        toast({
          title: 'Success!',
          description: "Your application has been sent.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        onClose()
      }, function(error) {
        // console.log('FAILED...', error);
        toast({
          title: 'Error',
          description: "There was a problem sending your application, please try again later.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })

        onClose()
      });
  }

  return (
    <>

      <Drawer onClose={onClose} isOpen={isOpen} size='full'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"bold"} fontSize="2xl">Apply for Social Media Manager Intern Position (North America)</DrawerHeader>

          <DrawerBody>
            <Container h={"100vh"}>

              <Center>
                <Stack spacing="5" direction={{ base: "column", md: "row" }} minH="100%">

                  <HStack minH="100%">
                    <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '4', md: '6' }}>
                      <Text fontSize={"lg"} py="4" fontWeight="medium">Responsibilities</Text>
                      <UnorderedList spacing={"3"}>
                        <ListItem>
                          
                          Brainstorm and create engaging content that aligns with the company&apos;s brand and goals.
                        </ListItem>
                        <ListItem>
                          Manage the account&apos;s posting schedule and ensure timely delivery of content.
                        </ListItem>
                        <ListItem>
                          Respond to user comments and messages in a timely and professional manner
                        </ListItem>
                      </UnorderedList>
                      <Text fontSize={"lg"} py="4" fontWeight="medium">Benefits</Text>
                      <UnorderedList spacing={"3"}>
                        <ListItem>
                          Hands-on experience managing a business social media account.
                        </ListItem>
                        <ListItem>
                          Exposure to the inner workings of a fast-paced team environment
                        </ListItem>
                        <ListItem>
                          Opportunity to develop skills in content creation, social media marketing, and analytics.
                        </ListItem>
                        <ListItem fontWeight={"bold"}>
                          Free Unpuzzle Platinum Tier
                        </ListItem>
                      </UnorderedList>
                    </Box>

                  </HStack>

                  <Box minH="100%" as="form" bg="bg-surface" boxShadow="sm" borderRadius="lg" >
                    <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                      <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                        <FormControl id="firstName">
                          <FormLabel>First Name</FormLabel>
                          <Input defaultValue="" onChange={(e) => setFName(e.target.value)} />
                        </FormControl>
                        <FormControl id="lastName">
                          <FormLabel>Last Name</FormLabel>
                          <Input defaultValue="" onChange={(e) => setLName(e.target.value)} />
                        </FormControl>
                      </Stack>
                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input defaultValue="" onChange={(e) => setEmail(e.target.value)} />
                      </FormControl>
                      <FormControl id="timezone">
                        <FormLabel>Timezone</FormLabel>
                        <Select placeholder='Select time zone' onChange={(e) => {
                          const selectValue = e.target.selectedOptions[0].value;
                          console.log(selectValue)
                          setTimezone(selectValue);

                        }
                        }
                        >
                          <option value='Pacific'>Pacific Time Zone</option>
                          <option value='Eastern'>Eastern Time Zone</option>
                          <option value='Central'>Central Time Zone</option>
                          <option value='Mountain'>Mountain Time Zone</option>
                          <option value='Alaska'>Alaska Time Zone</option>
                          <option value='Hawaii-Aleutian'>Hawaii-Aleutian Time Zone</option>
                        </Select>
                      </FormControl>
                      <FormControl id="tiktok">
                        <FormLabel>TikTok Handle</FormLabel>
                        <Input defaultValue="@" onChange={(e) => setTiktok(e.target.value)} />
                      </FormControl>
                      {/* <Stack spacing="6" direction={{ base: 'column', md: 'row' }}> */}
                      {/*   <FormControl id="city"> */}
                      {/*     <FormLabel>City</FormLabeNorth America
                      {/*     <Input defaultValue="Berlin" /> */}
                      {/*   </FormControl> */}
                      {/*   <FormControl id="state"> */}
                      {/*     <FormLabel>State / Province</FormLabel> */}
                      {/*     <Input /> */}
                      {/*   </FormControl> */}
                      {/*   <FormControl id="zip"> */}
                      {/*     <FormLabel>ZIP/ Postal Code</FormLabel> */}
                      {/*     <Input defaultValue="10961" /> */}
                      {/*   </FormControl> */}
                      {/* </Stack> */}
                    </Stack>
                    <Divider />
                    <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                      <Button onClick={sendEmail} variant="primary">
                        Send Application
                      </Button>
                    </Flex>
                  </Box>
                </Stack>
              </Center>

            </Container>

          </DrawerBody>

        </DrawerContent>
      </Drawer >
      <VStack spacing="4">
        <Text pt="4" fontSize={"5xl"} fontWeight="bold">Open Positions</Text>

        {/* <Box as="section" py={{ base: '4', md: '8' }}> */}
        <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '4', md: '6' }}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '5', md: '6' }}
            justify="space-between"
            align="center"
          >
            <Stack spacing="1">
              <Text fontSize="lg" fontWeight="medium">
                Social Media Manager Intern
              </Text>
              <Text fontSize="sm" color="muted">
                Running the official TikTok account
              </Text>
            </Stack>
            <Box>
              <Button variant="primary" onClick={() => onOpen()}>Apply</Button>
            </Box>
          </Stack>
        </Box>
        {/* </Box> */}
      </VStack>
    </>

  );
}
