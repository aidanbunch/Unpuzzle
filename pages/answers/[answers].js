import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import QuestionAnswerCard from "../../components/QuestionAnswerCard.js";

import {
  Box,
  Heading,
  VStack,
  HStack,
  Flex,
  Spacer,
  Button,
  Center,
  useColorModeValue,
  useBreakpointValue,
  useToast,
  Text,
  Wrap,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Head from "next/head";

function removeBackslashes(str) {
  return str.replace(/\\/g, "");
}

function replaceHTMLTags(string) {
  return string
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/\&nbsp;/g, "")
    .replace(/(&quot\;)/g, '"')
    .replace(/\&#39;/g, "");
}

export async function getServerSideProps(context) {
  // var answersJSON = [];

  var questionJSON = [];
  const color = context.query.color;
  const assignmentTitle = context.query.assignmentTitle;
  const attemptId = context.query.attemptId;
  const userToken = context.query.userToken;
  const classroomID = context.query.classroomID;
  const assignmentID = context.query.assignmentID

  // const teacherToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2ZTk5MzFlZDFiMjQyZjBiNWMxYmUiLCJyb2xlIjoidGVhY2hlciIsInJlZ2lzdGVyZWRBdCI6MTY1MDkxMTYzNSwiaXNBZG1pbiI6ZmFsc2UsImJlY29tZVRoaXNVc2VyIjpmYWxzZSwidXNlcklkQmVjb21pbmdUaGlzVXNlciI6IiIsImlzT3BlbkNsYXNzcm9vbVVzZXIiOmZhbHNlLCJpc0x0aVVzZXIiOmZhbHNlLCJpc1VzZXJVc2luZ1RoaXJkUGFydHlBcHBsaWNhdGlvbiI6ZmFsc2UsImlhdCI6MTY1MTYyMDYwMCwiZXhwIjoxNjUyMjI1NDAwLCJqdGkiOiI2MjcxYmFmODYyNWMzMzQyZDZlMDI2ZTYifQ.kHLwvReWTEMOTu4-H9MTe2k1rz0voIKL-wxASucdQYQ";

  try {
    const response = await axios.get(
      `https://edpuzzle.com/api/v3/assignments/classrooms/${classroomID}/students?needle=`,
      {
        headers: {
          Cookie: `G_ENABLED_IDPS=google; token=${userToken}; G_AUTHUSER_H=2`,
          "x-edpuzzle-web-version": "7.31.320.9991544718109210",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
          "x-edpuzzle-referrer": `https://edpuzzle.com/classes`,
        },
      }
    );
    const medias = response.data.medias;


    medias.forEach((media) => {
      if (assignmentID === media._id) {
        var openEndedCount = 0;
        media.questions.forEach((question) => {

          if (question.type === "open-ended") {
            // no answer -> need openai
            openEndedCount += 1;
            const questionObj = {};

            const openEndedAnswer = "";
            questionObj["bodyDisplay"] = removeBackslashes(question.body[0].html);
            questionObj["body"] = replaceHTMLTags(question.body[0].html);
            questionObj["type"] = question.type;
            questionObj["id"] = question._id;

            questionObj["openEndedAnswer"] = openEndedAnswer;

            questionJSON.push(questionObj);
          } else {
            // is multiple choice
            const questionObj = {};
            questionObj["bodyDisplay"] = removeBackslashes(question.body[0].html);
            questionObj["body"] = replaceHTMLTags(question.body[0].html);
            questionObj["type"] = question.type;
            questionObj["id"] = question._id;

            const qChoices = question.choices;
            const correctChoices = [];
            qChoices.forEach((choice) => {
              if (choice.isCorrect === true) {
                const choiceObj = {
                  choiceText: `${removeBackslashes(choice.body[0].html)}`,
                  choiceNumber: `${choice.choiceNumber}`,
                  choiceID: `${choice._id}`,
                };

                correctChoices.push(choiceObj);
              }
            })

            questionObj["correctChoices"] = correctChoices;
            questionJSON.push(questionObj)
          }
        });


      }
    })
    return {
      props: {
        answers: questionJSON,
        color: color,
        assignmentTitle: assignmentTitle,
        attemptId: attemptId,
        userToken: userToken,
      },
    };
  } catch (err) {
    return {
      props: {
        answers: [],
        color: color,
        assignmentTitle: "error",
      }
    }
  }

}

export default function Assignment({
  answers,
  color,
  assignmentTitle,
  attemptId,
  userToken,
}) {

  const [elRefs, setElRefs] = useState([]);
  console.log(elRefs);

  useEffect(() => {
    setElRefs((elRefs) =>
      answers
        .map((_, i) => elRefs[i] || createRef())
    );
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  async function getOpenEndedAnswer(question) {
    if (question.type === "open-ended") {
      const response = await fetch("/api/get-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: question.body }),
      });

      const data = await response.json();
      return data.answer;
    }
  }




  const submitAnswers = async () => {
    let arrayRefCount = 0;

    var noError = true;
    setIsLoading(true);

    console.log(attemptId);

    const videoResponse = await axios.post("/api/complete-video", {
      attemptId: attemptId,
      userToken: userToken,
    });

    const count = answers.length;
    if (count === 0) {
      setIsLoading(false);
      toast({
        title: "Completed assignment.",
        description: "We've submitted the answers for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    for (let question of answers) {
      if (question.type === "open-ended") {
        const openEndedAns = elRefs[arrayRefCount].getElementsByClassName('chakra-textarea')[0].value

        const response = await axios.post("/api/complete-questions", {
          type: question.type,
          attemptId: attemptId,
          questionId: question.id,
          userToken: userToken,
          openEndedBody: question.body,
          openEndedAnswer: openEndedAns,
        });

        count -= 1;

        if (count == 0) {
          setIsLoading(false);
          toast({
            title: "Completed assignment.",
            description: "We've submitted the answers for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }

        if (response.error) {
          noError = false;
        }
      } else {
        const response = await axios.post("/api/complete-questions", {
          type: question.type,
          attemptId: attemptId,
          questionId: question.id,
          userToken: userToken,
          correctChoices: question.correctChoices,
        });

        count -= 1;

        if (count == 0) {
          setIsLoading(false);
          toast({
            title: "Completed assignment.",
            description: "We've submitted the answers for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      }
      arrayRefCount += 1;
    }
  };

  const returnOpenEnded = () => {
    for(const answerEl of elRefs) {
      const openEndedTextVal = answerEl.getElementsByClassName('chakra-textarea')[0]
      if (typeof(openEndedTextVal) != "undefined") {
        console.log(openEndedTextVal.value)
      }
    }

  }

  return (
    <>
      <Head>
        <title>Answers</title>
      </Head>
      <Box m={10}>
        <VStack spacing={0}>
          <Flex w="100%">
            <BackButton />
            <Spacer />

            <HStack align mx={10}>
              <Wrap>
                <Heading color={`${color}`} size="xl">
                  {assignmentTitle}
                </Heading>
                <Heading color={useColorModeValue("black", "white")} size="xl">
                  {" "}
                  answers
                </Heading>
              </Wrap>
            </HStack>

            <Spacer />
          </Flex>

          <VStack spacing={-5}>
            <Button
              onClick={() => submitAnswers()}
              m={10}
              loadingText={"Submiting answers..."}
              isLoading={isLoading}
              w={answers.length > 0 ? "40%" : "100%"}
              minW={"250px"}
              h={"8vh"}
              colorScheme="blue"
              rounded={"3xl"}
            >
              <Text
                fontSize={useBreakpointValue({ base: "lg", md: "xl" })}
                fontWeight={"semibold"}
              >
                Finish assignment for me
              </Text>
            </Button>

            <VStack spacing={0}>
              {answers.map((question, index) => (


                <div key={index} ref={el => elRefs[index] = el}>
                  <QuestionAnswerCard

                    key={index}
                    question={question}
                  />
                </div>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
}

