import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

export default async (req: ExNextApiRequest<Tracker>, res: NextApiResponse<PostResponse>) => {
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
    await collection.insertOne(req.body)

    res.status(200).json({ message: 'OK' })
  }
}
