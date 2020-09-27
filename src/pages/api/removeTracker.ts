import { NextApiRequest, NextApiResponse } from 'next'
import { fetchPost } from '../../utils/Fetch'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    fetchPost(`${process.env.apiPath}/remove`, {
      body: JSON.stringify(req.body),
    })
      .then(() => res.status(200).json({ status: 'OK' }))
      .catch(() => res.status(500).json({ status: 'NG' }))
  }
}
