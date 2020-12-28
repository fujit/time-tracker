import { ExNextApiRequest, NextApiResponse } from 'next'
import prisma, { Prisma } from '../../lib/prisma'

export default async (req: ExNextApiRequest<Tracker>, res: NextApiResponse<PostResponse>) => {
  if (req.method === 'POST') {
    try {
      const { name, day, inProgress, isActive, projectKey, timers } = req.body
      const data: Prisma.TrackerCreateInput = projectKey
        ? {
            name,
            day,
            inProgress,
            isActive,
            project: {
              create: {
                key: projectKey,
                name,
              },
            },
          }
        : {
            name,
            day,
            inProgress,
            isActive,
          }

      const registeredTracker = await prisma.tracker.create({
        data,
      })

      await prisma.time.create({
        data: {
          start: timers[0].start,
          tracker: {
            connect: {
              id: registeredTracker.id,
            },
          },
        },
      })
    } catch (e) {
      console.log(e)
      res.status(200).json({ message: 'NG' })
    }

    res.status(200).json({ message: 'OK' })
  }
}
