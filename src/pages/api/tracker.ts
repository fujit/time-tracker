import { NextApiRequest, NextApiResponse } from 'next'
import { fetchPost } from '../../utils/Fetch'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: 直接 MongoDB を呼ぶように変えても良いかも
  if (req.method === 'POST') {
    // TODO: エラー時の処理
    fetchPost(`${process.env.apiPath}/tracker`, {
      body: JSON.stringify(req.body),
    })
      .then(() => res.status(200).json({ status: 'OK' }))
      .catch(() => res.status(500).json({ status: 'NG' }))
  }
}
