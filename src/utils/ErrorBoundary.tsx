import React, { Component, ErrorInfo, ReactNode } from 'react'
import error from '../../public/error.gif'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError = (_: Error): State => ({
    hasError: true,
  })

  public componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render = () =>
    this.state.hasError ? (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={error}
          alt='something went wrong'
          style={{
            height: '300px',
            width: '300px',
            marginBottom: '20px',
          }}
        />
        <p>Something went wrong</p>
      </div>
    ) : (
      this.props.children
    )
}

export default ErrorBoundary
