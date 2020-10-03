import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

type ReqBody = {
  trackerId: string
  timerId: string
}

export default async (req: ExNextApiRequest<ReqBody>, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const mongo = new Mongo(
      process.env.MONGO_USER ?? '',
      process.env.MONGO_PASSWORD ?? '',
      process.env.MONGO_HOST ?? '',
      process.env.MONGO_AUTH_SOURCE ?? '',
      process.env.MONGO_PORT
    )
    const client = await mongo.connect()
    const collection = mongo.getCollection<Tracker>(client, 'time-tracker', 'trackers')

    const { trackerId, timerId } = req.body
    await collection.updateOne({ id: trackerId }, { $pull: { timers: { id: timerId } } })

    res.status(200).json({ status: 'ok' })
  }
}
