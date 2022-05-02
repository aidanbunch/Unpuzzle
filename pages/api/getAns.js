// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express()

app.use(express.json())



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

export async function getAnswer(req, res) {
    // res.status(200).json({ name: 'John Doe' })
    const questionPrompt = req.body.prompt

    const completion = await openai.createCompletion("text-davinci-002", {
      prompt: generatePrompt(questionPrompt),
      temperature: 1.0,
      max_tokens: 160,
    });
    return completion.data.choices[0].text;

}
  
export default async function handler(req, res) {
  const ansData = await getAnswer()
  res.statsu(200).json(ansData)
}
