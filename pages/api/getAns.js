// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generatePrompt(question) {
    if (question.slice(-1) === "?") {
      return question;
    } else {
      return question.concat("?");
    }
  }

export async function getAnswer(prompt) {
    // res.status(200).json({ name: 'John Doe' })
    const questionPrompt = prompt

    const completion = await openai.createCompletion("text-davinci-002", {
      prompt: (questionPrompt),
      temperature: 1.0,
      max_tokens: 160,
    });

    return {
      "prompt": questionPrompt,
      "answer": completion.data.choices[0].text
    };

}
  
export default async function handler(req, res) {
  const ansData = await getAnswer(req.body.prompt)
  console.log(ansData)
  res.status(200).json({prompt: req.body.prompt, answersData: ansData})
}
