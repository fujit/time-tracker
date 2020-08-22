import React from 'react'
import * as styles from './Header.scss'

type Props = {
  title: string
}

export const Header: React.FC<Props> = ({ title }) => (
  <div className={styles.header}>
    <h1>{title}</h1>
  </div>
)
