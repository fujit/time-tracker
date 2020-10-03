import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

type ReqBody = {
  trackerId: string
  nextTimerId: string
  startTime: Date
}

export default async (req: ExNextApiRequest<ReqBody>, res: NextApiResponse<PostResponse>) => {
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

    const { trackerId, nextTimerId, startTime } = req.body
    await collection.updateMany(
      { id: trackerId },
      {
        $push: {
          timers: { id: nextTimerId, start: startTime },
        },
        $set: {
          inProgress: true,
        },
      }
    )

    res.status(200).json({ message: 'OK' })
  }
}
