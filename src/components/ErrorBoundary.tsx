import React, { Component } from 'react'

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Record<string, unknown>, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong :(</h1>
    }

    return this.props.children
  }
}
