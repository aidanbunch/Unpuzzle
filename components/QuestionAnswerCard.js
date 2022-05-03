import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";

export default function QuestionAnswerCard({ question }) {
  const [frq, setFrq] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  // console.log(question);

  async function getOpenEndedAnswer(question) {
    if (question.type === "open-ended") {
      const response = await fetch("/api/getAns/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: question.body }),
      });

      const data = await response.json();
      // console.log(data.answer);
      setFrq(data.answer);
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    setIsLoading(!isLoading);
    getOpenEndedAnswer(question);
  };

  const questionType = question.type;

  let openEndedButton;

  if (questionType === "open-ended") {
    openEndedButton = (
      <Button
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Generating response"
        mt={5}
        w={"full"}
        bg={"blue.400"}
        color={"white"}
        rounded={"xl"}
        boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
      >
        Generate another response
      </Button>
    );
  }

  React.useEffect(() => {
    // on appear
    if (questionType === "open-ended") {
      getOpenEndedAnswer(question);

      // setFrq("ajsdkflajsdlkfj asdlfk jasldkfjaslkjfsakl");
    }
  }, []);

  return (
    <Center>
      <Box
        m={10}
        // maxW={"660px"}
        w="660px"
        // w={"100%"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded="lg"
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"2xl"} fontWeight={500}>
              {question.body}
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.100", "gray.900")} px={6} py={10}>
          <Center>
            {questionType === "open-ended" ? (
              <Textarea defaultValue={frq}></Textarea>
            ) : (
              <List spacing={3}>
                {question.correctChoices.map((choice, index) => (
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    {choice.choiceText}
                  </ListItem>
                ))}
              </List>
            )}
          </Center>

          {openEndedButton}
        </Box>
      </Box>
    </Center>
  );
}
