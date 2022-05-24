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
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";

export default function QuestionAnswerCard({ question }) {
  const [frq, setFrq] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  async function getOpenEndedAnswer(question) {
    if (question.type === "open-ended") {
      const response = await fetch("/api/get-answer/", {
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
  let blankComponent;

  openEndedButton = (
    <Button
      onClick={handleClick}
      isLoading={isLoading}
      loadingText="Generating response"
      mt={5}
      w={"full"}
      colorScheme="blue"
      rounded={"xl"}
      fontSize={useBreakpointValue({ base: "sm", md: "medium" })}
    >
      Generate another response
    </Button>
  );

  React.useEffect(() => {
    // on appear
    console.log(question.body)
    if (questionType === "open-ended") {
      getOpenEndedAnswer(question);
    }
  }, []);

  return (
    <Center>
      <Box
        m={10}
        maxW={"660px"}
        w="80vw"
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
            <Text fontSize={"2xl"} fontWeight={500} dangerouslySetInnerHTML={{ __html: question.bodyDisplay }} />
            {/* <Text fontSize={"2xl"} fontWeight={500}>
              {question.body}
            </Text> */}
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.100", "gray.900")} px={6} py={10}>
          <Center>
            {questionType === "open-ended" ? (
              <Textarea
                defaultValue={frq}
                value={frq}
                onChange={(e) => { setFrq(e.target.value) }}
              />
            ) : (
              <List spacing={3}>
                {question.correctChoices.map((choice, index) => (
                  <ListItem key={index}>
                    <HStack>
                      <ListIcon as={CheckIcon} color="green.400" />
                      <Text fontSize={"md"} dangerouslySetInnerHTML={{ __html: choice.choiceText }} />
                    </HStack>

                    {/* <ListIcon as={CheckIcon} color="green.400" />
                    {choice.choiceText} */}
                  </ListItem>
                ))}
              </List>
            )}
          </Center>

          {questionType === "open-ended" ? openEndedButton : blankComponent}
        </Box>
      </Box>
    </Center>
  );
}
