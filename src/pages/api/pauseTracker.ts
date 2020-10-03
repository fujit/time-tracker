import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

type ReqBody = {
  trackerId: string
  timerId: string
  endTime: Date
  minute: number
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

    const { trackerId, timerId, endTime, minute } = req.body
    await collection.updateMany(
      { id: trackerId },
      {
        $set: {
          'timers.$[element].end': endTime,
          'timers.$[element].minute': minute,
          inProgress: false,
        },
      },
      { arrayFilters: [{ 'element.id': timerId }] }
    )

    res.status(200).json({ message: 'OK' })
  }
}
