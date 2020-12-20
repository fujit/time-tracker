import { ExNextApiRequest, NextApiResponse } from 'next'
import { MongoError } from 'mongodb'
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
    const result = await collection.insertOne(req.body)

    try {
      if (result.result.ok === 1 && req.body.key) {
        const projectCollection = mongo.getCollection<Project>(client, 'time-tracker', 'projects')
        await projectCollection.insertOne({ key: req.body.key, name: req.body.name })
      }
    } catch (e) {
      if (e instanceof MongoError) {
        if (e.code !== 11000) {
          console.log(e)
        }
      }
    }

    res.status(200).json({ message: 'OK' })
  }
}
