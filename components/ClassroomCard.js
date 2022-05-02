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

export default function ClassroomCard({
  className,
  teacherName,
  backgroundColorName,
  id,
  userToken,
}) {
  return (
    <Link
      href={`/assignments/${userToken}---${className}---${backgroundColorName}---${id}`}
    >
      <Box w="100%">
        <Center py={6}>
          <Box
            w="100%"
            bg={useColorModeValue(`${backgroundColorName}`, "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={10}
            overflow={"hidden"}
          >
            <Stack>
              <Heading color={"white"} fontSize={"2xl"} fontFamily={"body"}>
                {className}
              </Heading>
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Text color={"gray.300"} fontWeight={600}>
                {teacherName}
              </Text>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Link>
  );
}
