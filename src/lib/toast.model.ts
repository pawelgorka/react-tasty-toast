import * as React from 'react'

export interface IRenderProps {
  close: () => void
  closeOnClick: boolean
  autoClose: false | number
  pauseOnHover: boolean
  isRunning: boolean | null
  getProgressIndicatorProps: () => IProgressIndicatorProps
}

export interface IProgressIndicatorProps {
  isVisible: boolean
  isRunning: boolean | null
  duration: number
}

export type ToastFactoryFunction = (props: IRenderProps) => React.ReactElement<any>
