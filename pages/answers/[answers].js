import React from "react";
import axios from "axios";
// import returnOpenEndedAnswer from "../../openai.js";
// import {getAnswer} from "../api/getAns" 

function replaceHTMLTags(string) {
  return string.replace(/(<([^>]+)>)/gi, "").replace(/\&nbsp;/g, "");
}

var questionJSON = [];

const getOpenEndedAnswer = async (openEndedCount, callback) => {
  var answerJSON = questionJSON;

  answerJSON.forEach((question) => {
    if (question.type === "open-ended") {
      returnOpenEndedAnswer(question.body).then(function (ans) {
        question.openEndedAnswer = ans;
        openEndedCount -= 1;

        if (openEndedCount == 0) {
          callback(answerJSON);
        }
      });
    }
  });
};

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
  var answersJSON = [];
  const assignmentId = context.params.answers;
  const teacherToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2ZTk5MzFlZDFiMjQyZjBiNWMxYmUiLCJyb2xlIjoidGVhY2hlciIsInJlZ2lzdGVyZWRBdCI6MTY1MDkxMTYzNSwiaXNBZG1pbiI6ZmFsc2UsImJlY29tZVRoaXNVc2VyIjpmYWxzZSwidXNlcklkQmVjb21pbmdUaGlzVXNlciI6IiIsImlzT3BlbkNsYXNzcm9vbVVzZXIiOmZhbHNlLCJpc0x0aVVzZXIiOmZhbHNlLCJpc1VzZXJVc2luZ1RoaXJkUGFydHlBcHBsaWNhdGlvbiI6ZmFsc2UsImlhdCI6MTY1MTQ2NDQxNCwiZXhwIjoxNjUyMDY5MjE0LCJqdGkiOiI2MjZmNThkZWY1M2Y0NjQyOTM2OGM2ZDgifQ.oMXwXs9KfjFKxCWSkFZj7YgBn5s4VVslnVik4RhfWrQ";
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
      
              questionObj["openEndedAnswer"] = openEndedAnswer;
      
              questionJSON.push(questionObj);
            } else {
              // is multiple choice
              const questionObj = {};
              questionObj["body"] = replaceHTMLTags(question.body[0].html);
              questionObj["type"] = question.type;
      
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
              "answers": questionJSON
            }
          }
        } catch (err) {
          console.error(err);
        }

}

export default function Assignment({ answers }) {
  console.log(answers)
React.useEffect(() => {
})

  // console.log(answers);
  return (
    <div>
      {answers.length > 0 && answers.map((question, index) => (
        <div>{question.body}</div>
      )) }
      </div>
  )
}
