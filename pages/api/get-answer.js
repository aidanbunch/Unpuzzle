// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

function appendQuestionMarkToPrompt(question) {
  if (question.slice(-1) === "?") {
    return question;
  } else {
    return question.concat("?");
  }
}

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env["OPENAI_API_KEY" + req.body.number],
  });

  const openai = new OpenAIApi(configuration);

  const questionPrompt = appendQuestionMarkToPrompt(req.body.prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: questionPrompt,
    temperature: 1.0,
    max_tokens: 70,
  });

  const answerString = completion.data.choices[0].text.replace(/\n/g, "");

  // truncate all strings after the last period
  const answerStringTruncated = answerString.slice(
    0,
    answerString.lastIndexOf(".") + 1
  );

  res.status(200).json({ answer: answerStringTruncated });
}
