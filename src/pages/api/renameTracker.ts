import { ExNextApiRequest, NextApiResponse } from 'next'
import { Mongo } from '../../utils/Mongo'

type ReqBody = {
  trackerId: string
  newName: string
  newKey?: number
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

    const { trackerId, newName, newKey } = req.body
    const result = await collection.updateOne(
      { id: trackerId },
      { $set: { name: newName, projectKey: newKey } }
    )

    if (result.result.ok === 1 && newKey) {
      const projectCollection = mongo.getCollection<Project>(client, 'time-tracker', 'projects')
      await projectCollection.updateOne(
        { key: newKey },
        { $set: { name: newName, key: newKey } },
        { upsert: true }
      )
    }

    res.status(200).json({ message: 'OK' })
  }
}
