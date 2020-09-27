import { NextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
