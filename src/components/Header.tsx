/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { FC } from 'react'
import Link from 'next/link'
import { PersonIcon } from './Icon'
import { DropDown } from './Dropdown'

type Props = {
  title: string
}

export const Header: FC<Props> = ({ title }) => (
  <div className="flex items-center justify-between max-w-full p-4 bg-green-300">
    <Link href="/">
      <a>
        <h1 className="text-2xl">{title}</h1>
      </a>
    </Link>
    <DropDown menuList={[{ title: '履歴を確認', link: '/history' }]}>
      <PersonIcon width={35} height={35} />
    </DropDown>
  </div>
)
