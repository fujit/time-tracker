/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react'
import Link from 'next/link'
import { PersonIcon } from './Icon'

type Props = {
  title: string
}

export const Header: React.FC<Props> = ({ title }) => (
  <div className="flex items-center justify-between max-w-full p-4 bg-green-300">
    <Link href="/">
      <a>
        <h1 className="text-2xl">{title}</h1>
      </a>
    </Link>
    <Link href="/history">
      <a>
        <PersonIcon width={35} height={35} />
      </a>
    </Link>
  </div>
)
