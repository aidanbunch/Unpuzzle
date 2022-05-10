import React from "react";
import axios from "axios";
import QuestionAnswerCard from "../../components/QuestionAnswerCard.js";
import Navbar from "../../components/Navbar";

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
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import Head from "next/head";

// import returnOpenEndedAnswer from "../../openai.js";
// import {getAnswer} from "../api/getAns"

function replaceHTMLTags(string) {
  return string.replace(/(<([^>]+)>)/gi, "").replace(/\&nbsp;/g, "");
}

// const getOpenEndedAnswer = async (openEndedCount, callback) => {
//   var answerJSON = questionJSON;

//   answerJSON.forEach((question) => {
//     if (question.type === "open-ended") {
//       returnOpenEndedAnswer(question.body).then(function (ans) {
//         question.openEndedAnswer = ans;
//         openEndedCount -= 1;

//         if (openEndedCount == 0) {
//           callback(answerJSON);
//         }
//       });
//     }
//   });
// };

// const getQuestions = async (assignmentId, teacherToken) => {
//   try {
//     const response = await axios.get(
//       `https://edpuzzle.com/api/v3/media/${assignmentId}`,
//       {
//         headers: {
//           Cookie: `_ga=GA1.2.1241878492.1650911605; _gat=1; _gid=GA1.2.834812595.1650911605; token=${teacherToken}; G_ENABLED_IDPS=google; aws-waf-token=a88186e5-53d6-47c2-87cc-dc11d1b0996e:EQoAvlqUCIEAAAAA:xCYpsXen70BVAsBUHGqEX6kssv1k6kQ9wEG88Mj/ioWrStFA69X8mLzXB4MLcj1Z6CNq5OeNVF6DQYD1tezieVlX68uvia05WYlEmq9aK6Qma6xy; G_AUTHUSER_H=4; edpuzzleCSRF=Bul1xHT2hK6JNU4P4Sw33yiI`,
//           "x-edpuzzle-web-version": "7.31.320.9991544718109210",
//           "User-Agent":
//             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
//           // "x-edpuzzle-referrer": `https://edpuzzle.com/assignments/${assignmentId}`,
//         },
//       }
//     );

//     const questions = response.data.questions;

//     var openEndedCount = 0;
//     questions.forEach((question) => {
//       if (question.type === "open-ended") {
//         // no answer -> need openai
//         openEndedCount += 1;
//         const questionObj = {};
//         const questionBody = replaceHTMLTags(question.body[0].html);

//         const openEndedAnswer = "";
//         questionObj["body"] = questionBody;
//         questionObj["type"] = question.type;

//         questionObj["openEndedAnswer"] = openEndedAnswer;

//         questionJSON.push(questionObj);
//       } else {
//         // is multiple choice
//         const questionObj = {};
//         questionObj["body"] = replaceHTMLTags(question.body[0].html);
//         questionObj["type"] = question.type;

//         const qChoices = question.choices;
//         const correctChoices = [];
//         qChoices.forEach((choice) => {
//           if (choice.isCorrect === true) {
//             const choiceObj = {
//               choiceText: `${replaceHTMLTags(choice.body[0].html)}`,
//               choiceNumber: `${choice.choiceNumber}`,
//               choiceID: `${choice._id}`,
//             };

//             correctChoices.push(choiceObj);
//           }
//         });

//         questionObj["correctChoices"] = correctChoices;

//         questionJSON.push(questionObj);
//       }
//     });

//     // return openEndedCount;
//     return {
//       props: {
//         "answers":
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

