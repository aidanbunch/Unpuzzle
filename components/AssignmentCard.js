import React from "react";
import {
  Box,
  Center,
  Heading,
  Stack,
  AspectRatio,
  Spacer,
  HStack,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

export default function AssignmentCard({
  color,
  thumbnailURL,
  assignmentTitle,
  assignmentID,
  attemptId,
  userToken,
  classroomID,
}) {
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
