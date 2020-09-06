import React from 'react'

type Props = {
  title: string
}

export const Header: React.FC<Props> = ({ title }) => (
  <div className="container max-w-full p-4 mb-4 bg-green-300">
    <h1 className="text-2xl">{title}</h1>
  </div>
)
