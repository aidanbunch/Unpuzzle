import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (questionPrompt) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(questionPrompt),
    temperature: 1.0,
    max_tokens: 160,
  });
  // console.log(completion.data.choices[0].text);
  return completion.data.choices[0].text;
}

function generatePrompt(question) {
  if (question.slice(-1) === "?") {
    return question;
  } else {
    return question.concat("?");
  }
}