export async function getServerSideProps(context) {
  // var answersJSON = [];

  var questionJSON = [];
  const assignmentId = context.params.answers;
  const color = context.query.color;
  const assignmentTitle = context.query.assignmentTitle;
  const attemptId = context.query.attemptId;
  const userToken = context.query.userToken;

  const teacherToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2ZTk5MzFlZDFiMjQyZjBiNWMxYmUiLCJyb2xlIjoidGVhY2hlciIsInJlZ2lzdGVyZWRBdCI6MTY1MDkxMTYzNSwiaXNBZG1pbiI6ZmFsc2UsImJlY29tZVRoaXNVc2VyIjpmYWxzZSwidXNlcklkQmVjb21pbmdUaGlzVXNlciI6IiIsImlzT3BlbkNsYXNzcm9vbVVzZXIiOmZhbHNlLCJpc0x0aVVzZXIiOmZhbHNlLCJpc1VzZXJVc2luZ1RoaXJkUGFydHlBcHBsaWNhdGlvbiI6ZmFsc2UsImlhdCI6MTY1MTYyMDYwMCwiZXhwIjoxNjUyMjI1NDAwLCJqdGkiOiI2MjcxYmFmODYyNWMzMzQyZDZlMDI2ZTYifQ.kHLwvReWTEMOTu4-H9MTe2k1rz0voIKL-wxASucdQYQ";
  try {
    const response = await axios.get(
      `https://edpuzzle.com/api/v3/media/${assignmentId}`,
      {
        headers: {
          Cookie: `_ga=GA1.2.1241878492.1650911605; _gat=1; _gid=GA1.2.834812595.1650911605; token=${teacherToken}; G_ENABLED_IDPS=google; aws-waf-token=a88186e5-53d6-47c2-87cc-dc11d1b0996e:EQoAvlqUCIEAAAAA:xCYpsXen70BVAsBUHGqEX6kssv1k6kQ9wEG88Mj/ioWrStFA69X8mLzXB4MLcj1Z6CNq5OeNVF6DQYD1tezieVlX68uvia05WYlEmq9aK6Qma6xy; G_AUTHUSER_H=4; edpuzzleCSRF=Bul1xHT2hK6JNU4P4Sw33yiI`,
          "x-edpuzzle-web-version": "7.31.320.9991544718109210",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
          // "x-edpuzzle-referrer": `https://edpuzzle.com/assignments/${assignmentId}`,
        },
      }
    );

    const questions = response.data.questions;
    // console.log(JSON.stringify(questions));

    var openEndedCount = 0;
    questions.forEach((question) => {
      if (question.type === "open-ended") {
        // no answer -> need openai
        openEndedCount += 1;
        const questionObj = {};
        const questionBody = replaceHTMLTags(question.body[0].html);

        const openEndedAnswer = "";
        questionObj["body"] = questionBody;
        questionObj["type"] = question.type;
        questionObj["id"] = question._id;

        questionObj["openEndedAnswer"] = openEndedAnswer;

        questionJSON.push(questionObj);
      } else {
        // is multiple choice
        const questionObj = {};
        questionObj["body"] = replaceHTMLTags(question.body[0].html);
        questionObj["type"] = question.type;
        questionObj["id"] = question._id;

        const qChoices = question.choices;
        const correctChoices = [];
        qChoices.forEach((choice) => {
          if (choice.isCorrect === true) {
            const choiceObj = {
              choiceText: `${replaceHTMLTags(choice.body[0].html)}`,
              choiceNumber: `${choice.choiceNumber}`,
              choiceID: `${choice._id}`,
            };

            correctChoices.push(choiceObj);
          }
        });

        questionObj["correctChoices"] = correctChoices;

        questionJSON.push(questionObj);
      }
    });

    return {
      props: {
        answers: questionJSON,
        color: color,
        assignmentTitle: assignmentTitle,
        attemptId: attemptId,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        answers: [],
        color: color,
        assignmentTitle: "error",
      },
    };
  }
}

export default function Assignment({ answers, color, assignmentTitle, attemptId }) {
  // const [questionAnswerData, setQuestionAnswerData] = React.useState(answers);
  // console.log(questionAnswerData);

  // React.useEffect(() => {
  //   if (answers.length > 0) {
  //     questionAnswerData.map((question, index) => {
  //       getOpenEndedAnswer(question, index);
  //     });
  //   }
  // }, []);

  // console.log(answers);

  const [isLoading, setIsLoading] = React.useState(false);

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
      return data.answer
    }
  }

  const submitAnswers = async () => {
    var noError = true;
    setIsLoading(true);
    answers.forEach(async (question) => {
      if (question.type === "open-ended") {

        const openEndedAns = getOpenEndedAnswer(question)

        const response = await fetch("/api/completeAssignment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: question.type, attemptId: attemptId, questionId: question.id,
            userToken: userToken, openEndedBody: question.body, openEndedAnswer: openEndedAns
          }),
        });

        const data = await response.json();

        if (data.error) {
          noError = false;
        }

      } else {
        // is multiple choice
        const response = await fetch("/api/completeAssignment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: question.type, attemptId: attemptId, questionId: question.id,
            userToken: userToken, correctChoices: question.correctChoices
          }),
        });

        const data = await response.json();

        if (data.error) {
          noError = false;
        }
      }
    })

    setIsLoading(false);

    if (noError) {
      toast({
        title: 'Completed assignment.',
        description: "We've submitted the answers for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error completing assignment',
        description: "Unfortunately, we ran into an error.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Answers</title>
      </Head>
      <Navbar />
      <Box m={10}>
        <VStack spacing={0}>
          <Flex w="100%">
            <BackButton />
            <Spacer />

            <HStack align mx={10}>
              <Heading color={`${color}`} size="xl">
                {assignmentTitle}
              </Heading>
              <Heading color={useColorModeValue("black", "white")} size="xl"> answers</Heading>
            </HStack>

            <Spacer />
          </Flex>

          <VStack spacing={-5}>
            <Button
              onClick={submitAnswers}
              m={10}
              loadingText={"Submitting answers..."}
              isLoading={isLoading}
              w={"40%"}
              minW={"240px"}
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
              Finish assignment for me
            </Button>

            <VStack spacing={0}>
              {answers.length > 0 &&
                answers.map((question, index) => (
                  <QuestionAnswerCard
                    key={index}
                    question={question}
                    length={question.length}
                  />
                ))}
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
}

{
  /* {questionAnswerData.length > 0 && answers.map((question, index) => (
        // <div key={index}>{question.body}</div>
      )  */
}
//) }
