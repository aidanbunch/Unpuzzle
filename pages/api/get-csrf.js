import axios from "axios";

export default async function handler(req, res) {
    const csrf_response = await axios.get(
        `https://edpuzzle.com/api/v3/csrf`,
        {
          headers: {
            Cookie: `token=${req.body.userToken}; edpuzzleCSRF=123`,
          },
        }
      );

    res.send(csrf_response.data);
}
