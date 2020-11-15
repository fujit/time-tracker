import { NextApiResponse, NextApiRequest } from 'next'
import { Mongo } from '../../utils/Mongo'

export default async (req: NextApiRequest, res: NextApiResponse<Project[]>) => {
  if (req.method === 'GET') {
    const mongo = new Mongo(
      process.env.MONGO_USER ?? '',
      process.env.MONGO_PASSWORD ?? '',
      process.env.MONGO_HOST ?? '',
      process.env.MONGO_AUTH_SOURCE ?? '',
      process.env.MONGO_PORT
    )

    const client = await mongo.connect()
    const collection = mongo.getCollection<Project>(client, 'time-tracker', 'projects')
    const { projectName } = req.query

    const searchName = typeof projectName === 'string' ? projectName : projectName[0]

    const projects = await collection
      .find({ name: RegExp(searchName, 'i') }, { projection: { _id: 0 } })
      .toArray()

    res.status(200).json(projects)
  }
}
