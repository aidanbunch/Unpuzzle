// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {

    console.log(req)

    const video_response = await axios.post(`https://edpuzzle.com/api/v4/media_attempts/${req.body.attemptId}/watch`,
        { "timeIntervalNumber": 10 },
        {
            headers: {
                'Cookie': `token=${req.body.userToken}`
            }
        })

    console.log(video_response.data)
    res.send(video_response.data);
    
    // const allTimeReqs = [];
    // let allTimeRes = [];

    // console.log(req)
    // for (let i = 0; i <= 10; i++) {

    //     const video_req = axios.post(`https://edpuzzle.com/api/v4/media_attempts/${req.body.attemptId}/watch`,
    //         { "timeIntervalNumber": i },
    //         {
    //             headers: {
    //                 'Cookie': `token=${req.body.userToken}`
    //             }
    //         })

    //     allTimeReqs.push(video_req)
    //     allTimeRes.push(i)
    //     // res.send(video_response.data);
    // }

    // try {
    //     allTimeRes = await Promise.all(allTimeReqs);
    //     console.log(allTimeRes[10])
    //     res.send(res11.data)
    // } catch (err) {
    //     console.error(err)
    // }
}