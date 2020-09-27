import { Collection, MongoClient } from 'mongodb'

export class Mongo {
  private url: string

  constructor(user: string, password: string, host: string, authSource: string, port = '27017') {
    this.url = `mongodb://${user}:${password}@${host}:${port}?authSource=${authSource}`
  }

  async connect() {
    const client = await MongoClient.connect(this.url, { useUnifiedTopology: true })
    return client
  }

  getCollection<T>(client: MongoClient, dbName: string, collectionName: string) {
    const database = client.db(dbName)
    const collection: Collection<T> = database.collection(collectionName)

    return collection
  }
}
