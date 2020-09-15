import React from 'react'
import { render, screen } from '@testing-library/react'

import { Header } from '../components/Header'

describe('Header', () => {
  test('renders Header Component', () => {
    render(<Header title="test" />)
    expect(screen.getByRole('heading').textContent).toBe('test')
  })
})
