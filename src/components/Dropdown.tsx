/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { FC, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

type MenuList = {
  title: string
  link: string
}

type Props = {
  menuList: MenuList[]
  isOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const Component: FC<Props> = ({ menuList, children, isOpen, toggleMenu, closeMenu }) => (
  <>
    <div className="relative inline-block text-left">
      <button className="outline-none" onClick={toggleMenu} onBlur={closeMenu}>
        {children}
      </button>
      <div
        className={classNames(
          'absolute right-0 w-56 mt-2 shadow-lg origin-top-right rounded-md',
          isOpen ? '' : 'hidden'
        )}
      >
        <div className="bg-white rounded-md shadow-xs">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuList.map((menu) => (
              <Link href={menu.link} key="link">
                <a
                  className="block px-4 py-2 text-sm text-gray-700 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  {menu.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)

type ContainerProps = {
  menuList: MenuList[]
}

export const DropDown: FC<ContainerProps> = ({ menuList, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prevStatus) => !prevStatus)
  }

  const closeMenu = () => {
    setTimeout(() => setIsOpen(false), 100)
  }

  return (
    <Component menuList={menuList} isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu}>
      {children}
    </Component>
  )
}
