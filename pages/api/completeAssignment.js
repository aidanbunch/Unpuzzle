// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    if (req.body.type === "multiple-choice") {

        const multi_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`, 
        {"answers":[{"type":"multiple-choice","questionId":`${req.body.questionId}`,
        "choices":[req.body.correctChoices.forEach(() => {
            return choices.choiceID
        })]}]}, 
        {
            headers: {
                'content-type': 'text/json',
                'Cookie': `${req.body.userToken}`
            }
        });

        if (multi_response.data.error) {
            res.status(404).json({ error: "error making requests" });
        } else {
            res.status(200).json({ success: "requests made" });
        }

    } else if (req.body.type === "open-ended") {

        const open_response = await axios.post(`https://edpuzzle.com/api/v3/attempts/${req.body.attemptId}/answers`, 
        {"answers":[{"type":"open-ended","questionId":`${req.body.questionId}`,"body":[{"text":`${req.body.openEndedAnswer}`,"html":""}]}]}, 
        {
            headers: {
                'content-type': 'text/json',
                'Cookie': `${req.body.userToken}`
            }
        });

        if (open_response.data.error) {
            res.status(404).json({ error: "error making requests" });
        } else {
            res.status(200).json({ success: "requests made" });
        }

    } else {
        res.status(404).json({ error: "error making requests" });
    }

}
