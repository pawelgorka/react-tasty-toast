import * as React from 'react'

export interface IRenderProps {
  close: () => void
  closeOnClick: boolean
  autoClose: false | number
  pauseOnHover: boolean
  isRunning: boolean | null
}

export type ToastFactoryFunction = (props: IRenderProps) => React.ReactElement<any>
