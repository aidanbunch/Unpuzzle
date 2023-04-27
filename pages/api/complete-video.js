// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {

    // console.log(req)

    const video_response = await axios.post(`https://edpuzzle.com/api/v4/media_attempts/${req.body.attemptId}/watch`,
        { "timeIntervalNumber": 10 },
        {
            headers: {
                'Cookie': `token=${req.body.userToken}; edpuzzleCSRF=123`,
                'x-csrf-token': `${req.body.csrf}`,
            }
        })

    // console.log(video_response.data)
    res.send(video_response.data);

}