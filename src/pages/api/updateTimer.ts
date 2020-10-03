import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

type ReqBody = {
  trackerId: string
  updatedTimer: Timer
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

    const { trackerId, updatedTimer } = req.body
    await collection.updateMany(
      { id: trackerId },
      {
        $set: {
          'timers.$[element]': updatedTimer,
        },
      },
      { arrayFilters: [{ 'element.id': updatedTimer.id }] }
    )

    res.status(200).json({ status: 'ok' })
  }
}
