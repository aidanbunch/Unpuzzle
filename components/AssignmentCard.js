import React from "react";
import {
  Box,
  Center,
  Heading,
  Spacer,
  HStack,
  Image,
  VStack,
  Icon,
  IconButton,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  BsCheck,
  BsCheckCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

export default function AssignmentCard({
  color,
  thumbnailURL,
  assignmentTitle,
  assignmentID,
  attemptId,
  userToken,
  classroomID,
  isComplete,
}) {
  let blankComponent;
  return (
    // <Link
    //   href={`/assignments/${userToken}---${className}---${backgroundColorName}---${id}`}
    // >
    <Link
      href={{
        pathname: `/answers/${assignmentID}`,
        query: {
          assignmentTitle: `${assignmentTitle}`,
          color: `${color}`,
          attemptId: `${attemptId}`,
          userToken: `${userToken}`,
          classroomID: `${classroomID}`,
          assignmentID: `${assignmentID}`,
        },
      }}
      passHref
    >
      <Box maxW={"500px"} w="100%" alignItems="center">
        <Box w="100%">
          <Center py={6}>
            <Box
              w="100%"
              bg={`${color}`}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={10}
              overflow={"hidden"}
              transition="transform 200ms ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            >
              <HStack>
                {isComplete ? (
                  <Icon boxSize={8} color={"white"} mr={6} mt={2}>
                    <BsFillCheckCircleFill />
                  </Icon>
                ) : (
                  blankComponent
                )}
                {thumbnailURL.includes("api") ? (
                  <Box h="90px"></Box>
                ) : (
                  <Image
                    h="90px"
                    borderRadius={"md"}
                    title="Assignment Thumbnail URL"
                    src={thumbnailURL}
                    alt="Assignment Thumbnail"
                    allowFullScreen
                  />
                )}

                <Spacer />
                <Heading
                  textAlign="center"
                  color={"white"}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {assignmentTitle}
                </Heading>
                <Spacer />
              </HStack>
            </Box>
          </Center>
        </Box>
      </Box>
    </Link>
  );
}
