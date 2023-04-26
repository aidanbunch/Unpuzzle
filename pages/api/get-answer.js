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

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: `You are a bot that only answers questions and comes up with the most likely 
          completion for given text. Come up with the most likely answer to the question a user gives you based
          on the title of the assignment and the knowledge you have of it. 
          Do not mention that you are an AI language model or that you are replying to a user, just return
          the answer. Do not mention the title of the assignment in your answer either. Only give the answer you think 
          is most likely based on your knowledge and the title to the user in a concise and analytical way.`,
			},
			{
				role: "user",
				content: `Title of the Assignment: ${req.body.assignmentTitle} Question: ${questionPrompt}`,
			},
		],
		temperature: 1.0,
		max_tokens: 70,
	});

	const answerString = completion.data.choices[0].message.content.replace(
		/\n/g,
		""
	);

	// truncate all strings after the last period
	const answerStringTruncated = answerString.slice(
		0,
		answerString.lastIndexOf(".") + 1
	);

	res.status(200).json({ answer: answerStringTruncated });
}
