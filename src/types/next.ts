import { NextApiRequest, NextApiResponse } from 'next'

declare module 'next' {
  interface ExNextApiRequest<T> extends NextApiRequest {
    body: T
  }
}
