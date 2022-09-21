// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {

    console.log(req)
    if (req.body.type === "multiple-choice") {

        const questionChoice = []


        req.body.correctChoices.forEach((choice) => {
            questionChoice.push(choice.choiceID)
        })

        // try {
        const multi_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`,
            {
                "answers": [{
                    "type": "multiple-choice", "questionId": `${req.body.questionId}`,
                    "choices":

                        // questionChoice
                        questionChoice

                    // req.body.correctChoices.forEach((choice) => {
                    //     return choice.choiceID
                    // })

                }]
            },
            {
                headers: {
                    'Cookie': `token=${req.body.userToken}; edpuzzleCSRF=123`,
                    'x-csrf-token': `${req.body.csrf}`,
                }
            }
        )
        console.log(multi_response.data)
        res.send(multi_response.data);

        // }
        // catch(error) {
        //     res.status(404).json({ error: "error making requests" });

        //     console.log(error)
        // }






    }

    else if (req.body.type === "open-ended") {

        const open_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`,
            { "answers": [{ "type": "open-ended", "questionId": `${req.body.questionId}`, "body": [{ "text": `${req.body.openEndedAnswer}`, "html": "" }] }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${req.body.userToken}; edpuzzleCSRF=123`,
                    'x-csrf-token': `${req.body.csrf}`,
                }
            });
        console.log(open_response.data)
        res.send("GOOD OPEN ENDED")

    }



}
