import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Button,
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
      href={{
        pathname: `/assignments/${id}`,
        query: {
          userToken: `${userToken}`,
          className: `${className}`,
          bgColor: `${backgroundColorName}`,
        },
      }}
      passHref
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
            transition="transform 200ms ease-in-out"
            _hover={{transform: "scale(1.05)"}}
          >
            <Stack>
              <Heading color={useColorModeValue("white", `${backgroundColorName}`)} fontSize={"2xl"} fontFamily={"body"}>
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
