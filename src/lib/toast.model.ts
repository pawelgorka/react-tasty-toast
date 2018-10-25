import * as React from 'react'

export interface IRenderProps {
  close: () => void
  autoClose: false | number
}

export type ToastFactoryFunction = (props: IRenderProps) => React.ReactElement<any>
