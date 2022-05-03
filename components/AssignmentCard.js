import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Spacer,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function AssignmentCard({
  color,
  assignmentTitle,
  assignmentID,
}) {
  return (
    // <Link
    //   href={`/assignments/${userToken}---${className}---${backgroundColorName}---${id}`}
    // >
    <Link href={`/answers/${assignmentID}`}>
      <Box w="100%" alignItems="center">
        <Center>
          <Box
            w="100%"
            bg={useColorModeValue(`${color}`, "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={10}
            overflow={"hidden"}
          >
            <Stack>
              <Heading color={"white"} fontSize={"2xl"} fontFamily={"body"}>
                {assignmentTitle}
              </Heading>
            </Stack>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <Text color={"gray.300"} fontWeight={600}></Text>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Link>
  );
}
